import api from "../api/axios";
import { API } from "../api/endpoints";

export const getServerStatus = async () => {

    const { data } = await api.get(
        API.SERVER.STATUS
    );

    return data.status;

};