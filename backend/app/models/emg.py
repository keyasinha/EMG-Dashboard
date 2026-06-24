from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class EMGReading(BaseModel):
    timestamp: datetime
    emg_average: Optional[float] = None
    emg_rms: Optional[float] = None
    muscle_load: Optional[float] = None


class EMGStats(BaseModel):
    latest_emg_average: Optional[float]
    latest_emg_rms: Optional[float]
    latest_muscle_load: Optional[float]
    mean_emg_average: Optional[float]
    mean_emg_rms: Optional[float]
    mean_muscle_load: Optional[float]
    record_count: int


class EMGResponse(BaseModel):
    readings: List[EMGReading]
    stats: EMGStats
    channel_id: str
    fetched_at: datetime


# ── ML feature stubs ─────────────────────────────────────────────────────────
# These models are placeholders for planned features.
# Populate them when implementing fatigue detection, gesture recognition,
# and tremor analysis modules.

class FatigueAnalysis(BaseModel):
    """Placeholder: muscle fatigue index derived from RMS trend."""
    fatigue_index: Optional[float] = None
    onset_detected: bool = False
    confidence: Optional[float] = None


class GestureLabel(BaseModel):
    """Placeholder: gesture class predicted from EMG pattern."""
    label: Optional[str] = None
    confidence: Optional[float] = None


class TremorAnalysis(BaseModel):
    """Placeholder: tremor frequency and amplitude metrics."""
    frequency_hz: Optional[float] = None
    amplitude: Optional[float] = None
    tremor_detected: bool = False
