//import login presenter
import loginPresenter from '../login/login-presenter.js';
import * as api from '../../../data/api.js';
import * as authModel from '../../../utils/auth.js';
import Swal from 'sweetalert2';

export default class LoginPage {
    #presenter = null;
    

    async render() {
        return `
            <div class="login-page">
                <h2>Login Pengguna</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" required>
                    </div>
                    <button type="submit" id="submitButton" class="btn btn-primary">Login</button>
                </form>

                <p class="forgot-password-text">
                    Lupa password? 
                    <a href="#" id="forgotPasswordLink">Klik di sini</a>
                </p>
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