import axios from "axios";
import { securedAxiosInstance } from "./Api";
const API_URL = "projects";

export function getProjects() {
  return securedAxiosInstance({
    method: "get",
    url: `/${API_URL}`
  });
}

export function createProject(formData) {
  return securedAxiosInstance({
    method: "post",
    url: `/${API_URL}`,
    data: formData
  });
}

export function updateProject(formData, projectId) {
  return axios({
    method: "put",
    url: `/${API_URL}/${projectId}`,
    data: formData
  });
}

export function destroyProject(projectId) {
  return axios({
    method: "delete",
    url: `/${API_URL}/${projectId}`
  });
}
