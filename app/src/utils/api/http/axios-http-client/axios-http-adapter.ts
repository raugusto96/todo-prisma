import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/utils/api/protocols/http";
import axios from "axios";

export class AxiosHttpAdapter implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
