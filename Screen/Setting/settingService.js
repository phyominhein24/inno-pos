import { endpoints } from "../../constants/endpoints";
import { delRequest, featchGetRequest, getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification, updateNotification2, removeNotification2 } from "../../shares/shareSlice";
import { index, update } from "./settingSlice";
import { baseURL } from "../../constants/endpoints";

export const settingService = {
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.setting, payload);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(updateNotification({
                variant: 'success',
                message: response.message
            }));
        }
        return response;
    },
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.setting, params);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(index(response.data.data ? response.data.data : response.data));
            dispatch(updateNotification({
                variant: "success",
                message: response.message,
            }));
        }
        return response;
    },
    update: async (dispatch,  payload) => {
        console.log("payload", payload);
        
        const response = await postRequest(`${endpoints.setting}`, payload);
        await httpServiceHandler(dispatch, response);
        console.log("response service", response);
        
        if (response.status === 200) {
            dispatch(update(response.data));
            dispatch(updateNotification({
                variant: 'success',
                message: response.message
            }));
        }
        return response;
    },
    show: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.setting}/${id}`);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(update(response.data));
        }
        return response;
    },
    destroy: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.setting}/${id}`);
        await httpServiceHandler(dispatch, response);
        return response;
    },
    exportexcel: async (dispatch, params) => {
        dispatch(updateNotification2({ variant: "success" }));
        const response = await featchGetRequest(`${baseURL}/${endpoints.setting}/exportexcel`, params);
        
        if (response.status === 200) {
            dispatch(updateNotification({
                variant: 'success',
                message: "Data Export Success"
            }));
        }
        dispatch(removeNotification2());
        return response;
    },
    import: async (payload, dispatch) => {
        dispatch(updateNotification2({ variant: "success" }));
        const response = await postRequest(`${endpoints.setting}/import`, payload);
        await httpServiceHandler(dispatch, response);
        dispatch(removeNotification2());
        return response;
    },
};
