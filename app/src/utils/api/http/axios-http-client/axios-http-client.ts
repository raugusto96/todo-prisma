import { HttpPostParams } from "../../protocols/http";
import axios from "axios";

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url);
  }
}
