import api from "./axios";

/**
 * Search published internships/courses by title/category keyword.
 */
export const searchInternships = async (keyword = "") => {
    const { data } = await api.get("/search/internships", {
        params: { keyword, limit: 8 },
    });
    return data;
};

/**
 * Search users by username / first name / last name.
 */
export const searchUsers = async (keyword = "") => {
    const { data } = await api.get("/search/users", {
        params: { keyword, limit: 8 },
    });
    return data;
};
