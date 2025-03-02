import { endpoints } from "../../constants/endpoints";
import { delRequest, featchGetRequest, getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateMan, updateNotification, updateNotification2, removeNotification2, updateInvoice } from "../../shares/shareSlice";
import { index, update } from "./invoiceSlice";
import { getData, setData } from "../../helpers/localstorage";
import { keys } from "../../constants/config";
import { baseURL } from "../../constants/endpoints";

export const invoiceService = {
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.invoice, payload);
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
        const response = await getRequest(endpoints.invoice, params);
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
        const response = await putRequest(`${endpoints.invoice}/${id}`, payload);
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
        const response = await getRequest(`${endpoints.invoice}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
        }
        
        return response;
    },
    destory: async (dispatch, id) => {
        const response = await delRequest(`${endpoints.invoice}/${id}`);
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
        const response = await featchGetRequest(`${baseURL}/${endpoints.invoice}/exportexcel`, params)        
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
        const response = await featchGetRequest(`${baseURL}/${endpoints.invoice}/exportexcelparams`, params)

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
        const response = await featchGetRequest(`${baseURL}/${endpoints.invoice}/exportpdf`, params, "pdf")

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
        const response = await featchGetRequest(`${baseURL}/${endpoints.invoice}/exportpdfparams`, params, "pdf")

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
        const response = await postRequest(`${endpoints.invoice}/import`, payload);
        await httpServiceHandler(dispatch, response);
        dispatch(removeNotification2());
        return response
    },
};
