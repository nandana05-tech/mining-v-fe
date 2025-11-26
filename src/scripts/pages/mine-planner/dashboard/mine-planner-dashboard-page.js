import Swal from 'sweetalert2';
import MinePlannerDashboardPresenter from './dashboard-mine-presenter.js';

export default class MinePlannerDashboard {
  constructor() {
    this._presenter = null;
  }

  async render() {
    return `
      <section class="dashboard dashboard-mine-planner container">
        <div class="dashboard-kpi-grid">
          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Ketersediaan Armada</h1>
              <span><i class="fa-solid fa-truck"></i></span>
            </div>
            <p class="kpi-value" id="kpi-utilization">-</p>
          </article>

          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Produksi Hari Ini</h1>
              <span><i class="fa-solid fa-chart-bar"></i></span>
            </div>
            <p class="kpi-value" id="kpi-production">-</p>
          </article>

          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Waktu Tempuh Rata-rata</h1>
              <span><i class="fa-solid fa-clock"></i></span>
            </div>
            <p class="kpi-value" id="kpi-cycle-time">-</p>
          </article>

          <article class="kpi-card">
            <div class="kpi-header">
              <h1>Status Pelabuhan Utama</h1>
              <span><i class="fa-solid fa-anchor"></i></span>
            </div>
            <p class="kpi-value" id="kpi-port-status">-</p>
          </article>
        </div>

        <!-- ===== MAIN GRID SECTION (MAP + ASSISTANT) ===== -->
        <div class="dashboard-main-grid">
          <section class="panel dashboard-map">
            <header class="map-operation-header">
              <h2>Peta Operasi Pertambangan</h2>
            </header>

            <div class="map-body">
              <div class="map-placeholder">
                <p>Map Loading...</p>
              </div>
            </div>
          </section>

          <section class="panel dashboard-assistant">
            <header class="assistant-header">
              <h2>AI Assistant (Mine Planner)</h2>
            </header>

            <div class="assistant-body">
                <div class="assistant-messages" id="assistant-messages"></div>

                <form id="assistant-form" class="assistant-input">
                    <div class="input-gradient-wrapper"> 
                        <input id="assistant-input" placeholder="Tanyakan sesuatu..." />
                    </div>
                    <button type="submit"><i class="fa-solid fa-paper-plane btn-arrow"></i></button>
                </form>
            </div>

            <!-- BUTTON EXTEND -->
            <button type="button" id="assistant-expand-btn" class="assistant-expand-btn">
              <i class="fa-solid fa-up-right-and-down-left-from-center expand-icon"></i>
            </button>
          </section>
        </div>

        <!-- ===== INFO ROW ===== -->
        <div class="dashboard-info-row">
          <section class="panel info-card">
            <div class="info-card-header">
              <h3>Prediksi Cuaca</h3>
              <span><i class="fa-solid fa-cloud-rain"></i></span>
            </div>
            <p id="info-weather">Hujan Sedang</p>
            <p id="info-weather-description" class="info-description">
              info tambahan
            </p>
          </section>
          
          <section class="panel info-card">
            <div class="info-card-header">
              <h3>Proyeksi Servis Armada</h3>
              <span><i class="fa-solid fa-screwdriver-wrench"></i></span>
            </div>
            <p id="info-fleet">-</p>
            <p id="info-fleet-description" class="info-description">
              info tambahan
            </p>
          </section>
          
          <section class="panel info-card">
            <div class="info-card-header">
              <h3>Kapal</h3>
              <span><i class="fa-solid fa-ship"></i></span>
            </div>
            <p id="info-ship">-</p>
            <p id="info-ship-description" class="info-description">
              info tambahan
            </p>
          </section>
        </div>

        <!-- ===== CHART SECTION ===== -->
        <section class="panel dashboard-charts">
          <header class="dashboard-charts-header">
            <h2>Visualisasi dan Justifikasi AI</h2>
          </header>

          <div class="charts-grid">
          
            <div class="chart-card">
              <h3>Gantt Chart</h3>
              <div class="chart-placeholder" id="gantt-chart">
                <div class="icon-chart">
                  <i class="fa-solid fa-chart-gantt"></i>
                </div>
              </div>
            </div>

            <div class="chart-card">
              <h3>Stacked Column</h3>
              <div class="chart-placeholder" id="stacked-column">
                <div class="icon-chart">
                  <i class="fa-solid fa-chart-column"></i>
                </div>
              </div>
            </div>

            <div class="chart-card">
              <h3>Line Chart</h3>
              <div class="chart-placeholder" id="line-chart">
                <div class="icon-chart">
                  <i class="fa-solid fa-chart-line"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===== NOTIFICATION SECTION ===== -->
        <section class="panel dashboard-notification">
          <header class="dashboard-notif-header">
            <h2>Notifikasi & Rekomendasi</h2>
          </header>

          <div id="notification-list" class="notification-list">
            <p>Tidak ada notifikasi.</p>
          </div>
        </section>
      </section>
    `;
  }

  async afterRender() {
    this._presenter = new MinePlannerDashboardPresenter({ view: this });
    await this._presenter.init();

    this._initAssistant();
  }

  // ====== Dipanggil PRESENTER ======
  showKpi(kpi) {
    if (!kpi) return;

    const utilEl = document.querySelector('#kpi-utilization');
    const prodEl = document.querySelector('#kpi-production');
    const cycleEl = document.querySelector('#kpi-cycle-time');
    const portEl = document.querySelector('#kpi-port-status');

    if (utilEl) utilEl.textContent = `${kpi.truckUtilization ?? '-'}%`;
    if (prodEl) prodEl.textContent = `${kpi.dailyProduction ?? '-'} Ton`;
    if (cycleEl) cycleEl.textContent = `${kpi.averageCycleTime ?? '-'} menit`;
    if (portEl) portEl.textContent = kpi.mainPortStatus ?? '-';
  }

  showInfo(info) {
    const weatherEl = document.querySelector('#info-weather');
    const weatherDescEl = document.querySelector('#info-weather-description');
    const fleetEl = document.querySelector('#info-fleet');
    const fleetDescEl = document.querySelector('#info-fleet-description');
    const shipEl = document.querySelector('#info-ship');
    const shipDescEl = document.querySelector('#info-ship-description');

    if (info?.weather && weatherEl) weatherEl.textContent = info.weather.title;
    if (info?.weather && weatherDescEl) {
      weatherDescEl.textContent = info.weather.description;
    }

    if (info?.fleet && fleetEl) fleetEl.textContent = info.fleet.title;
    if (info?.fleet && fleetDescEl) {
      fleetDescEl.textContent = info.fleet.description;
    }

    if (info?.ship && shipEl) shipEl.textContent = info.ship.title;
    if (info?.ship && shipDescEl) {
      shipDescEl.textContent = info.ship.description;
    }
  }

  showNotifications(notifications = []) {
    const container = document.querySelector('#notification-list');
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

  // ====== INTERNAL: init AI assistant di View ======

  _initAssistant() {
    const assistantForm = document.querySelector('#assistant-form');
    const assistantMessages = document.querySelector('#assistant-messages');
    const assistantInput = document.querySelector('#assistant-input');
    const assistantExpandBtn = document.querySelector('#assistant-expand-btn');

    if (!assistantForm || !assistantMessages || !assistantInput) return;

    // --- behaviour chat versi kecil (di card) ---
    assistantForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = assistantInput.value.trim();
      if (!text) return;

      // pesan user
      assistantMessages.innerHTML += `
      <div class="assistant-message user">
        ${text}
      </div>
    `;

      assistantInput.value = '';

      // TODO: nanti call API via presenter
      assistantMessages.innerHTML += `
      <div class="assistant-message bot">
        Sedang menganalisis data...
      </div>
    `;

      assistantMessages.scrollTop = assistantMessages.scrollHeight;
    });

    // --- behaviour tombol perbesar (extended modal) ---
    if (assistantExpandBtn) {
      assistantExpandBtn.addEventListener('click', () => {
        this._openAssistantModal(assistantMessages);
      });
    }
  }
  _openAssistantModal(sourceMessagesContainer) {
    Swal.fire({
      title: 'AI Assistant (Mine Planner)',
      html: `
      <div class="assistant-modal">
        <div id="assistant-modal-messages" class="assistant-messages"></div>
        <form id="assistant-modal-form" class="assistant-input">
          <input
            id="assistant-modal-input"
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

    // copy isi chat versi kecil ke modal
    const modalMessages = document.querySelector('#assistant-modal-messages');
    if (modalMessages && sourceMessagesContainer) {
      modalMessages.innerHTML = sourceMessagesContainer.innerHTML;
      modalMessages.scrollTop = modalMessages.scrollHeight;
    }

    const modalForm = document.querySelector('#assistant-modal-form');
    const modalInput = document.querySelector('#assistant-modal-input');

    if (!modalForm || !modalInput || !modalMessages) return;

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = modalInput.value.trim();
      if (!text) return;

      // pesan user di modal
      modalMessages.innerHTML += `
      <div class="assistant-message user">
        ${text}
      </div>
    `;

      modalInput.value = '';

      // TODO: call API via presenter, lalu tampilkan respon
      modalMessages.innerHTML += `
      <div class="assistant-message bot">
        Sedang menganalisis data (versi extended)...
      </div>
    `;

      modalMessages.scrollTop = modalMessages.scrollHeight;

      // OPTIONAL: sinkronkan juga ke card kecil
      if (sourceMessagesContainer) {
        sourceMessagesContainer.innerHTML = modalMessages.innerHTML;
        sourceMessagesContainer.scrollTop = sourceMessagesContainer.scrollHeight;
      }
    });
  }

}
