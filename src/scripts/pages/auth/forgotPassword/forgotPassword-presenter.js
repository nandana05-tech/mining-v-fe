export default class ForgotPasswordPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getForgotPassword({ email }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.forgotPassword({ email });

      this.#view.forgotPasswordSuccessfully(response.message);
    } catch (error) {
      this.#view.forgotPasswordFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
