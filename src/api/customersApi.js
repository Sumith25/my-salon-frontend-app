import { useApiClient } from "./apiClient";

export const useCustomersApi = () => {
  const api = useApiClient();
  const baseUrl = "https://thz2w1o426.execute-api.ap-south-1.amazonaws.com/dev/customers";

  return {
    getCustomers: () => api.get(baseUrl),
    createCustomer: (data) => api.post(baseUrl, data),
    updateCustomer: (id, data) => api.put(`${baseUrl}/${id}`, data),
    deleteCustomer: (id) => api.del(`${baseUrl}/${id}`),
  };
};
