import axios from "axios";
import { getTokenService } from "../utils/localStorage";

class Http {
  constructor() {
    const baseURL = "http://localhost:5000/api";
    if (!baseURL) {
      throw new Error("VITE_SERVER is not defined");
    }
    this.uniqueInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    this.uniqueInstance.interceptors.request.use(
      this.onRequest,
      this.onRequestError
    );
    this.uniqueInstance.interceptors.response.use(
      this.onResponse,
      this.onResponseError
    );
  }
  onRequest = (config) => {
    const filterRouteExceptToken = [
      "/auth/login",
      "/auth/register",
      "/auth/logout",
    ];
    if (filterRouteExceptToken.includes(config.url)) {
      return config;
    }

    const token = getTokenService();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  };

  onRequestError = (error) => {
    return Promise.reject(error);
  };

  onResponse = (response) => {
    return response;
  };

  onResponseError = (error) => {
    return error?.response;
  };
}
const http = new Http().uniqueInstance;

export default http;
