import instance from "../api/http";

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const CreateAccount = (data: SignUpData) => {
  return instance.post("/auth/signup", data);
};

export const Authenticate = (data: LoginData) => {
  return instance.post("auth/login", data);
};
