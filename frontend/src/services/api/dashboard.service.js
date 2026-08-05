import api from "./axios";
import { API } from "./endpoints";

export const getAdminDashboard = async () => {

    const { data } = await api.get(

        API.DASHBOARD.ADMIN

    );

    return data;

};