import axios from "axios";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

    withCredentials: true,

    timeout: 30000,

    headers: {

        "Content-Type": "application/json"

    }

});

// ==============================================
// Request Interceptor
// ==============================================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("accessToken");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

// ==============================================
// Response Interceptor
// ==============================================

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const status = error.response?.status;

        switch (status) {

            case 401:

                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");

                window.location.href = "/session-expired";

                break;

            case 403:

                if (
                    error.response?.data?.message ===
                    "Your account has been blocked."
                ) {

                    window.location.href = "/account-blocked";

                } else {

                    window.location.href = "/unauthorized";

                }

                break;

            case 404:

                window.location.href = "/404";

                break;

            case 429:

                window.location.href = "/429";

                break;

            case 500:

                window.location.href = "/500";

                break;

            case 503:

                window.location.href = "/503";

                break;

            default:

                break;

        }

        return Promise.reject(error);

    }

);

export default api;