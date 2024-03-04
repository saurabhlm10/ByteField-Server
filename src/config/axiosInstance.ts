import axios from "axios";
import { ENV } from "../constants/ENV";

const axiosInstance = axios.create({
  baseURL: ENV.lambdaUrl,
});
export default axiosInstance;
