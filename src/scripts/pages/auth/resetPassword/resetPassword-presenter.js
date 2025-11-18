export default class ResetPasswordPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async resetPassword(password, confirmPassword) {
    const token = this.view.getTokenFromUrl();

    // console.log(token, password, confirmPassword);

    if (password !== confirmPassword) {
      this.view.showMessage("Password dan konfirmasi tidak sama!", true);
      return;
    }

    try {
      const response = await this.model.resetPassword(token, password);

      if (response.error) {
        this.view.showMessage(response.error, true);
      } else {
        this.view.showMessage("Password berhasil direset! Silakan login.");
      }
    } catch (err) {
      this.view.showMessage("Terjadi kesalahan server", true);
    }
  }
}
