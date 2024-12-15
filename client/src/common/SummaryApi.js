export const baseURL = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "PUT",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "PUT",
  },
  resetPassword: {
    url: "/api/user/reset-password",
    method: "PUT",
  },
  refreshToken: {
    url: "/api/user/refresh-token",
    method: "POST",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "GET",
  },
  UserLogout: {
    url: "/api/user/logout",
    method: "GET",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "PUT",
  },
  updateUser: {
    url: "/api/user/update-user",
    method: "PUT",
  }
};

export default SummaryApi;