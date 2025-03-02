import axios from "axios";
import { getData } from "../helpers/localstorage";
import { keys } from "./config";
import { baseURL } from "./endpoints";

const http = axios.create({
  baseURL: baseURL
});

http.interceptors.request.use(
  async (config) => {
    // Await getData to get the token properly
    const token = await getData(keys.API_TOKEN); // This will give you the token after the promise resolves
    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
