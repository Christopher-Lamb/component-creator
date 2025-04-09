import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Type for API response structure.
 */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

/**
 * Custom error type for API errors.
 */
interface ApiError {
  message: string;
  status: number;
  details?: any;
}

const backendURL = "http://localhost:3003/api";

/**
 * Sends a POST request to the backend API.
 * @param url - The endpoint URL.
 * @param data - The request payload.
 * @param config - Optional axios config (headers, etc.).
 * @returns The API response data or throws an error.
 */
const apiPost = async <T>(url: string, data: Record<string, any>, config: AxiosRequestConfig = {}): Promise<T> => {
  try {
    const newUrl = `${backendURL}/${url}`;
    const response: AxiosResponse<T> = await axios.post(newUrl, data, config);

    console.log(response);

    // Check if status is in the 2xx range (successful)
    if (response.status >= 200 && response.status < 300) {
      return response.data as T;
    }

    throw new Error("Unexpected API response");
  } catch (error: any) {
    console.error(`API POST Error [${url}]:`, error.response?.data || error.message);

    throw {
      message: error.response?.data?.error || "Request failed",
      status: error.response?.status || 500,
      details: error.response?.data || null,
    } as ApiError;
  }
};

/**
 * Sends a GET request to the backend API.
 * @param url - The endpoint URL.
 * @param config - Optional axios config (headers, params, etc.).
 * @returns The API response data or throws an error.
 */
const apiGet = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
  try {
    const newUrl = `${backendURL}/${url}`;
    const response: AxiosResponse<T> = await axios.get(newUrl, config);

    console.log(response);

    if (response.status >= 200 && response.status < 300) {
      return response.data as T;
    }

    throw new Error("Unexpected API response");
  } catch (error: any) {
    console.error(`API GET Error [${url}]:`, error.response?.data || error.message);

    throw {
      message: error.response?.data?.error || "Request failed",
      status: error.response?.status || 500,
      details: error.response?.data || null,
    } as ApiError;
  }
};

export { apiPost, apiGet };
