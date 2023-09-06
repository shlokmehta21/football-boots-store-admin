import axios from "axios";

const BASE_URL = "https://football-boots-store-jovt0p32r-greenberg-hammeed.vercel.app/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    const TOKEN = sessionStorage.getItem("TOKEN");

    if (TOKEN) {
      config.headers.token = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    // console.log("request error", error);
    return Promise.reject(error);
  }
);
