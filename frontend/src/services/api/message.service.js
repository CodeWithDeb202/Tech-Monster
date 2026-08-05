import api from "./axios";
import { API } from "./endpoints";

// Get all chat users
export const getChatUsers = async () => {
    const { data } = await api.get(API.MESSAGE.USERS);
    return data;
};

// Get conversation
export const getMessages = async (userId) => {
    const { data } = await api.get(`${API.MESSAGE.BASE}/${userId}`);
    return data;
};

// Send message
export const sendMessage = async (payload) => {
    const { data } = await api.post(API.MESSAGE.BASE, payload);
    return data;
};

// Mark seen
export const markAsSeen = async (userId) => {
    const { data } = await api.patch(
        `${API.MESSAGE.BASE}/seen/${userId}`
    );
    return data;
};

// Upload file
export const uploadChatFile = async (formData) => {

    const { data } = await api.post(
        `${API.MESSAGE.BASE}/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return data;
};


// Delete for Me
export const deleteForMe = async (id) => {

    const { data } = await api.delete(

        `${API.MESSAGE.BASE}/me/${id}`

    );

    return data;

};

// Delete for Everyone
export const deleteForEveryone = async (id) => {

    const { data } = await api.delete(

        `${API.MESSAGE.BASE}/everyone/${id}`

    );

    return data;

};


export const searchMessages = async (

    userId,

    keyword

) => {

    const { data } = await api.get(

        `${API.MESSAGE.BASE}/search/${userId}?keyword=${keyword}`

    );

    return data;

};

export const getSharedFiles = async (userId) => {

    const { data } = await api.get(

        `${API.MESSAGE.BASE}/shared/${userId}`

    );

    return data;

};

export const getMessagesPage = async (

    userId,

    page

) => {

    const { data } = await api.get(

        `${API.MESSAGE.BASE}/page/${userId}?page=${page}`

    );

    return data;

};