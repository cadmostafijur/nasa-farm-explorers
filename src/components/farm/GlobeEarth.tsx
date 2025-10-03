import { useEffect, useRef } from "react";

type Props = {
	lat: number;
	lon: number;
	layer: string; // GIBS layer id
	isoDate: string; // YYYY-MM-DD
	onMove?: (lat: number, lon: number) => void;
};

export default function GlobeEarth({ lat, lon, layer, isoDate, onMove }: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<any>(null);

	useEffect(() => {
		const maplibregl = (window as any).maplibregl;
		if (!maplibregl || !containerRef.current) return;

		const map = new maplibregl.Map({
			container: containerRef.current,
			style: {
				version: 8,
				sources: {
					osm: {
						type: 'raster',
						tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
						tileSize: 256,
						attribution: '© OpenStreetMap'
					}
				},
				layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
			},
			center: [lon, lat],
			zoom: 2.2,
			pitch: 45,
			bearing: 0,
			projection: 'globe'
		});

		// enable all interactions explicitly
		map.scrollZoom.enable();
		map.boxZoom.enable();
		map.dragRotate.enable();
		map.dragPan.enable();
		map.keyboard.enable();
		map.doubleClickZoom.enable();

		// expose map instance for later updates
		(containerRef.current as any)._map = map;

		map.on('style.load', () => {
			try {
				map.addSource('gibs', {
					type: 'raster',
					tiles: [buildGibsUrl(layer, isoDate)],
					tileSize: 256
				});
				map.addLayer({ id: 'gibs', type: 'raster', source: 'gibs', paint: { 'raster-opacity': 0.9 } });
			} catch {}
		});

		map.addControl(new maplibregl.NavigationControl());
		// add a marker for selected point
		markerRef.current = new maplibregl.Marker({ color: '#ff4d4f' })
			.setLngLat([lon, lat])
			.addTo(map);
		map.on('moveend', () => {
			const c = map.getCenter();
			onMove?.(c.lat, c.lng);
		});

		return () => map.remove();
	}, []);

	useEffect(() => {
		const maplibregl = (window as any).maplibregl;
		const map = (containerRef.current as any)?._map as any;
		if (!map) return;
		const src: any = map.getSource('gibs');
		if (src && src.tiles) {
			src.tiles = [buildGibsUrl(layer, isoDate)];
			map.style.sourceCaches['gibs']?.clearTiles();
			map.triggerRepaint();
		}
	}, [layer, isoDate]);

	useEffect(() => {
		const map = (containerRef.current as any)?._map as any;
		if (!map) return;
		markerRef.current?.setLngLat([lon, lat]);
		map.easeTo({ center: [lon, lat], duration: 800 });
	}, [lat, lon]);

	return <div ref={containerRef} className="w-full h-[60vh] md:h-[70vh] rounded-xl overflow-hidden border" />;
}

function buildGibsUrl(layer: string, isoDate: string) {
  // Use VIIRS true color for daily up-to-date mosaic, fallback to MODIS
  const chosen = layer === 'MODIS_Terra_CorrectedReflectance_TrueColor'
    ? 'VIIRS_SNPP_CorrectedReflectance_TrueColor'
    : layer;
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${chosen}/default/${isoDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png`;
}


