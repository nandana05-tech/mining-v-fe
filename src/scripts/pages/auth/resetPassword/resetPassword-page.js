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
    const token = this.getTokenFromUrl();

    if (!token) {
      return `
        <div class="container">
          <h2>Reset Password</h2>
          <p style="color:red;">Token tidak ditemukan atau tidak valid.</p>
        </div>
      `;
    }

    return `
      <div class="container">
        <h2>Reset Password</h2>
        <form id="resetPasswordForm">
          <input type="password" id="password" placeholder="Password Baru" required />
          <input type="password" id="confirmPassword" placeholder="Konfirmasi Password" required />
          <button type="submit">Reset Password</button>
        </form>
        <p id="statusMessage"></p>
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
    msgEl.style.color = isError ? "red" : "green";
    msgEl.textContent = message;
    console.log(message);
  }
}
