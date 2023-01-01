import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { useResponse } from "./createUser";

const getCurrentUser = async (): Promise<useResponse | undefined> => {
  try {
    const result = await makeProtectedRequest(`/auth/users/me`, METHOD.GET);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getCurrentUser;
