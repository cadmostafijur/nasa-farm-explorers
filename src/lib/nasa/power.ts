export interface PowerDailyRecord {
	date: string;
	temperatureC: number | null;
	humidity: number | null;
	rainfallMm: number | null;
	solarRadiation: number | null;
}

export interface PowerDailyResponse {
	location: { latitude: number; longitude: number };
	records: PowerDailyRecord[];
}

export interface FetchPowerDailyParams {
	latitude: number;
	longitude: number;
	start: string; // YYYYMMDD
	end: string; // YYYYMMDD
}

export async function fetchPowerDaily(params: FetchPowerDailyParams): Promise<PowerDailyResponse> {
	const { latitude, longitude, start, end } = params;
	const url = new URL("https://power.larc.nasa.gov/api/temporal/daily/point");
	url.searchParams.set("parameters", "T2M,RH2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN");
	url.searchParams.set("community", "ag");
	url.searchParams.set("latitude", String(latitude));
	url.searchParams.set("longitude", String(longitude));
	url.searchParams.set("start", start);
	url.searchParams.set("end", end);
	url.searchParams.set("format", "JSON");

	const resp = await fetch(url.toString());
	if (!resp.ok) throw new Error(`POWER request failed: ${resp.status}`);
	const data = await resp.json();
	const p = data?.properties?.parameter || {};
	const t2m = p.T2M || {};
	const rh2m = p.RH2M || {};
	const pr = p.PRECTOTCORR || {};
	const rad = p.ALLSKY_SFC_SW_DWN || {};
	const dates = Object.keys(t2m || {}).length ? Object.keys(t2m) : Object.keys(pr || {});
	const records: PowerDailyRecord[] = dates.map((d: string) => ({
		date: d,
		temperatureC: toNum(t2m[d]),
		humidity: toNum(rh2m[d]),
		rainfallMm: toNum(pr[d]),
		solarRadiation: toNum(rad[d])
	}));
	return { location: { latitude, longitude }, records };
}

function toNum(v: unknown): number | null {
	const n = typeof v === "string" ? Number(v) : (v as number);
	return Number.isFinite(n) ? (n as number) : null;
}


