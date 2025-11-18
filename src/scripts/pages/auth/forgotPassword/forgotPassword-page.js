import ForgotPasswordPresenter from "./forgotPassword-presenter";
import * as api from "../../../data/api";
import Swal from "sweetalert2";

export default class ForgotPasswordPage {
  #presenter = null;

  async render() {
    return `
        <div class="forgot-password-page">
            <h2>Forgot Password</h2>
            <p>Masukkan email Anda. Kami akan mengirimkan link untuk reset password.</p>
            <form id="forgotPasswordForm">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" required>
                </div>
                    
                <button type="submit" id="submitButton" class="btn btn-primary">
                    <span class="button-text">Submit</span>
                    <span class="loading-spinner" style="display: none;">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </span>
                </button>
            </form>
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
