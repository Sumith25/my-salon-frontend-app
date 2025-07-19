import { useApiClient } from "./apiClient";

export const useAppointmentsApi = () => {
  const api = useApiClient();
  const baseUrl = "https://your-api-id.execute-api.ap-south-1.amazonaws.com/appointments";

  return {
    getAppointments: () => api.get(baseUrl),
    createAppointment: (data) => api.post(baseUrl, data),
    updateAppointment: (id, data) => api.put(`${baseUrl}/${id}`, data),
    deleteAppointment: (id) => api.del(`${baseUrl}/${id}`),
  };
};
