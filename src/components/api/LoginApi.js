import { plainAxiosInstance } from "./Api";

export function loginUser(formData) {
    return plainAxiosInstance({
      method: "post",
      url: `/auth/sign_in`,
      data: formData
    });
}

export function createUser(formData) {
    return plainAxiosInstance({
      method: "post",
      url: `/auth/`,
      data: formData
    });
}