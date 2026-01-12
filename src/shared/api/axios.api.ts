import { getSession } from "@/app/(context)/(auth)/lib/session";
import axios from "axios";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true, // cookies HTTP-only
});

Api.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default Api;
