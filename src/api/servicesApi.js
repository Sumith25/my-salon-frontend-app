import { useAuth } from "react-oidc-context";

const API_BASE = "https://v8lap9y1uh.execute-api.ap-south-1.amazonaws.com/dev/services";

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

export const useServicesApi = () => {
  const auth = useAuth();
  const accessToken = auth.user?.access_token;

  const fetchServicesAPI = async () => {
    const response = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  };

  const addServiceAPI = async (serviceData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(serviceData),
    });
    return handleResponse(response);
  };

  const updateServiceAPI = async (id, updatedData) => {
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

  const deleteServiceAPI = async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  };

  return {
    fetchServicesAPI,
    addServiceAPI,
    updateServiceAPI,
    deleteServiceAPI,
  };
};
