import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { UserResponse } from "../auth/createUser";
import { DietTypeData } from "./getDietType";

export type UserDietTypeData = {
  id: number;
  user: UserResponse;
  diet_type: DietTypeData;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type UserDietTypeResponse = {
  status: number;
  data: UserDietTypeData;
};

export type UserDietTypeRequest = {
  user_id: number;
  diet_type_id?: number;
};

const createUserDietType = async (
  request: UserDietTypeRequest
): Promise<UserDietTypeResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/preference/user-diet`,
      METHOD.POST,
      request
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default createUserDietType;
