export default class LoginPresenter {
    #view;
    #model;
    #authModel;

    constructor({ view, model, authModel }) {
        this.#view = view;
        this.#model = model;
        this.#authModel = authModel;
    }

    async getLogin({ email, password }) {
        this.#view.showSubmitLoadingButton();

        try {
            const response = await this.#model.loginUser({ email, password });
            console.log('Response dari server:', response);

            // ✅ Jika server mengembalikan status code manual, bisa tambahkan di model,
            // tapi di sini kita cek dari struktur data yang kamu kirimkan.
            if (response.error) {
                console.error('Login gagal:', response.message);
                this.#view.loginFailed(response.message || 'Login gagal.');
                return;
            }

            // ✅ Jika token ada, berarti login sukses
            this.#authModel.putAccessToken(response.token);

            this.#view.loginSuccessfully(response.message || 'Berhasil login', response);
        } catch (error) {
            console.error('Terjadi kesalahan saat login:', error);
            this.#view.loginFailed(error.message || 'Terjadi kesalahan server.');
        } finally {
            this.#view.hideSubmitLoadingButton();
        }
    }

    forgotPassword() {
        location.hash = '/forgot-password';
    }
}
