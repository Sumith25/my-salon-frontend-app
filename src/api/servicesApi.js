import { useApiClient } from "./apiClient";

export const useServicesApi = () => {
  const api = useApiClient();
  const baseUrl = "https://v8lap9y1uh.execute-api.ap-south-1.amazonaws.com/dev/services";

  return {
    getServices: () => api.get(baseUrl),
    createService: (data) => api.post(baseUrl, data),
    updateService: (id, data) => api.put(`${baseUrl}/${id}`, data),
    deleteService: (id) => api.del(`${baseUrl}/${id}`),
  };
};
