/**
 * OptiMine SPA - API Service
 * Handle all API calls to backend
 */

import { Config } from '../../config.js';

const BASE_URL = Config.api.baseUrl;

/**
 * API Helper
 */
const api = {
    /**
     * Make HTTP request
     * @param {string} endpoint 
     * @param {Object} options 
     * @returns {Promise}
     */
    async request(endpoint, options = {}) {
        const url = `${BASE_URL}${endpoint}`;
        const token = localStorage.getItem(Config.storage.token);

        const defaultHeaders = {
            'Content-Type': 'application/json'
        };

        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    /**
     * GET request
     */
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },

    /**
     * POST request
     */
    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    },

    /**
     * PUT request
     */
    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    },

    /**
     * DELETE request
     */
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
};

/**
 * API Endpoints
 * Full integration with Backend Mining Management System
 * Base URL: http://139.59.224.58:5000
 * 
 * Authentication Required for most endpoints (Bearer Token)
 */
export const API = {
    // ========================================
    // AUTH ENDPOINTS
    // ========================================
    auth: {
        login: (credentials) => api.post('/login', credentials),
        register: (userData) => api.post('/register', userData),
        logout: (userId) => api.delete(`/logout/${userId}`),
        getUser: (userId) => api.get(`/users/${userId}`),
        updateUser: (userId, data) => api.put(`/users/${userId}`, data)
    },

    // ========================================
    // MINE OPERATIONS ENDPOINTS
    // ========================================
    mines: {
        getAll: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return api.get(`/mines${query ? '?' + query : ''}`);
        },
        getById: (id) => api.get(`/mines/${id}`)
    },

    equipments: {
        getAll: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return api.get(`/equipments${query ? '?' + query : ''}`);
        },
        getById: (id) => api.get(`/equipments/${id}`),
        create: (data) => api.post('/equipments', data),
        update: (id, data) => api.put(`/equipments/${id}`, data)
    },

    weather: {
        getAll: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return api.get(`/weather${query ? '?' + query : ''}`);
        }
    },

    roads: {
        getAll: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return api.get(`/roads${query ? '?' + query : ''}`);
        },
        update: (id, data) => api.put(`/roads/${id}`, data)
    },

    productionPlans: {
        getAll: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return api.get(`/production-plans${query ? '?' + query : ''}`);
        },
        create: (data) => api.post('/production-plans', data),
        update: (id, data) => api.put(`/production-plans/${id}`, data)
    },

    shippingSchedules: {
        getAll: (params = {}) => {
            const query = new URLSearchParams(params).toString();
            return api.get(`/shipping-schedules${query ? '?' + query : ''}`);
        },
        getById: (id) => api.get(`/shipping-schedules/${id}`),
        create: (data) => api.post('/shipping-schedules', data),
        update: (id, data) => api.put(`/shipping-schedules/${id}`, data)
    },

    effectiveCapacity: {
        getAll: () => api.get('/effective-capacity'),
        create: (data) => api.post('/effective-capacity', data),
        update: (id, data) => api.put(`/effective-capacity/${id}`, data)
    },

    productionConstraints: {
        getAll: () => api.get('/production-constraints'),
        create: (data) => api.post('/production-constraints', data)
    },

    // ========================================
    // AI ENDPOINTS
    // ========================================
    ai: {
        // Check AI Service Health (No Auth Required)
        health: async () => {
            console.log('🔍 Checking AI Health:', `${BASE_URL}/ai/health`);
            try {
                const response = await fetch(`${BASE_URL}/ai/health`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                return {
                    success: response.ok,
                    status: data.status || (response.ok ? 'healthy' : 'unhealthy'),
                    message: data.message || '',
                    data: data
                };
            } catch (error) {
                console.error('❌ AI Health check failed:', error);
                return { success: false, status: 'error', message: error.message };
            }
        },

        // LLM Status (No Auth Required)
        llmStatus: async () => {
            try {
                const response = await fetch(`${BASE_URL}/ai/llm/status`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                return await response.json();
            } catch (error) {
                console.error('❌ LLM Status check failed:', error);
                return { error: true, message: error.message };
            }
        },

        // RAG Health (No Auth Required)
        ragHealth: async () => {
            try {
                const response = await fetch(`${BASE_URL}/ai/rag/health`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                return await response.json();
            } catch (error) {
                console.error('❌ RAG Health check failed:', error);
                return { error: true, message: error.message };
            }
        },

        // AI Chat
        chat: async (message) => {
            const token = localStorage.getItem(Config.storage.token);
            try {
                const headers = { 'Content-Type': 'application/json' };
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const response = await fetch(`${BASE_URL}/ai/chat`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        chatInput: message,
                        message: message,
                        timestamp: new Date().toISOString(),
                        userId: localStorage.getItem('optimine-user') || 'anonymous',
                        language: document.documentElement.lang || 'id'
                    })
                });

                const responseText = await response.text();
                const data = responseText ? JSON.parse(responseText) : {};

                if (data.error) throw new Error(data.message || 'AI Service Error');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const aiResponse = data.data?.response || data.response || data.output || data.text || data.message || 'No response';
                return {
                    success: true,
                    data: { response: aiResponse, model: data.data?.model_used || data.model || 'AI' }
                };
            } catch (error) {
                console.error('❌ AI Chat error:', error);
                throw error;
            }
        },

        // AI Recommendations
        recommendations: (mineId, options = {}) => api.post('/ai/recommendations', { mine_id: mineId, ...options }),

        // Weather Forecast
        weatherForecast: (mineId, days = 7) => api.post('/ai/weather/forecast', { mine_id: mineId, days }),

        // Weather Classify
        weatherClassify: (data) => api.post('/ai/weather/classify', data),

        // Capacity Predict
        capacityPredict: (data) => api.post('/ai/capacity/predict', data),

        // Production Predict
        productionPredict: (data) => api.post('/ai/production/predict', data),

        // LLM Recommend
        llmRecommend: (data) => api.post('/ai/llm/recommend', data),

        // LLM Chat
        llmChat: (message, history = []) => api.post('/ai/llm/chat', { message, conversation_history: history }),

        // RAG Chat
        ragChat: (message, history = [], includeRag = true) => api.post('/ai/rag/chat', {
            message,
            conversation_history: history,
            include_rag_context: includeRag
        })
    }
};

export default API;
