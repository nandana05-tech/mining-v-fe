import ForgotPasswordPresenter from "./forgotPassword-presenter";
import * as api from "../../../data/api";
import Swal from "sweetalert2";

export default class ForgotPasswordPage {
    #presenter = null;

    async render() {
        document.body.classList.add('auth-page');
    return `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-logo">
                    <img src="./images/logo.png" alt="Mining Logo">
                </div>
                <h2 class="auth-title">Forgot Password</h2>
                <p class="auth-subtitle">Enter your email address and we'll send you a link to reset your password</p>
                
                <form id="forgotPasswordForm" class="auth-form">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            class="form-input" 
                            placeholder="Enter your email"
                            required
                        >
                    </div>
                        
                    <button type="submit" id="submitButton" class="btn-submit">
                        <span class="btn-icon">✉</span>
                        <span class="btn-text">Send Reset Link</span>
                    </button>
                </form>
                
                <div class="auth-footer">
                    <p>Remember your password? <a href="#/login" class="link-primary">Back to Login</a></p>
                </div>
            </div>
        </div>
    `;
  }

  async afterRender() {
    this.#presenter = new ForgotPasswordPresenter({
      view: this,
      model: api,
    });

    this.#setupForm();
  }

  #setupForm() {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");

    forgotPasswordForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;

      await this.#presenter.getForgotPassword({ email });
    });
  }


  forgotPasswordSuccessfully(message) {
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: message || "Link reset password telah dikirim ke email Anda.",
    });
    document.getElementById("email").value = "";
  }

  forgotPasswordFailed(message) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: message || "Terjadi kesalahan. Silakan coba lagi.",
    });
  }

  showSubmitLoadingButton() {
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.querySelector(".button-text").style.display = "none";
      submitButton.querySelector(".loading-spinner").style.display = "block";
    }
  }

  hideSubmitLoadingButton() {
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.querySelector(".button-text").style.display = "block";
      submitButton.querySelector(".loading-spinner").style.display = "none";
    }
  }
}
