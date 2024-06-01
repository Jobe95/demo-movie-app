import { baseUrl } from "../utils/constants";
import axios from "axios";

export const client = axios.create({
  baseURL: baseUrl,
});
