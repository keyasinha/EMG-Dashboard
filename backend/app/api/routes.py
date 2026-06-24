from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
import csv
import io
from app.services.thingspeak import fetch_emg_data
from app.models.emg import EMGResponse

router = APIRouter()


@router.get("/emg", response_model=EMGResponse, summary="Fetch latest EMG readings")
async def get_emg_data(results: int = Query(default=100, ge=1, le=8000)):
    """
    Fetch and clean the latest N EMG readings from ThingSpeak.
    Returns cleaned time-series data plus aggregate statistics.
    """
    try:
        return await fetch_emg_data(results=results)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"ThingSpeak fetch failed: {str(e)}")


@router.get("/emg/export", summary="Export EMG data as CSV")
async def export_emg_csv(results: int = Query(default=100, ge=1, le=8000)):
    """Download EMG readings as a CSV file for offline analysis."""
    try:
        data = await fetch_emg_data(results=results)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"ThingSpeak fetch failed: {str(e)}")

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["timestamp_utc", "emg_average", "emg_rms", "muscle_load"])
    for r in data.readings:
        writer.writerow([
            r.timestamp.isoformat(),
            r.emg_average,
            r.emg_rms,
            r.muscle_load,
        ])

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=emg_export.csv"},
    )


# ── ML feature stubs ─────────────────────────────────────────────────────────

@router.get("/emg/fatigue", summary="[Stub] Fatigue detection")
async def get_fatigue_analysis():
    """
    Placeholder endpoint for muscle fatigue detection.
    Implement using RMS trend analysis and median frequency shift.
    """
    return {"status": "not_implemented", "feature": "fatigue_detection"}


@router.get("/emg/gesture", summary="[Stub] Gesture recognition")
async def get_gesture_recognition():
    """
    Placeholder endpoint for gesture classification.
    Implement using a windowed classifier (SVM, CNN, or LSTM).
    """
    return {"status": "not_implemented", "feature": "gesture_recognition"}


@router.get("/emg/tremor", summary="[Stub] Tremor analysis")
async def get_tremor_analysis():
    """
    Placeholder endpoint for tremor frequency and amplitude analysis.
    Implement using FFT on a sliding window of EMG average signal.
    """
    return {"status": "not_implemented", "feature": "tremor_analysis"}
