import { APIRequestContext, request } from "@playwright/test";

interface BaseData {
  [key: string]: any;
}

class CRUDService {
  protected static context: APIRequestContext;
  protected static baseURL: string;
  static path: string;
  static property: string;

  static async init(baseURL: string) {
    this.baseURL = baseURL;
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  static async create<T extends BaseData>(data: T, path: string = this.path) {
    const response = await this.context.post(`/api/${path}`, {
      data: { [this.property]: data },
    });
    return await this.handleResponse(response);
  }

  static async update<T extends BaseData>(id: string | number, data: T, path: string = this.path) {
    const response = await this.context.put(`${path}/${id}`, {
      data: { [this.property]: data },
    });
    return await this.handleResponse(response);
  }

  static async delete(id: string | number, path: string = this.path) {
    const response = await this.context.delete(`${path}/${id}`);
    return await this.handleResponse(response);
  }

  static async fetch<T extends BaseData>(
    params: Record<string, any> = {},
    path: string = this.path
  ): Promise<T> {
    const response = await this.context.get(`/api/${path}`);
    const data = await this.handleResponse(response);
    
    try {
      if (!data) {
        throw new Error("No data received");
      }
      return data as T;
    } catch (error: any) {
      throw new Error(`Cannot fetch data due to: ${error.message}`);
    }
  }

  static async fetchID(
    params: Record<string, any>,
    path: string = this.path
  ): Promise<string | number> {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.context.get(`${path}?${queryString}`);
    const data = await this.handleResponse(response);

    try {
      if (!data || !data[0] || !data[0].id) {
        throw new Error("This data does not existed");
      }
      return data[0].id;
    } catch (error: any) {
      throw new Error("This data does not existed");
    }
  }

  protected static async handleResponse(response: any) {
    const status = await response.status();
    
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      // Return error response in the expected format
      return {
        responseCode: status,
      };
    }
  }

  static async dispose() {
    if (this.context) {
      await this.context.dispose();
    }
  }
}

export default CRUDService;
