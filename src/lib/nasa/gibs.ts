export type GibsLayer =
	| "GPM_3IMERGHH_Precipitation_Rate"
	| "VIIRS_SNPP_NDVI"
	| "MODIS_Terra_NDVI_16Day"
	| "MODIS_Terra_CorrectedReflectance_TrueColor"
	| "VIIRS_SNPP_CorrectedReflectance_TrueColor";

const BASE = "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best";
const TILE_MATRIX_SET = "GoogleMapsCompatible_Level9";

export function gibsTileUrl(layer: GibsLayer, isoDate: string, z: number, x: number, y: number) {
	return `${BASE}/${layer}/default/${isoDate}/${TILE_MATRIX_SET}/${z}/${y}/${x}.png`;
}


