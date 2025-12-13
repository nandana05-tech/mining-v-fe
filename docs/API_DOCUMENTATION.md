# OptiMine API Documentation

## Overview

Dokumentasi ini menjelaskan API endpoints yang digunakan oleh OptiMine Frontend untuk berkomunikasi dengan Backend Server.

**Base URL (Production VPS):** `http://139.59.224.58:5000`

---

## Endpoints Summary

| Endpoint | URL | Method |
|----------|-----|--------|
| Login | http://139.59.224.58:5000/login | POST |
| Register | http://139.59.224.58:5000/register | POST |
| AI Chat | http://139.59.224.58:5000/ai/chat | POST |
| AI Health | http://139.59.224.58:5000/ai/health | GET |

---

Semua request yang memerlukan autentikasi harus menyertakan header:

```
Authorization: Bearer <token>
```

Token diperoleh setelah login berhasil dan disimpan di `localStorage` dengan key `optimine-token`.

---

## Storage Keys

| Key | Deskripsi |
|-----|-----------|
| `optimine-token` | JWT authentication token |
| `optimine-user` | User data (JSON) |
| `optimine-logged-in` | Login status ('true'/'false') |
| `optimine-theme` | Theme preference ('dark'/'light') |
| `optimine-language` | Language preference ('id'/'en') |

---

## Authentication Endpoints

### POST /register

Mendaftarkan user baru.

**Request Body:**
```json
{
    "nama": "string",
    "email": "string",
    "password": "string",
    "role": "string"
}
```

**Response Success (200):**
```json
{
    "error": false,
    "message": "Registration successful",
    "data": {
        "id": "number",
        "email": "string",
        "nama": "string"
    }
}
```

**Response Error (400):**
```json
{
    "error": true,
    "message": "Email already registered"
}
```

---

### POST /login

Login user.

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response Success (200):**
```json
{
    "error": false,
    "message": "Login successful",
    "data": {
        "id": "number",
        "nama": "string",
        "role": "string",
        "token": "string"
    }
}
```

**Response Error (401):**
```json
{
    "error": true,
    "message": "Invalid email or password"
}
```

---

## Dashboard Endpoints

### GET /production-plans

Mengambil data rencana produksi.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | number | No | 10 | Jumlah data yang ditampilkan |
| `page` | number | No | 1 | Halaman data |

**Response Success (200):**
```json
{
    "error": false,
    "message": "Production plans fetched successfully",
    "data": [
        {
            "id": "number",
            "mine_id": "number",
            "target_production": "number",
            "actual_production": "number",
            "date": "string (ISO 8601)",
            "status": "string (active/completed/pending)",
            "created_at": "string (ISO 8601)"
        }
    ],
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number",
        "totalPages": "number"
    }
}
```

---

### GET /equipments

Mengambil data peralatan.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `all` | boolean | No | false | Ambil semua data |
| `status` | string | No | - | Filter by status |

**Response Success (200):**
```json
{
    "error": false,
    "message": "Equipments fetched successfully",
    "data": [
        {
            "id": "number",
            "name": "string",
            "type": "string",
            "status": "string (active/maintenance/inactive)",
            "mine_id": "number",
            "last_maintenance": "string (ISO 8601)",
            "next_maintenance": "string (ISO 8601)"
        }
    ]
}
```

---

### GET /shipping-schedules

Mengambil jadwal pengiriman.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | number | No | 10 | Jumlah data yang ditampilkan |
| `status` | string | No | - | Filter by status |

**Response Success (200):**
```json
{
    "error": false,
    "message": "Shipping schedules fetched successfully",
    "data": [
        {
            "id": "number",
            "vessel_name": "string",
            "cargo_amount": "number",
            "loading_port": "string",
            "destination_port": "string",
            "departure_date": "string (ISO 8601)",
            "arrival_date": "string (ISO 8601)",
            "status": "string (loading/in-transit/arrived/completed)"
        }
    ]
}
```

---

### GET /mines

Mengambil data lokasi tambang.

**Response Success (200):**
```json
{
    "error": false,
    "message": "Mines fetched successfully",
    "data": [
        {
            "id": "number",
            "name": "string",
            "location": "string",
            "status": "string (active/inactive)",
            "capacity": "number",
            "current_production": "number",
            "coordinates": {
                "lat": "number",
                "lng": "number"
            }
        }
    ]
}
```

---

### GET /weather

Mengambil data cuaca.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | number | No | 1 | Jumlah data yang ditampilkan |
| `location` | string | No | - | Filter by location |

**Response Success (200):**
```json
{
    "error": false,
    "message": "Weather data fetched successfully",
    "data": [
        {
            "id": "number",
            "location": "string",
            "condition": "string (Clear/Cloudy/Rain/Storm)",
            "temperature": "number",
            "humidity": "number",
            "wind_speed": "number",
            "recorded_at": "string (ISO 8601)"
        }
    ]
}
```

---

### GET /roads

Mengambil kondisi jalan.

**Response Success (200):**
```json
{
    "error": false,
    "message": "Road conditions fetched successfully",
    "data": [
        {
            "id": "number",
            "name": "string",
            "from": "string",
            "to": "string",
            "condition": "string (good/fair/poor)",
            "distance": "number",
            "estimated_time": "number",
            "last_checked": "string (ISO 8601)"
        }
    ]
}
```

---

## Error Codes

| HTTP Code | Description |
|-----------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or expired token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Error Response Format

```json
{
    "error": true,
    "message": "string",
    "code": "string (optional)"
}
```

---

## Frontend Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     User Opens Dashboard                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│           Check localStorage for 'optimine-token'           │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
        Token Found                      No Token
              │                               │
              ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│ fetchDashboardData()│         │   Show Mock Data    │
└─────────────────────┘         └─────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│              Parallel API Calls (Promise.all)               │
│  • GET /production-plans?limit=10                           │
│  • GET /equipments?all=true                                 │
│  • GET /shipping-schedules?limit=10                         │
│  • GET /mines                                               │
│  • GET /weather?limit=1                                     │
│  • GET /roads                                               │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
         All Success                    Some Failed
              │                               │
              ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│  updateStatsGrid()  │         │ Show Error Toast    │
│  updateLiveStatus() │         │ Retry (max 3 times) │
│  updateWeatherWidget│         │ Use cached/mock data│
└─────────────────────┘         └─────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│              Auto Refresh Every 30 Seconds                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Dashboard Data Mapping

| UI Element | API Endpoint | Data Field |
|------------|--------------|------------|
| Production Plans | `/production-plans` | `target_production` |
| Active Equipment | `/equipments` | `status === 'active'` |
| Shipping Today | `/shipping-schedules` | `cargo_amount` |
| Active Mines | `/mines` | `status === 'active'` |
| Weather Status | `/weather` | `condition` |
| Temperature | `/weather` | `temperature` |
| Humidity | `/weather` | `humidity` |
| Wind Speed | `/weather` | `wind_speed` |
| Road Conditions | `/roads` | `condition` |

---

## Usage Examples

### Fetching Dashboard Data

```javascript
const API_BASE_URL = 'http://localhost:5000';
const authToken = localStorage.getItem('optimine-token');

async function apiCall(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });
    return response.json();
}

// Fetch all dashboard data
const [production, equipment, shipping, mines, weather, roads] = await Promise.all([
    apiCall('/production-plans?limit=10'),
    apiCall('/equipments?all=true'),
    apiCall('/shipping-schedules?limit=10'),
    apiCall('/mines'),
    apiCall('/weather?limit=1'),
    apiCall('/roads')
]);
```

### Handling Authentication

```javascript
// Login
const loginResponse = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});

const result = await loginResponse.json();

if (!result.error) {
    localStorage.setItem('optimine-token', result.data.token);
    localStorage.setItem('optimine-logged-in', 'true');
    localStorage.setItem('optimine-user', JSON.stringify({
        id: result.data.id,
        email: email,
        name: result.data.nama,
        role: result.data.role
    }));
}
```

---

## Notes

1. **CORS**: Backend harus mengizinkan CORS dari frontend origin
2. **Token Expiry**: Token akan expired, handle 401 response dengan redirect ke login
3. **Rate Limiting**: Dashboard refresh setiap 30 detik, hindari request berlebihan
4. **Fallback Data**: Jika API gagal, gunakan data mock/cached sebelumnya
