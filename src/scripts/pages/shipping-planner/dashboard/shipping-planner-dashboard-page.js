import Swal from 'sweetalert2';
import ShippingPlannerDashboardPresenter from './dashboard-shipping-presenter.js';

export default class ShippingPlannerDashboard {
    constructor() {
        this._presenter = null;
    }

    async render() {
        return `
      <section class="dashboard dashboard-shipping-planner container">
        <!-- ===== KPI STRIP ===== -->
        <div class="dashboard-kpi-grid">
          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Pengiriman Tepat Waktu</h1>
              <span><i class="fa-solid fa-clipboard-check"></i></span>
            </div>
            <p class="kpi-value" id="kpi-on-time-shipment">-</p>
          </article>

          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Tonnase Siap Kirim</h1>
              <span><i class="fa-solid fa-boxes-stacked"></i></span>
            </div>
            <p class="kpi-value" id="kpi-ready-tonnage">-</p>
          </article>

          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Loading Rate Rata-rata</h1>
              <span><i class="fa-solid fa-gauge-high"></i></span>
            </div>
            <p class="kpi-value" id="kpi-loading-rate">-</p>
          </article>

          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Risiko Demurrage</h1>
              <span><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
            <p class="kpi-value" id="kpi-demurrage-risk">-</p>
          </article>
        </div>

        <!-- ===== MAIN GRID SECTION (PORT MAP + ASSISTANT) ===== -->
        <div class="dashboard-main-grid">
          <!-- Panel Kiri - Peta Pelabuhan -->
          <section class="panel dashboard-port-map">
            <header>
              <h2>Peta Pelabuhan & Stockpile</h2>
            </header>

            <div class="panel-body">
              <div class="map-placeholder">
                <p>Port & Stockpile Map</p>
                <p class="map-caption">Lokasi stockpile, jetty, dan kapal aktif</p>
              </div>
            </div>
          </section>

          <!-- Panel Kanan - AI Assistant Shipping -->
          <section class="panel dashboard-assistant">
            <header class="assistant-header">
              <h2>AI Assistant (Shipping Planner)</h2>
              <button type="button" id="shipping-assistant-expand-btn" class="assistant-expand-btn">
                <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
              </button>
            </header>

            <div class="assistant-body">
              <div class="assistant-messages" id="shipping-assistant-messages"></div>

              <form id="shipping-assistant-form" class="assistant-input">
                <input
                  id="shipping-assistant-input"
                  placeholder="Tanyakan sesuatu, misalnya: 'Apakah stok cukup untuk 2 kapal berikutnya?'"
                  autocomplete="off"
                />
                <button type="submit">
                  <i class="fa-solid fa-paper-plane btn-arrow"></i>
                </button>
              </form>
            </div>
          </section>
        </div>

        <!-- ===== INFO ROW ===== -->
        <div class="dashboard-info-row">
          <section class="panel info-card">
            <div class="info-card-header">
              <h3>Kapal Berikutnya</h3>
              <span><i class="fa-solid fa-ship"></i></span>
            </div>
            <p id="info-next-vessel">-</p>
            <p id="info-next-vessel-description" class="info-description">
              info tambahan
            </p>
          </section>
          
          <section class="panel info-card">
            <div class="info-card-header">
              <h3>Status Stockpile Utama</h3>
              <span><i class="fa-solid fa-layer-group"></i></span>
            </div>
            <p id="info-stockpile">-</p>
            <p id="info-stockpile-description" class="info-description">
              info tambahan
            </p>
          </section>
          
          <section class="panel info-card">
            <div class="info-card-header">
              <h3>Cuaca & Kondisi Laut</h3>
              <span><i class="fa-solid fa-cloud-showers-heavy"></i></span>
            </div>
            <p id="info-weather-sea">-</p>
            <p id="info-weather-sea-description" class="info-description">
              info tambahan
            </p>
          </section>
        </div>

        <!-- ===== CHART SECTION ===== -->
        <section class="panel dashboard-charts">
          <header>
            <h2>Visualisasi Pengapalan</h2>
          </header>

          <div class="charts-grid">
            <div class="chart-card">
              <h3>Jadwal Kapal (Gantt)</h3>
              <div class="chart-placeholder" id="shipping-gantt-chart">
                <div class="icon-chart">
                  <i class="fa-solid fa-chart-gantt"></i>
                </div>
              </div>
            </div>

            <div class="chart-card">
              <h3>Loading Rate per Kapal</h3>
              <div class="chart-placeholder" id="shipping-loading-rate-chart">
                <div class="icon-chart">
                  <i class="fa-solid fa-chart-column"></i>
                </div>
              </div>
            </div>

            <div class="chart-card">
              <h3>Stockpile vs Kebutuhan</h3>
              <div class="chart-placeholder" id="shipping-stockpile-chart">
                <div class="icon-chart">
                  <i class="fa-solid fa-chart-line"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===== NOTIFICATION SECTION ===== -->
        <section class="panel dashboard-notification">
          <header>
            <h2>Notifikasi & Rekomendasi Shipping</h2>
          </header>

          <div id="shipping-notification-list" class="notification-list">
            <p>Tidak ada notifikasi.</p>
          </div>
        </section>
      </section>
    `;
    }

    async afterRender() {
        // Inisialisasi presenter (Model + logic bisnis)
        this._presenter = new ShippingPlannerDashboardPresenter({ view: this });
        await this._presenter.init();

        // Inisialisasi behaviour AI assistant (di View)
        this._initAssistant();
    }

    // ====== Dipanggil PRESENTER ======

    showKpi(kpi) {
        if (!kpi) return;

        const onTimeEl = document.querySelector('#kpi-on-time-shipment');
        const readyEl = document.querySelector('#kpi-ready-tonnage');
        const rateEl = document.querySelector('#kpi-loading-rate');
        const demurrageEl = document.querySelector('#kpi-demurrage-risk');

        if (onTimeEl) onTimeEl.textContent = `${kpi.onTimeShipment ?? '-'}%`;
        if (readyEl) readyEl.textContent = `${kpi.readyTonnage ?? '-'} Ton`;
        if (rateEl) rateEl.textContent = `${kpi.averageLoadingRate ?? '-'} T/jam`;
        if (demurrageEl) demurrageEl.textContent = kpi.demurrageRiskLabel ?? '-';
    }

    showInfo(info) {
        const vesselEl = document.querySelector('#info-next-vessel');
        const vesselDescEl = document.querySelector('#info-next-vessel-description');

        const stockpileEl = document.querySelector('#info-stockpile');
        const stockpileDescEl = document.querySelector('#info-stockpile-description');

        const weatherSeaEl = document.querySelector('#info-weather-sea');
        const weatherSeaDescEl = document.querySelector('#info-weather-sea-description');

        if (info?.nextVessel && vesselEl) vesselEl.textContent = info.nextVessel.title;
        if (info?.nextVessel && vesselDescEl) {
            vesselDescEl.textContent = info.nextVessel.description;
        }

        if (info?.stockpile && stockpileEl) {
            stockpileEl.textContent = info.stockpile.title;
        }
        if (info?.stockpile && stockpileDescEl) {
            stockpileDescEl.textContent = info.stockpile.description;
        }

        if (info?.weatherSea && weatherSeaEl) {
            weatherSeaEl.textContent = info.weatherSea.title;
        }
        if (info?.weatherSea && weatherSeaDescEl) {
            weatherSeaDescEl.textContent = info.weatherSea.description;
        }
    }

    showNotifications(notifications = []) {
        const container = document.querySelector('#shipping-notification-list');
        if (!container) return;

        if (!notifications.length) {
            container.innerHTML = '<p>Tidak ada notifikasi.</p>';
            return;
        }

        container.innerHTML = notifications
            .map(
                (notif) => `
        <article class="notification-item notification-item--${notif.level}">
          <div>
            <h3>${notif.title}</h3>
            <p>${notif.message}</p>
          </div>
        </article>
      `,
            )
            .join('');
    }

    showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
        });
    }

    // ====== INTERNAL: init AI assistant Shipping ======

    _initAssistant() {
        const form = document.querySelector('#shipping-assistant-form');
        const messages = document.querySelector('#shipping-assistant-messages');
        const input = document.querySelector('#shipping-assistant-input');
        const expandBtn = document.querySelector('#shipping-assistant-expand-btn');

        if (!form || !messages || !input) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            messages.innerHTML += `
        <div class="assistant-message user">
          ${text}
        </div>
      `;
            input.value = '';

            // TODO: call API AI via presenter
            messages.innerHTML += `
        <div class="assistant-message bot">
          Sedang menganalisis data shipping...
        </div>
      `;

            messages.scrollTop = messages.scrollHeight;
        });

        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                this._openAssistantModal(messages);
            });
        }
    }

    _openAssistantModal(sourceMessagesContainer) {
        Swal.fire({
            title: 'AI Assistant (Shipping Planner)',
            html: `
        <div class="assistant-modal">
          <div id="shipping-assistant-modal-messages" class="assistant-messages"></div>
          <form id="shipping-assistant-modal-form" class="assistant-input">
            <input
              id="shipping-assistant-modal-input"
              placeholder="Tanyakan sesuatu..."
              autocomplete="off"
            />
            <button type="submit">
              <i class="fa-solid fa-paper-plane btn-arrow"></i>
            </button>
          </form>
        </div>
      `,
            showConfirmButton: false,
            width: '800px',
            padding: '1.5rem',
        });

        const modalMessages = document.querySelector('#shipping-assistant-modal-messages');
        if (modalMessages && sourceMessagesContainer) {
            modalMessages.innerHTML = sourceMessagesContainer.innerHTML;
            modalMessages.scrollTop = modalMessages.scrollHeight;
        }

        const modalForm = document.querySelector('#shipping-assistant-modal-form');
        const modalInput = document.querySelector('#shipping-assistant-modal-input');

        if (!modalForm || !modalInput || !modalMessages) return;

        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = modalInput.value.trim();
            if (!text) return;

            modalMessages.innerHTML += `
        <div class="assistant-message user">
          ${text}
        </div>
      `;

            modalInput.value = '';

            // TODO: call API AI via presenter
            modalMessages.innerHTML += `
        <div class="assistant-message bot">
          Sedang menganalisis data shipping (versi extended)...
        </div>
      `;

            modalMessages.scrollTop = modalMessages.scrollHeight;

            // sinkronkan ke card kecil
            if (sourceMessagesContainer) {
                sourceMessagesContainer.innerHTML = modalMessages.innerHTML;
                sourceMessagesContainer.scrollTop =
                    sourceMessagesContainer.scrollHeight;
            }
        });
    }
}
