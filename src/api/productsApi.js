import { useApiClient } from "./apiClient";

export const useProductsApi = () => {
  const api = useApiClient();
  const baseUrl = "https://d5e2adri0f.execute-api.ap-south-1.amazonaws.com/dev/products";

  return {
    getProducts: () => api.get(baseUrl),
    createProduct: (data) => api.post(baseUrl, data),
    updateProduct: (id, data) => api.put(`${baseUrl}/${id}`, data),
    deleteProduct: (id) => api.del(`${baseUrl}/${id}`),
  };
};
