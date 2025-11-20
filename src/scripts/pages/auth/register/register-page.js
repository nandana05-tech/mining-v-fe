import RegisterPresenter from "./register-presenter.js"; // <-- PENTING: import presenter
import * as api from "../../../data/api";
import Swal from "sweetalert2";

export default class RegisterPage {
    #presenter = null;

    async render() {
        document.body.classList.add('auth-page');
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-logo">
                        <img src="./images/logo.png" alt="Mining Logo">
                    </div>
                    <h2 class="auth-title">Create Account</h2>
                    <p class="auth-subtitle">Join Mining Value Chain Optimization System</p>
                    
                    <form id="registerForm" class="auth-form">
                        <div class="form-group">
                            <label for="nama">Full Name</label>
                            <input 
                                type="text" 
                                id="nama" 
                                class="form-input" 
                                placeholder="Enter your full name"
                                required
                            >
                        </div>
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
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                class="form-input" 
                                placeholder="Create a strong password"
                                required
                            >
                        </div>
                        <div class="form-group">
                            <label for="role">Role</label>
                            <select id="role" class="form-input" required>
                                <option value="">Select your role...</option>
                                <option value="admin">Admin</option>
                                <option value="mine_planner">Mine Planner</option>
                                <option value="shipping_planner">Shipping Planner</option>
                            </select>
                        </div>
                        <button type="submit" id="submitButton" class="btn-submit btn-submit-success">
                            <span class="btn-icon">✓</span>
                            <span class="btn-text">Create Account</span>
                        </button>
                    </form>
                    
                    <div class="auth-footer">
                        <p>Already have an account? <a href="#/login" class="link-primary">Login here</a></p>
                    </div>
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.#presenter = new RegisterPresenter({
            view: this,
            model: api
        });
        this.#setupForm();
    }

    #setupForm() {
        const registerForm = document.getElementById("registerForm");

        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nama = document.getElementById("nama").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;

            await this.#presenter.getRegister({ nama, email, password, role });
        });
    }

    registeredSuccessfully(message) {
        Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil',
            text: message || 'Silahkan login untuk melanjutkan',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            location.hash = '/login';
        });
    }

    registeredFailed(message) {
        Swal.fire({
            icon: 'error',
            title: 'Registrasi Gagal',
            text: message,
            showConfirmButton: false,
            timer: 1500
        });
    }

    showSubmitLoadingButton() {
        Swal.fire({
            title: 'Mohon tunggu...',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
        });
    }

    hideSubmitLoadingButton() {
        Swal.close();
    }
}
