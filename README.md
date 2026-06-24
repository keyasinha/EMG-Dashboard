# EMG Monitoring Dashboard

Real-time electromyography monitoring interface backed by ThingSpeak, built for research and clinical use.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript + Tailwind CSS + Recharts |
| Backend | FastAPI + httpx |
| Data source | ThingSpeak IoT Cloud |

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env          # credentials already set for IISER channel
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs available at `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                   # starts on http://localhost:3000
```

The Vite dev server proxies `/api` → `http://localhost:8000`, so no CORS issues.

---

## Environment variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `THINGSPEAK_CHANNEL_ID` | `3414979` | ThingSpeak channel |
| `THINGSPEAK_READ_API_KEY` | `54V9WM6UNJQH0EBF` | Read key |
| `ALLOWED_ORIGINS` | `["http://localhost:3000"]` | CORS whitelist |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `/api/v1` | Backend base path |

---

## Field mapping

| ThingSpeak field | Signal | Unit |
|---|---|---|
| field1 | EMG Average | mV |
| field2 | EMG RMS | mV |
| field3 | Muscle Load | % |

---

## Planned ML features

Stub endpoints are already registered at:

- `GET /api/v1/emg/fatigue` — muscle fatigue detection via RMS trend + median frequency shift
- `GET /api/v1/emg/gesture` — gesture classification (SVM / CNN / LSTM on windowed segments)
- `GET /api/v1/emg/tremor` — tremor frequency and amplitude via FFT on sliding window

Implement each in `backend/app/services/` and wire to the existing route stubs.

---

## Project structure

```
emg-dashboard/
├── backend/
│   ├── app/
│   │   ├── api/routes.py          # All FastAPI endpoints
│   │   ├── core/config.py         # Settings (env vars)
│   │   ├── models/emg.py          # Pydantic models incl. ML stubs
│   │   ├── services/thingspeak.py # Fetch + clean ThingSpeak data
│   │   └── main.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── cards/MetricCard.tsx
    │   │   ├── charts/
    │   │   │   ├── ChartPanel.tsx
    │   │   │   ├── CombinedChart.tsx
    │   │   │   └── SingleMetricChart.tsx
    │   │   ├── layout/Header.tsx
    │   │   └── ui/
    │   │       ├── ErrorBanner.tsx
    │   │       └── Skeleton.tsx
    │   ├── hooks/
    │   │   ├── useDarkMode.ts
    │   │   └── useEMGData.ts      # 5-second polling
    │   ├── services/api.ts
    │   ├── types/emg.ts
    │   ├── utils/format.ts
    │   └── App.tsx
    └── .env.example
```
