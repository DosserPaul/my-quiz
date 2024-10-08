import axios from "axios";

const createAxiosInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
