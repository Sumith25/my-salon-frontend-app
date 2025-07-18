import { useAuth } from "react-oidc-context";

const API_BASE = "https://d5e2adri0f.execute-api.ap-south-1.amazonaws.com/dev/products";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return null;
};

export const useProductsApi = () => {
  const auth = useAuth();
  const accessToken = auth.user?.access_token;

  const fetchProductsAPI = async () => {
    const response = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  };

  const fetchProductByIdAPI = async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  };

  const addProductAPI = async (productData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  };

  const updateProductAPI = async (id, updatedData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    });
    return handleResponse(response);
  };

  const deleteProductAPI = async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  };

  return {
    fetchProductsAPI,
    fetchProductByIdAPI,
    addProductAPI,
    updateProductAPI,
    deleteProductAPI,
  };
};
