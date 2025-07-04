import { variables } from "@/constants";
import axios from "@/lib/axios";

type Response = void;

export async function production(): Promise<Response> {
  const response = await axios.post(`/2fa/disable`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function disable2fa(): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production();
}
