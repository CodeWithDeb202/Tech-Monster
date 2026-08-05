import api from "./axios";
import { API } from "./endpoints";

export const getApprovedTasks = async () => {

    const res = await api.get(
        API.ADMIN.TASKS.APPROVED
    );

    return res.data;

};

export const getPendingTasks = async () => {

    const { data } = await api.get(API.ADMIN.TASKS.PENDING);

    return data;

};

export const getTaskDetails = async (id) => {

    const { data } = await api.get(API.ADMIN.TASKS.DETAILS(id));

    return data;

};

export const approveTask = async (id, comment) => {

    const { data } = await api.patch(

        API.ADMIN.TASKS.APPROVE(id),

        {

            comment

        }

    );

    return data;

};

export const rejectTask = async (id, comment) => {

    const { data } = await api.patch(

        API.ADMIN.TASKS.REJECT(id),

        {

            comment

        }

    );

    return data;

};

// ===============================
// Student Submit Task
// ===============================

export const submitTask = async (id, payload) => {

    const { data } = await api.patch(

        `/tasks/${id}/status`,

        payload

    );

    return data;

};

export const getMyTasks = async () => {

    const { data } = await api.get(

        "/tasks/my-tasks"

    );

    return data;

};


export const getSingleTask = async (id) => {

    const { data } = await api.get(

        `/tasks/my-tasks/${id}`

    );

    return data;

};