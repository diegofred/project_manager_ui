import axios from "axios";

const BASE_URL = "http://192.168.0.98:3000";
const API_URL = "/api/v1";
//const API_URL = "https://warm-dusk-82583.herokuapp.com/api/v1";
const securedAxiosInstance = axios.create({
  baseURL: BASE_URL+API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const plainAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

securedAxiosInstance.interceptors.request.use(config => {
  const session = JSON.parse(sessionStorage.getItem("user"));

  config.headers = {
    ...config.headers,
    "access-token": session["access-token"],
    client: session["client"],
    uid: session.uid
  };
  return config;
});





// securedAxiosInstance.interceptors.response.use(null, error => {

//   if (
//     error.response &&
//     error.response.config &&
//     error.response.status === 401
//   ) {
//     // If 401 by expired access cookie, we do a refresh request
//     return plainAxiosInstance
//       .post("/refresh", {}, { headers: { "X-CSRF-TOKEN": localStorage.csrf } })
//       .then(response => {
//         localStorage.csrf = response.data.csrf;
//         localStorage.signedIn = true;
//         // After another successfull refresh - repeat original request
//         let retryConfig = error.response.config;
//         retryConfig.headers["X-CSRF-TOKEN"] = localStorage.csrf;
//         return plainAxiosInstance.request(retryConfig);
//       })
//       .catch(error => {
//         delete localStorage.csrf;
//         delete localStorage.signedIn;
//         // redirect to signin if refresh fails
//         location.replace("/");
//         return Promise.reject(error);
//       });
//   } else {
//     return Promise.reject(error);
//   }
// });

export { securedAxiosInstance, plainAxiosInstance };
