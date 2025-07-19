import { useAuthContext } from "../context/AuthContext";

export const useApiClient = () => {
  const { accessToken } = useAuthContext();

  const request = async (endpoint, { method = "GET", body = null } = {}) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API ${method} ${endpoint} failed`, response.status, errorBody);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.status === 204 ? null : response.json();
  };

  return {
    get: (url) => request(url, { method: "GET" }),
    post: (url, data) => request(url, { method: "POST", body: data }),
    put: (url, data) => request(url, { method: "PUT", body: data }),
    del: (url) => request(url, { method: "DELETE" }),
  };
};
