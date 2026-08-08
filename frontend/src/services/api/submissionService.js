import api from "./axios";
import { API } from "./endpoints";

// ============================
// STUDENT SUBMISSIONS
// ============================

export const submitCode = async (payload) => {
    const { data } = await api.post(API.SUBMISSIONS.BASE, payload);
    return data;
};

export const getMySubmissions = async () => {
    const { data } = await api.get(API.SUBMISSIONS.MY);
    return data;
};

export const getMyCourseSubmissions = async (courseSlug) => {
    const { data } = await api.get(API.SUBMISSIONS.COURSE(courseSlug));
    return data;
};

// ============================
// ADMIN SUBMISSIONS
// ============================

export const getAllSubmissions = async (status) => {
    const { data } = await api.get(API.ADMIN.SUBMISSIONS.BASE, {
        params: status ? { status } : {}
    });
    return data;
};

export const getSubmissionDetails = async (id) => {
    const { data } = await api.get(API.ADMIN.SUBMISSIONS.DETAILS(id));
    return data;
};

export const approveSubmission = async (id, comment) => {
    const { data } = await api.put(
        API.ADMIN.SUBMISSIONS.APPROVE(id),
        { comment }
    );
    return data;
};

export const rejectSubmission = async (id, comment) => {
    const { data } = await api.put(
        API.ADMIN.SUBMISSIONS.REJECT(id),
        { comment }
    );
    return data;
};

export const extendSubmissionDeadline = async (id, hours = 48) => {
    const { data } = await api.put(
        API.ADMIN.SUBMISSIONS.EXTEND(id),
        { hours }
    );
    return data;
};
