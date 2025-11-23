import * as api from '../../../data/api.js';

class MinePlannerDashboardPresenter {
    constructor({ view }) {
        this._view = view;
    }

    async init() {
        try {
            const [kpiRes, infoRes, notifRes] = await Promise.all([
                api.getMinePlannerDashboardKpi(),
                api.getMinePlannerDashboardInfo(),
                api.getMinePlannerDashboardNotifications(),
            ]);

            if (!kpiRes.ok || !infoRes.ok || !notifRes.ok) {
                throw new Error('Gagal mengambil data dashboard');
            }

            const kpi = kpiRes.data;           // sesuaikan dengan struktur response backend
            const info = infoRes.data;
            const notifications = notifRes.data;

            this._view.showKpi(kpi);
            this._view.showInfo(info);
            this._view.showNotifications(notifications);
        } catch (error) {
            console.error('[MinePlannerDashboardPresenter] init error:', error);
            this._view.showError('Gagal memuat data dashboard. Silakan coba lagi.');
        }
    }
}

export default MinePlannerDashboardPresenter;
