import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { userResponse } from "./createUser";

const getCurrentUser = async (): Promise<userResponse | undefined> => {
  try {
    const result = await makeProtectedRequest(`/auth/users/me`, METHOD.GET);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getCurrentUser;
