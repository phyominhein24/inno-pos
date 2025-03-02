import { endpoints } from "../../constants/endpoints";
import { delRequest, featchGetRequest, getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateMan, updateNotification, updateNotification2, removeNotification2, updateCategory } from "../../shares/shareSlice";
import { index, update } from "./homeSlice";
import { getData, setData } from "../../helpers/localstorage";
import { keys } from "../../constants/config";
import { baseURL } from "../../constants/endpoints";

export const homeService = {
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.home, payload);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        return response;
    },
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.home, params);
        await httpServiceHandler(dispatch, response);
        if (response.status === 200) {
            dispatch(
                index(response.data.data ? response.data.data : response.data)
            );
            dispatch(
                updateNotification({
                    variant: "success",
                    message: response.message,
                })
            );
        }
        return response;
    },
    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.home}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        return response;
    },
    changepassword: async (dispatch, id, payload) => {
        const response = await postRequest(`${endpoints.changepassword}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        return response;
    },
    show: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.home}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
        }
        
        return response;
    },
    destory: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.home}/${id}`);
        await httpServiceHandler(dispatch, response);

        // if (response.status === 200) {
        //     dispatch(updateNotification({
        //         variant : 'success',
        //           message : response.message
        //     }))
        // }
        return response;
    },
    exportexcel: async (dispatch, params) => {
        dispatch(updateNotification2({variant: "success"}))
        const response = await featchGetRequest(`${baseURL}/${endpoints.home}/exportexcel`, params)        
        if (response.status === 200) {            
            dispatch(updateNotification({
                variant : 'success',
                message : "Datas Export Success"
            }))
        }
        dispatch(removeNotification2());
        return response;
    },
    exportexcelparams: async (dispatch, params) => {
        dispatch(updateNotification2({variant: "success"}))
        const response = await featchGetRequest(`${baseURL}/${endpoints.home}/exportexcelparams`, params)

        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                message : "Datas Export Success"
            }))
        }
        dispatch(removeNotification2());
        return response
    },
    exportpdf: async (dispatch, params) => {
        dispatch(updateNotification2({variant: "success"}))
        const response = await featchGetRequest(`${baseURL}/${endpoints.home}/exportpdf`, params, "pdf")

        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                message : "Datas Export Success"
            }))
        }
        dispatch(removeNotification2());
        return response
    },
    exportpdfparams: async (dispatch, params) => {
        dispatch(updateNotification2({variant: "success"}))
        const response = await featchGetRequest(`${baseURL}/${endpoints.home}/exportpdfparams`, params, "pdf")

        if (response.status === 200) {
            dispatch(updateNotification({
                variant : 'success',
                message : "Datas Export Success"
            }))
        }
        dispatch(removeNotification2());
        return response
    },
    import: async (payload, dispatch) => {
        dispatch(updateNotification2({variant: "success"}))
        const response = await postRequest(`${endpoints.home}/import`, payload);
        await httpServiceHandler(dispatch, response);
        dispatch(removeNotification2());
        return response
    },
};
