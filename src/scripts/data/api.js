import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '../config';

/**
 * Mendefinisikan endpoint API berdasarkan rute backend.
 */
const ENDPOINTS = {
  // User Management
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  LOGOUT: (id) => `${BASE_URL}/logout/${id}`,

  // Profil Pengguna
  GET_USER_BY_ID: (id) => `${BASE_URL}/users/${id}`,
  UPDATE_USER: (id) => `${BASE_URL}/users/${id}`,
  DELETE_USER: (id) => `${BASE_URL}/users/${id}`,

  // Password Reset
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/reset-password`,

  // Dashboard Mine Planner (dicky)
  MINE_PLANNER_KPI: `${BASE_URL}/mine-planner/dashboard/kpi`,
  MINE_PLANNER_INFO: `${BASE_URL}/mine-planner/dashboard/info`,
  MINE_PLANNER_NOTIFICATIONS: `${BASE_URL}/mine-planner/dashboard/notifications`,
};

/**
 * Fungsi helper umum untuk menangani respons fetch.
 * Mengembalikan { ...json, ok: boolean }
 */
async function handleResponse(fetchResponse) {
  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

/**
 * Registrasi pengguna baru.
 * (Handler: registerUser, Path: POST /register)
 */
export async function registerUser({ nama, email, password, role }) {
  const payload = JSON.stringify({ nama, email, password, role });

  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: payload
  });

  // konversi hasil ke JSON
  const json = await response.json();

  return json;
}

/**
 * Login pengguna.
 * (Handler: loginUser, Path: POST /login)
 */
export async function loginUser({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });

  return handleResponse(fetchResponse);
}

/**
 * Logout pengguna.
 * (Handler: logoutUser, Path: DELETE /logout/{id})
 * Catatan: Berdasarkan handler, ini tidak memerlukan token, hanya ID.
 */
export async function logoutUser(id) {
  const fetchResponse = await fetch(ENDPOINTS.LOGOUT(id), {
    method: 'DELETE',
  });

  return handleResponse(fetchResponse);
}

/**
 * Mendapatkan profil pengguna berdasarkan ID.
 * (Handler: getUserById, Path: GET /users/{id})
 * Memerlukan otorisasi.
 */
export async function getUserById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.GET_USER_BY_ID(id), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return handleResponse(fetchResponse);
}

/**
 * Memperbarui profil pengguna.
 * (Handler: updateUser, Path: PUT /users/{id})
 * Memerlukan otorisasi.
 */
export async function updateUser(id, { nama, email, password }) {
  const accessToken = getAccessToken();

  // Hanya kirim field yang diisi
  const payload = { nama, email };
  if (password) {
    payload.password = password;
  }
  const data = JSON.stringify(payload);

  const fetchResponse = await fetch(ENDPOINTS.UPDATE_USER(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

  return handleResponse(fetchResponse);
}

/**
 * Menghapus profil pengguna.
 * (Handler: deleteUser, Path: DELETE /users/{id})
 * Memerlukan otorisasi.
 */
export async function deleteUser(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.DELETE_USER(id), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return handleResponse(fetchResponse);
}

/**
 * Meminta reset password.
 * (Handler: forgotPassword, Path: POST /forgot-password)
 */
export async function forgotPassword({ email }) {
  const data = JSON.stringify({ email });

  const fetchResponse = await fetch(ENDPOINTS.FORGOT_PASSWORD, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });

  return handleResponse(fetchResponse);
}

/**
 * Melakukan reset password dengan token.
 * (Handler: resetPassword, Path: POST /reset-password)
 */
export async function resetPassword(token, newPassword) {
  try {
    const res = await fetch(ENDPOINTS.RESET_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token,
        newPassword: newPassword,
      })
    });

    return await res.json();
  } catch (err) {
    // console.error("Error during password reset:", err);
    return { error: "Network error" };
  }
}

// Dashboard Mine Planner
export async function getMinePlannerDashboardKpi() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MINE_PLANNER_KPI, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return handleResponse(fetchResponse);
}

export async function getMinePlannerDashboardInfo() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MINE_PLANNER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return handleResponse(fetchResponse);
}

export async function getMinePlannerDashboardNotifications() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MINE_PLANNER_NOTIFICATIONS, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return handleResponse(fetchResponse);
}
