export const API = {

  AUTH: {

    LOGIN: "/auth/login",

    SIGNUP: "/auth/signup",

    LOGOUT: "/auth/logout",

    FORGOT_PASSWORD: "/auth/forgot-password",

    RESET_PASSWORD: "/auth/reset-password",

    VERIFY_OTP: "/auth/verify-otp",

    RESEND_OTP: "/auth/resend-otp",

    COMPLETE_PROFILE: "/auth/profile",

    ADMIN_LOGIN: "/auth/admin/login",

  },

  STUDENT: {

    PROFILE: "/student/profile",

    TASKS: "/student/tasks",

    ATTENDANCE: "/student/attendance",

  },

  ADMIN: {

    USERS: "/admin/users",

    INTERNSHIPS: "/admin/internships",

  },

  PROFILE: {
    GET: "/profile",
    UPDATE: "/profile",
    IMAGE: "/profile/profile-image"
  },
  DASHBOARD: {
    STUDENT: "/dashboard/student",
    ADMIN: "/dashboard/admin"
  },

  SERVER: {

    STATUS: "/server/status"

  },

  INTERNSHIPS: {
    BASE: "/internships",
    BY_ID: (id) => `/internships/${id}`,
    JOIN: (id) => `/internships/${id}/join`,
    PROGRESS: (id) => `/internships/${id}/progress`,
    COMPLETE: (id) => `/internships/${id}/complete`,
  },
};