import axios, { type AxiosResponse } from "axios";

export class PokeApiAdapter {
  private readonly axios = axios;
  
  public async get<T>(url: string): Promise<AxiosResponse<T>> {
    return await this.axios.get(url);
  }

  public async post(url: string, data: any) {
    console.debug({ url, data });
    throw new Error("Method not implemented.");
  }

  public async patch(url: string, data: any) {
    console.debug({ url, data });
    throw new Error("Method not implemented.");
  }

  public async delete(url: string) {
    console.debug({ url });
    throw new Error("Method not implemented.");
  }

  public async put(url: string, data: any) {
    console.debug({ url, data });
    throw new Error("Method not implemented.");
  }
}
