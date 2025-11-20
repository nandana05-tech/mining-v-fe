import ResetPasswordPresenter from "./resetPassword-presenter";
import * as api from "../../../data/api";
import { getQueryParams } from "../../../routes/url-parser";
import Swal from "sweetalert2";
// import { getQueryParams } from "../../../routes/url-parser";

export default class ResetPasswordPage {
  constructor() {
    this.model = api;
    this.presenter = new ResetPasswordPresenter(this, this.model);
  }

  async render() {
    document.body.classList.add('auth-page');
    const token = this.getTokenFromUrl();

    if (!token) {
      return `
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-logo">
              <img src="./images/logo.png" alt="Mining Logo">
            </div>
            <h2 class="auth-title">Invalid Token</h2>
            <p class="auth-subtitle" style="color:#ef4444;">Token tidak ditemukan atau tidak valid.</p>
            <div class="auth-footer">
              <p><a href="#/login" class="link-primary">Back to Login</a></p>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-logo">
            <img src="./images/logo.png" alt="Mining Logo">
          </div>
          <h2 class="auth-title">Reset Password</h2>
          <p class="auth-subtitle">Enter your new password below</p>
          
          <form id="resetPasswordForm" class="auth-form">
            <div class="form-group">
              <label for="password">New Password</label>
              <input 
                type="password" 
                id="password" 
                class="form-input" 
                placeholder="Enter new password" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                class="form-input" 
                placeholder="Confirm your password" 
                required 
              />
            </div>
            <button type="submit" class="btn-submit">
              <span class="btn-icon">🔒</span>
              <span class="btn-text">Reset Password</span>
            </button>
          </form>
          
          <p id="statusMessage" class="status-message"></p>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById('resetPasswordForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      this.presenter.resetPassword(password, confirmPassword);
    });
  }

  getTokenFromUrl() {
    const params = getQueryParams();
    // const token = this.token = params.get('token');

    // const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    return token;
  }

  showMessage(message, isError = false) {
    const msgEl = document.getElementById("statusMessage");
    msgEl.className = `status-message ${isError ? 'error' : 'success'}`;
    msgEl.textContent = message;
    console.log(message);
  }
}
