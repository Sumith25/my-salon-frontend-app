import { useAuth } from "react-oidc-context";

const API_BASE = "https://co9j6zqjc7.execute-api.ap-south-1.amazonaws.com/dev/appointments";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return null;
};

export const useAppointmentsApi = () => {
  const auth = useAuth();
  const accessToken = auth.user?.access_token;

  const fetchAppointmentsAPI = async () => {
    const response = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  };

  const addAppointmentAPI = async (appointmentData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(appointmentData),
    });
    return handleResponse(response);
  };

  const deleteAppointmentAPI = async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  };

  const updateAppointmentAPI = async (id, updatedData) => {
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

  return {
    fetchAppointmentsAPI,
    addAppointmentAPI,
    deleteAppointmentAPI,
    updateAppointmentAPI,
  };
};
