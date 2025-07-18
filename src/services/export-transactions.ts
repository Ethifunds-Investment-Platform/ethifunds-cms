import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
  url: string;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.get(`${data.url}`);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
}

export default async function exportTransactions(
  data: Parameters,
): Promise<Response> {
  if (variables.NODE_ENV === "development") return development();

  return production(data);
}
