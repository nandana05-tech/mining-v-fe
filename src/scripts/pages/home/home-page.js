export default class HomePage {
  async render() {
    document.body.classList.remove('auth-page');
    return `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-left">
              <div class="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                </svg>
                Powered by Artificial Intelligence
              </div>
              <h1 class="hero-title">
                Optimalkan Operasi<br>
                Tambang dengan <span class="gradient-text">AI Intelligence</span>
              </h1>
              <p class="hero-description">
                Sistem berbasis AI yang membantu Anda mengoptimalkan produksi dan distribusi hasil tambang secara real-time dengan meminimalkan risiko operasional hingga 30%
              </p>
              
              <div class="hero-stats">
                <div class="stat-item">
                  <div class="stat-value">30%</div>
                  <div class="stat-label">Peningkatan Efisiensi</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">&lt;2s</div>
                  <div class="stat-label">Response Time</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">24/7</div>
                  <div class="stat-label">AI Monitoring</div>
                </div>
              </div>
            </div>

            <div class="hero-right">
              <div class="floating-cards">
                <!-- Weather Card -->
                <div class="floating-card weather-card">
                  <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                  </div>
                  <div class="card-content">
                    <h4>Weather<br>Monitoring</h4>
                    <span class="status-badge active">Active</span>
                  </div>
                </div>

                <!-- Production Card -->
                <div class="floating-card production-card">
                  <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="20" x2="12" y2="10"/>
                      <line x1="18" y1="20" x2="18" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="16"/>
                    </svg>
                  </div>
                  <div class="card-content">
                    <h4>Production</h4>
                    <span class="status-badge increase">+12%</span>
                  </div>
                </div>

                <!-- Fleet Management Card -->
                <div class="floating-card fleet-card">
                  <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="1" y="3" width="15" height="13"/>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/>
                      <circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  </div>
                  <div class="card-content">
                    <h4>Fleet<br>Management</h4>
                    <span class="status-badge units">18/25 Units</span>
                  </div>
                </div>

                <!-- AI Engine Card (Center) -->
                <div class="floating-card ai-card">
                  <div class="ai-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6M6 12H1m6 0h6m6 0h5M4.2 4.2l4.2 4.2m5.6 5.6l4.2 4.2M19.8 4.2l-4.2 4.2m-5.6 5.6l-4.2 4.2"/>
                    </svg>
                  </div>
                  <h3>AI Engine</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="section-container">
          <div class="section-header">
            <span class="section-badge">Fitur Unggulan</span>
            <h2 class="section-title">Solusi Komprehensif untuk Optimasi Tambang</h2>
            <p class="section-subtitle">
              Platform all-in-one yang mengintegrasikan monitoring real-time, AI analytics, dan
              rekomendasi otomatis untuk operasional tambang yang lebih efisien
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon blue">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                </svg>
              </div>
              <h3 class="feature-title">Real-Time Monitoring</h3>
              <p class="feature-description">
                Pantau operasi tambang secara real-time, analisis data secara live, dan dapatkan insights langsung
              </p>
              <ul class="feature-list">
                <li>Monitor Kinerja Integrasi</li>
                <li>Live condition tracking</li>
                <li>Fleet GPS positioning</li>
              </ul>
            </div>

            <div class="feature-card featured">
              <div class="featured-badge">Most Popular</div>
              <div class="feature-icon gradient">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 class="feature-title">AI-Powered Recommendations</h3>
              <p class="feature-description">
                Dapatkan rekomendasi optimal berbasis machine learning untuk jadwal produksi dan pengiriman
              </p>
              <ul class="feature-list">
                <li>Smart scheduling optimization</li>
                <li>Predictive maintenance alerts</li>
                <li>Resource allocation AI</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon purple">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </div>
              <h3 class="feature-title">Advanced Analytics</h3>
              <p class="feature-description">
                Dashboard interaktif dengan visualisasi data kompleks dan insight untuk better decision making
              </p>
              <ul class="feature-list">
                <li>Interactive dashboards</li>
                <li>Customizable reports</li>
                <li>Historical data analysis</li>
              </ul>
            </div>
          </div>

          <div class="features-grid-secondary">
            <div class="feature-card-small">
              <div class="feature-icon-small blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <h4 class="feature-small-title">Scenario Simulation</h4>
              <p class="feature-small-desc">Simulasikan berbagai skenario operasional untuk menemukan solusi terbaik</p>
            </div>

            <div class="feature-card-small">
              <div class="feature-icon-small green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h4 class="feature-small-title">AI Chat Assistant</h4>
              <p class="feature-small-desc">Tanya jawab interaktif dengan AI untuk mendapatkan insight dan rekomendasi real-time</p>
            </div>

            <div class="feature-card-small">
              <div class="feature-icon-small orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                </svg>
              </div>
              <h4 class="feature-small-title">Lightning Fast</h4>
              <p class="feature-small-desc">Response time < 2 detik untuk query dan rekomendasi, maksimalkan produktivitas</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="benefits-section">
        <div class="section-container">
          <div class="section-header">
            <span class="section-badge">Cara Kerja</span>
            <h2 class="section-title">Empat Langkah Menuju Optimasi</h2>
            <p class="section-subtitle">
              Sistem kami dirancang untuk memudahkan Anda dalam mengoptimalkan operasi tambang<br>
              melalui proses yang terstruktur dan efisien
            </p>
          </div>

          <div class="benefits-timeline">
            <div class="benefit-step">
              <div class="step-number">01</div>
              <div class="step-icon blue">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3 class="step-title">Input Data Operasional</h3>
              <p class="step-description">
                Masukkan data cuaca, kondisi jalan, status armada, dan jadwal kapal. Sistem juga support auto-import dari sensor IoT
              </p>
              <div class="step-visual">
                <div class="visual-bar" style="width: 60%; background: #e5e7eb;"></div>
                <div class="visual-bar" style="width: 80%; background: #e5e7eb; margin-top: 4px;"></div>
                <div class="visual-bar" style="width: 40%; background: #93c5fd; margin-top: 4px;"></div>
              </div>
            </div>

            <div class="timeline-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div class="benefit-step">
              <div class="step-number">02</div>
              <div class="step-icon cyan">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6M6 12H1m6 0h6m6 0h5M4.2 4.2l4.2 4.2m5.6 5.6l4.2 4.2M19.8 4.2l-4.2 4.2m-5.6 5.6l-4.2 4.2"/>
                </svg>
              </div>
              <h3 class="step-title">AI Analysis & Simulation</h3>
              <p class="step-description">
                AI menganalisis data dan menjalankan simulasi multiple skenario untuk menemukan solusi optimal
              </p>
              <div class="step-visual">
                <div class="visual-chart">
                  <div class="chart-bar" style="height: 40%; background: #3b82f6;"></div>
                  <div class="chart-bar" style="height: 70%; background: #3b82f6;"></div>
                  <div class="chart-bar" style="height: 50%; background: #3b82f6;"></div>
                  <div class="chart-bar" style="height: 90%; background: #60a5fa;"></div>
                </div>
              </div>
            </div>

            <div class="timeline-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div class="benefit-step">
              <div class="step-number">03</div>
              <div class="step-icon yellow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3 class="step-title">Get Recommendations</h3>
              <p class="step-description">
                Terima rekomendasi yang diprioritaskan dengan justifikasi lengkap, impact analysis, dan visualisasi isometric
              </p>
              <div class="step-visual">
                <div class="visual-metrics">
                  <div class="metric-bar" style="width: 100%; background: #ef4444;"></div>
                  <div class="metric-bar" style="width: 80%; background: #f97316; margin-top: 4px;"></div>
                  <div class="metric-bar" style="width: 60%; background: #eab308; margin-top: 4px;"></div>
                  <div class="metric-bar" style="width: 90%; background: #22c55e; margin-top: 4px;"></div>
                </div>
              </div>
            </div>

            <div class="timeline-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>

            <div class="benefit-step">
              <div class="step-number">04</div>
              <div class="step-icon green">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <h3 class="step-title">Implement & Monitor</h3>
              <p class="step-description">
                Implementasikan rekomendasi di lapangan dan monitor hasilnya secara real-time melalui dashboard
              </p>
              <div class="step-visual">
                <div class="visual-grid">
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                  <div class="grid-item"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-left">
              <div class="footer-brand">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="7.5 10.5 12 14 16.5 10.5"/>
                </svg>
                <h3>MineOptima AI</h3>
              </div>
              <p class="footer-description">
                Mining Value Chain Optimization powered by AI Intelligence for better operational efficiency
              </p>
            </div>
            
            <div class="footer-links">
              <div class="footer-column">
                <h4>Produk</h4>
                <ul>
                  <li><a href="#/">Fitur</a></li>
                  <li><a href="#/">Cara Kerja</a></li>
                  <li><a href="#/">Keunggulan</a></li>
                </ul>
              </div>
              
              <div class="footer-column">
                <h4>Perusahaan</h4>
                <ul>
                  <li><a href="#/about">Tentami Kami</a></li>
                  <li><a href="#/">FAQ</a></li>
                </ul>
              </div>
              
              <div class="footer-column">
                <h4>Support</h4>
                <ul>
                  <li><a href="#/">Documentation</a></li>
                  <li><a href="#/">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; 2025 MineOptima AI. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="#/">Privacy Policy</a>
              <a href="#/">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  async afterRender() {
    // Smooth scroll for anchor links (only for section anchors, not routes)
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href^="#/"]):not([href="#"])');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}
