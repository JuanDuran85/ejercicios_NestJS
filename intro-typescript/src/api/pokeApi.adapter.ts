import axios from "axios";

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {
  public async get<T>(url: string): Promise<T> {
    const resp = await fetch(url);
    const data: T = await resp.json();
    return data;
  }
}

export class PokeApiAxiosAdapter implements HttpAdapter {
  private readonly axios = axios;

  public async get<T>(url: string): Promise<T> {
    return await this.axios.get(url);
  }
}
