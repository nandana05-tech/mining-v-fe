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
 * Only includes endpoints available from backend:
 * - /login (POST)
 * - /register (POST)
 * - /ai/chat (POST)
 * - /ai/health (GET)
 */
export const API = {
    // Auth endpoints - Available from Backend VPS
    auth: {
        login: (credentials) => api.post('/login', credentials),
        register: (userData) => api.post('/register', userData)
    },

    // AI Assistant endpoints - Connected to Backend AI Service
    ai: {
        // Check AI Service Health
        health: async () => {
            console.log('🔍 Checking AI Health:', `${BASE_URL}/ai/health`);

            try {
                const response = await fetch(`${BASE_URL}/ai/health`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                console.log('✅ AI Health response:', data);

                return {
                    success: response.ok,
                    status: data.status || (response.ok ? 'healthy' : 'unhealthy'),
                    message: data.message || '',
                    data: data
                };
            } catch (error) {
                console.error('❌ AI Health check failed:', error);
                return {
                    success: false,
                    status: 'error',
                    message: error.message
                };
            }
        },

        // AI Chat endpoint
        chat: async (message) => {
            const token = localStorage.getItem(Config.storage.token);

            console.log('🚀 Sending to Backend AI Service:', `${BASE_URL}/ai/chat`);
            console.log('Message:', message);

            try {
                const headers = {
                    'Content-Type': 'application/json',
                };

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

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

                let data;
                try {
                    const responseText = await response.text();
                    console.log('📦 Raw response:', responseText);
                    data = responseText ? JSON.parse(responseText) : {};
                } catch (parseError) {
                    console.error('Parse error:', parseError);
                    data = {};
                }

                console.log('✅ AI Service response status:', response.status);
                console.log('✅ AI Service response data:', data);

                if (data.error) {
                    throw new Error(data.message || 'AI Service Error');
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Return response in expected format
                const aiResponse = data.data?.response || data.response || data.output || data.text || data.message || 'No response';

                return {
                    success: true,
                    data: {
                        response: aiResponse,
                        model: data.data?.model_used || data.model || 'AI'
                    }
                };
            } catch (error) {
                console.error('❌ Error connecting to AI Service:', error);
                throw error;
            }
        }
    }
};

export default API;
