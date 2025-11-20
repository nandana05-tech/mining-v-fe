export default class AboutPage {
  async render() {
    document.body.classList.remove('auth-page');
    return `
      <section class="container">
        <h1>About Page</h1>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
