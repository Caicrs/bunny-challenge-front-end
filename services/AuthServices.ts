import { Api } from "helpers/endpoint/Api";
import { endpoint } from "helpers/endpoint";
import { ErrorResponse } from "types/api-types/error";
import { Login, LoginResponse } from "types/api-types/login";
import { User } from "types/api-types/user";
import api from "api/bunnyApi";

export const AuthService = {
  login: (loginData: Login): Promise<LoginResponse & ErrorResponse> =>
    Api(endpoint.auth(), {
      method: "POST",
      body: JSON.stringify(loginData),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error)),

     
};
