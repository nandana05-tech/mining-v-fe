export default class MinePlannerDashboard {
  async render() {
    return `
      <section class="dashboard dashboard-mine-planner container">
        <div class="dashboard-kpi-grid">
          <article class="kpi-card">
           <div class="kpi-header">
              <h1>Ketersediaan Armada </h1>
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
            <p class="kpi-value" id="kpi-delay">-</p>
          </article>
        </div>

        <!-- ===== MAIN GRID SECTION (MAP + ASSISTANT) ===== -->
        <div class="dashboard-main-grid">
          <!-- Panel Kiri - Map -->
          <section class="panel dashboard-map">
            <header>
              <h2>Peta Operasi Pertambangan</h2>
            </header>

            <div class="panel-body">
              <div class="map-placeholder">
                <p>Map Loading...</p>
              </div>
            </div>
          </section>

          <!-- Panel Kanan - AI Assistant -->
          <section class="panel dashboard-assistant">
            <header>
              <h2>AI Assistant (Mine Planner)</h2>
            </header>

            <div class="assistant-body">
              <div class="assistant-messages" id="assistant-messages"></div>

              <form id="assistant-form" class="assistant-input">
                <input id="assistant-input" placeholder="Tanyakan sesuatu..." autocomplete="off"/>
                <button type="submit"><i class="fa-solid fa-paper-plane btn-arrow"></i></button>
              </form>
            </div>
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
            <p id="info-description" class="info-description">info tambahan</p>
            </section>
            
            <section class="panel info-card">
            <div class="info-card-header">
            <h3>Proyeksi Servis Armada</h3>
            <span><i class="fa-solid fa-screwdriver-wrench"></i></span>
            </div>
            <p id="info-fleet">-</p>
            <p id="info-description" class="info-description">info tambahan</p>
            </section>
            
            <section class="panel info-card">
            <div class="info-card-header">
            <h3>Kapal</h3>
            <span><i class="fa-solid fa-ship"></i></span>
            </div>
            <p id="info-queue">-</p>
            <p id="info-description" class="info-description">info tambahan</p>
          </section>
        </div>


        <!-- ===== CHART SECTION ===== -->
        <section class="panel dashboard-charts">
          <header>
            <h2>Visualisasi dan Justifikasi AI</h2>
          </header>

          <div class="charts-grid">
            <div class="chart-card">
              <h3>Gantt Chart</h3>
              <div class="chart-placeholder" id="gantt-chart">
                <div class="icon-chart"><i class="fa-solid fa-chart-gantt"></i></div>
              </div>
            </div>

            <div class="chart-card">
              <h3>Stacked Column</h3>
              <div class="chart-placeholder" id="stacked-column">
                <div class="icon-chart"><i class="fa-solid fa-chart-column"></i></div>
              </div>
            </div>

            <div class="chart-card">
              <h3>Line Chart</h3>
              <div class="chart-placeholder" id="line-chart">
                <div class="icon-chart"><i class="fa-solid fa-chart-line"></i></div>
              </div>
            </div>

          </div>

        </section>


        <!-- ===== NOTIFICATION SECTION ===== -->
        <section class="panel dashboard-notification">
          <header>
            <h2>Notifikasi & Rekomendasi</h2>
          </header>

          <div id="notification-list" class="notification-list">
            <!-- Placeholder notif -->
            <p>Tidak ada notifikasi.</p>
          </div>
        </section>

      </section>
    `;
  }

  async afterRender() {
    // ==========================
    // 1. Fetch data KPI, info, chart, notifikasi
    // 2. Render map
    // 3. Handle AI assistant
    // ==========================

    const assistantForm = document.querySelector('#assistant-form');
    const assistantMessages = document.querySelector('#assistant-messages');
    const assistantInput = document.querySelector('#assistant-input');

    assistantForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = assistantInput.value.trim();
      if (!text) return;

      // Tampilkan pesan user
      assistantMessages.innerHTML += `
        <div class="assistant-message user">
          ${text}
        </div>
      `;

      assistantInput.value = '';

      // Placeholder respon AI
      assistantMessages.innerHTML += `
        <div class="assistant-message bot">
          Sedang menganalisis data...
        </div>
      `;
    });
  }
}
