//import login presenter
import loginPresenter from '../login/login-presenter.js';
import * as api from '../../../data/api.js';
import * as authModel from '../../../utils/auth.js';
import Swal from 'sweetalert2';

export default class LoginPage {
    #presenter = null;
    

    async render() {
        document.body.classList.add('auth-page');
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-logo">
                        <img src="./images/logo.png" alt="Mining Logo">
                    </div>
                    <h2 class="auth-title">Welcome Back</h2>
                    <p class="auth-subtitle">Mining Value Chain Optimization System</p>
                    
                    <form id="loginForm" class="auth-form">
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
                                placeholder="Enter your password"
                                required
                            >
                        </div>
                        <button type="submit" id="submitButton" class="btn-submit">
                            <span class="btn-icon">➤</span>
                            <span class="btn-text">Sign In</span>
                        </button>
                    </form>

                    <div class="auth-links">
                        <a href="#" id="forgotPasswordLink" class="link-primary">Forgot your password?</a>
                    </div>
                    
                    <div class="auth-footer">
                        <p>Don't have an account? <a href="#/register" class="link-primary">Register here</a></p>
                    </div>
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.#presenter = new loginPresenter({
            view: this,
            model: api,
            authModel: authModel
        });

        this.#setupForm();
    }

    #setupForm() {
        const loginForm = document.getElementById('loginForm');
        const forgotLink = document.getElementById('forgotPasswordLink');
        
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            await this.#presenter.getLogin({email, password});
        });

        forgotLink.addEventListener('click', (event) => {
            event.preventDefault();
            this.#presenter.forgotPassword();
        });
    }

    loginSuccessfully(message) {
        console.log('Login berhasil:');

        Swal.fire({
            icon: 'success',
            title: 'Berhasil Login',
            text: message,
            confirmButtonText: 'OK'
        }).then(() => {
            location.hash = '/';
        });
    }

    loginFailed(message) {
        console.error('Login gagal:');

        Swal.fire({
            icon: 'error',
            title: 'Gagal Login',
            text: message,
            confirmButtonText: 'Coba Lagi'
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

    forgotPassword() {
        location.hash = '/forgot-password';
    }
}