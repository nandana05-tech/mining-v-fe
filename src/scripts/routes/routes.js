import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import ForgotPasswordPage from '../pages/auth/forgotPassword/forgotPassword-page';
import ResetPasswordPage from '../pages/auth/resetPassword/resetPassword-page';
import MinePlannerDashboard from '../pages/dashboard/mine-planner/mine-planner-dashboard';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/forgot-password': new ForgotPasswordPage(),
  '/reset-password': new ResetPasswordPage(),
  '/dashboard-mine': new MinePlannerDashboard(),
};

export default routes;
