// src/scripts/pages/shipping-planner/dashboard/dashboard-shipping-presenter.js

import * as api from '../../../data/api.js';

class ShippingPlannerDashboardPresenter {
    constructor({ view }) {
        this._view = view;
    }

    async init() {
        try {
            const [kpiRes, infoRes, notifRes] = await Promise.all([
                api.getShippingPlannerDashboardKpi(),
                api.getShippingPlannerDashboardInfo(),
                api.getShippingPlannerDashboardNotifications(),
            ]);

            if (!kpiRes.ok || !infoRes.ok || !notifRes.ok) {
                throw new Error('Gagal mengambil data dashboard shipping');
            }

            const kpi = kpiRes.data;
            const info = infoRes.data;
            const notifications = notifRes.data;

            this._view.showKpi(kpi);
            this._view.showInfo(info);
            this._view.showNotifications(notifications);
        } catch (error) {
            console.error('[ShippingPlannerDashboardPresenter] init error:', error);
            this._view.showError('Gagal memuat data dashboard shipping. Silakan coba lagi.');
        }
    }
}

export default ShippingPlannerDashboardPresenter;
