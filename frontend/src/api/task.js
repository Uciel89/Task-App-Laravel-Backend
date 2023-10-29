import axios from "./axios";
import Cookies from "js-cookie";

// Peticiones mediante la librerías axios hacia el backend
export const getTasksRequest = () => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return  axios.get("/api/tasks", config);
}
export const getTaskRequest = (id) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`/api/tasks/${id}`, config);
} ;
export const createTaskRequest = (task) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("/api/tasks", task, config);
};
export const deleteTaskRequest = (id) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`/api/tasks/${id}`, config);
};
export const updateTaskRequest = (id, task) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.put(`/api/tasks/${id}`, task, config);
};
