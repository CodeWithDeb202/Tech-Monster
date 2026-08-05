import api from "./axios";

export const checkIn = (payload) => api.post(
    "/attendance/check-in",
    payload
);


export const checkOut = (id) => api.put(
    `/attendance/check-out/${id}`
);


export const getMyAttendance = async () => {
    const { data } = await api.get(
        "/attendance/my-attendance"
    );
    return data;
};