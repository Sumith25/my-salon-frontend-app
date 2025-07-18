import { useAuth } from "react-oidc-context";

const API_BASE = "https://thz2w1o426.execute-api.ap-south-1.amazonaws.com/dev/customers";

export const useCustomerApi = () => {
  const auth = useAuth();
  const accessToken = auth.user?.access_token;

  const fetchCustomersAPI = async () => {
    const response = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  };

  const addCustomerAPI = async (customerData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to register customer.");
    }

    return response.json();
  };

  const deleteCustomerAPI = async (id) => {
    await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const updateCustomerAPI = async (id, updatedData) => {
    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    });
  };

  return {
    fetchCustomersAPI,
    addCustomerAPI,
    deleteCustomerAPI,
    updateCustomerAPI,
  };
};
