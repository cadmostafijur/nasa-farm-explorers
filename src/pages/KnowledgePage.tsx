import { useEffect, useState } from "react";
import { fetchPowerDaily } from "../lib/nasa/power";
import { gibsTileUrl, GibsLayer } from "../lib/nasa/gibs";
import GlobeEarth from "../components/farm/GlobeEarth";

export default function KnowledgePage({ onBack }: { onBack: () => void }) {
  const [lat, setLat] = useState(23.8103);
  const [lon, setLon] = useState(90.4125);
  const [layer, setLayer] = useState<GibsLayer>("MODIS_Terra_CorrectedReflectance_TrueColor");
  const [power, setPower] = useState<any>(null);
  const [forecast, setForecast] = useState<{date: string; pop: number; rain: number}[] | null>(null);
  const today = new Date();
  const iso = today.toISOString().slice(0,10);
  const [countryQuery, setCountryQuery] = useState("");

  useEffect(() => {
    const start = yyyymmdd(addDays(new Date(), -7));
    const end = yyyymmdd(new Date());
    fetchPowerDaily({ latitude: lat, longitude: lon, start, end })
      .then(setPower).catch(() => setPower(null));
    // precipitation forecast (free): Open-Meteo
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation_probability,precipitation&timezone=auto`)
      .then(r => r.json())
      .then(d => {
        const hours: string[] = d?.hourly?.time || [];
        const prob: number[] = d?.hourly?.precipitation_probability || [];
        const pr: number[] = d?.hourly?.precipitation || [];
        const days: { [k: string]: { pop: number[]; rain: number[] } } = {};
        hours.forEach((t: string, i: number) => {
          const day = t.slice(0,10);
          if (!days[day]) days[day] = { pop: [], rain: [] };
          days[day].pop.push(prob[i] ?? 0);
          days[day].rain.push(pr[i] ?? 0);
        });
        const out = Object.keys(days).slice(0,7).map(day => ({
          date: day,
          pop: Math.round(days[day].pop.reduce((a,b)=>a+b,0) / Math.max(1, days[day].pop.length)),
          rain: Number((days[day].rain.reduce((a,b)=>a+b,0)).toFixed(1))
        }));
        setForecast(out);
      })
      .catch(() => setForecast(null));
  }, [lat, lon]);

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Globe (NASA Layers)</h1>
        <button onClick={onBack} className="px-3 py-2 border rounded">Back</button>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm">Layer</span>
        <select className="border rounded px-2 py-1 text-sm" value={layer} onChange={(e) => setLayer(e.target.value as GibsLayer)}>
          <option value="MODIS_Terra_CorrectedReflectance_TrueColor">True Color (auto VIIRS)</option>
          <option value="GPM_3IMERGHH_Precipitation_Rate">GPM Rain</option>
          <option value="VIIRS_SNPP_NDVI">VIIRS NDVI</option>
          <option value="MODIS_Terra_NDVI_16Day">MODIS NDVI</option>
        </select>
        <input 
          className="ml-3 border rounded px-2 py-1 text-sm w-56" 
          placeholder="Search country (e.g., Bangladesh)" 
          value={countryQuery}
          onChange={(e) => setCountryQuery(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && countryQuery.trim()) {
              try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(countryQuery)}&countrycodes=&limit=1`);
                const arr = await res.json();
                if (arr && arr[0]) {
                  setLon(parseFloat(arr[0].lon));
                  setLat(parseFloat(arr[0].lat));
                }
              } catch {}
            }
          }}
        />
      </div>
      <div className="rounded-xl overflow-hidden mb-4">
        <GlobeEarth lat={lat} lon={lon} layer={layer} isoDate={iso} onMove={(la,lo)=>{setLat(la);setLon(lo);}} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-3">
          <div className="text-sm font-bold mb-2">Weather (POWER)</div>
          {power ? (
            <ul className="text-sm list-disc pl-5">
              {power.records.slice(-5).map((r: any) => (
                <li key={r.date}>Day {r.date}: T {r.temperatureC ?? "-"}°C, Rain {r.rainfallMm ?? "-"} mm</li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-600">Loading...</div>
          )}
        </div>
        <div className="rounded-xl border p-3">
          <div className="text-sm font-bold mb-2">7-day Rain Forecast</div>
          {forecast ? (
            <div>
              <div className="grid grid-cols-7 gap-2">
                {forecast.map(d => (
                  <div key={d.date} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{d.date.slice(5)}</div>
                    <div className="h-24 bg-muted rounded flex items-end">
                      <div className="w-full bg-blue-500/70" style={{height: `${d.pop}%`}} title={`${d.pop}% chance`} />
                    </div>
                    <div className="text-[11px] mt-1 text-blue-700">{d.pop}% • {d.rain}mm</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">Bar height = chance of rain • Label = chance and total mm/day</div>
            </div>
          ) : (
            <div className="text-sm text-gray-600">Loading forecast…</div>
          )}
        </div>
      </div>
    </div>
  );
}

function yyyymmdd(d: Date) { const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const da = String(d.getDate()).padStart(2,'0'); return `${y}${m}${da}`; }
function addDays(d: Date, n: number) { const c = new Date(d.getTime()); c.setDate(c.getDate()+n); return c; }


