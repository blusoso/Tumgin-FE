import axios from "axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

const login = async (
  request: LoginRequest
): Promise<LoginResponse | undefined> => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
      request
    );

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export default login;
