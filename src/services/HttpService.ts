import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import KeyCloakService from "../security/Keycloakservice";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
};

const _axios = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000,
});

const cb = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${KeyCloakService.GetAccesToken()}`;
  return config;
};

const configureAxiosKeycloak = (): void => {
  _axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (KeyCloakService.IsLoggedIn()) {
        KeyCloakService.UpdateToken(cb(config));
      }

      return config;
    }
  );
};

const getAxiosClient = (): AxiosInstance => _axios;

const HttpService = {
  HttpMethods,
  configureAxiosKeycloak,
  getAxiosClient,
};

export default HttpService;
