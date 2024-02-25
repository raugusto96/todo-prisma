import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@/utils/api/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpAdapter implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error) {
      axiosResponse = error.response;
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
