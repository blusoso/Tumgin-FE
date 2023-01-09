import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { UserResponseWithStatus } from "./createUser";

const getCurrentUser = async (): Promise<
  UserResponseWithStatus | null | undefined
> => {
  try {
    const result = await makeProtectedRequest(`/auth/users/me`, METHOD.GET);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getCurrentUser;
