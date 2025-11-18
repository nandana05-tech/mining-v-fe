export default class RegisterPresenter {
    #view;
    #model;

    constructor({ view, model }) {
        this.#view = view;
        this.#model = model;
    }

    async getRegister({ nama, email, password, role }) {
        this.#view.showSubmitLoadingButton();

        try {
            const response = await this.#model.registerUser({ nama, email, password, role });

            // backend menggunakan: error: true/false
            if (response.error === true) {
                this.#view.registeredFailed(response.message);
                return;
            }

            this.#view.registeredSuccessfully(response.message);

        } catch (error) {
            console.error(error);
            this.#view.registeredFailed(error.message);
        } finally {
            this.#view.hideSubmitLoadingButton();
        }
    }
}
