import httpx
from datetime import datetime, timezone
from typing import Optional
from app.core.config import settings
from app.models.emg import EMGReading, EMGStats, EMGResponse
import statistics


def _safe_float(value: Optional[str]) -> Optional[float]:
    """Convert string to float, returning None for null/invalid values."""
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None


def _parse_timestamp(ts: str) -> datetime:
    """Parse ISO 8601 timestamp from ThingSpeak into UTC datetime."""
    return datetime.fromisoformat(ts.replace("Z", "+00:00"))


def _clean_feeds(raw_feeds: list) -> list[EMGReading]:
    readings = []
    for entry in raw_feeds:
        emg_avg = _safe_float(entry.get("field1"))
        emg_rms = _safe_float(entry.get("field2"))
        muscle_load = _safe_float(entry.get("field3"))

        # Skip entries where all fields are null
        if all(v is None for v in [emg_avg, emg_rms, muscle_load]):
            continue

        readings.append(
            EMGReading(
                timestamp=_parse_timestamp(entry["created_at"]),
                emg_average=emg_avg,
                emg_rms=emg_rms,
                muscle_load=muscle_load,
            )
        )
    return readings


def _compute_stats(readings: list[EMGReading]) -> EMGStats:
    def safe_mean(vals):
        clean = [v for v in vals if v is not None]
        return round(statistics.mean(clean), 4) if clean else None

    avgs = [r.emg_average for r in readings]
    rms = [r.emg_rms for r in readings]
    loads = [r.muscle_load for r in readings]

    latest = readings[-1] if readings else None

    return EMGStats(
        latest_emg_average=latest.emg_average if latest else None,
        latest_emg_rms=latest.emg_rms if latest else None,
        latest_muscle_load=latest.muscle_load if latest else None,
        mean_emg_average=safe_mean(avgs),
        mean_emg_rms=safe_mean(rms),
        mean_muscle_load=safe_mean(loads),
        record_count=len(readings),
    )


async def fetch_emg_data(results: int = 100) -> EMGResponse:
    url = (
        f"{settings.THINGSPEAK_BASE_URL}/channels/"
        f"{settings.THINGSPEAK_CHANNEL_ID}/feeds.json"
    )
    params = {"api_key": settings.THINGSPEAK_READ_API_KEY, "results": results}

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()

    raw_feeds = data.get("feeds", [])
    readings = _clean_feeds(raw_feeds)
    stats = _compute_stats(readings)

    return EMGResponse(
        readings=readings,
        stats=stats,
        channel_id=settings.THINGSPEAK_CHANNEL_ID,
        fetched_at=datetime.now(timezone.utc),
    )
