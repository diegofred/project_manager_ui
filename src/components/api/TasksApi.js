import axios from "axios";
import { securedAxiosInstance } from "./Api";
const API_URL = "tasks";

export function getTasks() {
  return securedAxiosInstance({
    method: "get",
    url: `/${API_URL}`
  });
}

export function createTask(formData) {
  return securedAxiosInstance({
    method: "post",
    url: `/${API_URL}`,
    data: formData
  });
}

export function updateTask(formData, taskId) {
  return axios({
    method: "put",
    url: `/${API_URL}/${taskId}`,
    data: formData
  });
}

export function destroyTask(taskId) {
  return axios({
    method: "delete",
    url: `/${API_URL}/${taskId}`
  });
}

export function getTasksInProject(projectId) {
  return securedAxiosInstance({
    method: "get",
    url: `${API_URL}/in_project/${projectId}`
  });
}
