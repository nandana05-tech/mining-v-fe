import RegisterPresenter from "./register-presenter.js"; // <-- PENTING: import presenter
import * as api from "../../../data/api";
import Swal from "sweetalert2";

export default class RegisterPage {
    #presenter = null;

    async render() {
        return `
            <div class="register-page">
                <h2>Registrasi Akun Baru</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="nama">Nama Lengkap</label>
                        <input type="text" id="nama" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="role">Role</label>
                        <select id="role" class="form-control" required>
                            <option value="">Pilih Role...</option>
                            <option value="admin">Admin</option>
                            <option value="mine_planner">Mine Planner</option>
                            <option value="shipping_planner">Shipping Planner</option>
                        </select>
                    </div>
                    <button type="submit" id="submitButton" class="btn btn-primary">
                        <span class="button-text">Daftar</span>
                    </button>
                </form>
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
