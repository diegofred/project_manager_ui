import axios from "axios";
import { securedAxiosInstance } from "./Api";
const API_URL = "comments";

export function getComments() {
  return securedAxiosInstance({
    method: "get",
    url: `/${API_URL}`
  });
}

export function createComment(formData) {
  return securedAxiosInstance({
    method: "post",
    url: `/${API_URL}`,
    data: formData
  });
}

export function updateComment(formData, commentId) {
  return axios({
    method: "put",
    url: `/${API_URL}/${commentId}`,
    data: formData
  });
}

export function destroyComment(commentId) {
  return axios({
    method: "delete",
    url: `/${API_URL}/${commentId}`
  });
}

export function getCommentsInTask(taskId) {
  return securedAxiosInstance({
    method: "get",
    url: `${API_URL}/in_task/${taskId}`
  });
}
