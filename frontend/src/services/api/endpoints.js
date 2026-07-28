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

};