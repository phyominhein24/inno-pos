import { keys } from "../constants/config";
import { updateError, updateNotification } from "../shares/shareSlice";
import { getData, removeData } from "./localstorage";
import * as Updates from 'expo-updates';

export const payloadHandler = (payload, value, field, fn) => {
  let updatePayload = { ...payload };
  updatePayload[field] = value;
  fn(updatePayload);
};

export const httpErrorHandler = (error) => {
  if (error.code === "ERR_NETWORK") {
    return {
      message: error.message,
      status: 0,
      notification: {
        message: "Network Error!",
        variant: "error",
      },
    };
  }

  const { status, data } = error.response;

  if (status === 400 || status === 404 || status === 500 || status === 403) {
    return {
      status: status,
      message: data.message,
      notification: {
        variant: "warning",
        message: "Error Message",
      },
    };
  }

  if (status === 422) {
    return { status: status, error: data.errors };
  }

  if (status === 401) {
    removeData(keys.API_TOKEN);
    Updates.reloadAsync(); 
    return {
      status: status,
      error: data.message,
    };
  }
};

export const httpResponseHandler = (result) => {
  return {
    status: result.status,
    data: result.data.data,
    message: result.data.message,
  };
};

export const httpServiceHandler = async (dispatch, result) => {
  await dispatch(updateError(null));
  if (
    result.status === 400 ||
    result.status === 0 ||
    result.status === 500 ||
    result.status === 404 ||
    result.status === 403
  ) {
    await dispatch(updateNotification({ variant: 'error', message: result.message }));
  }

  if (result.status === 422) {
    await dispatch(updateError(result.error));
  }

  return;
};
