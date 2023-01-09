import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { UserResponse } from "../auth/createUser";
import { DietTypeData } from "./getDietType";

export type UserAllergyData = {
  id: number;
  user: UserResponse;
  ingredient: DietTypeData;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type UserAllergyResponse = {
  status: number;
  data: UserAllergyData;
};

export type UserAllergyRequest = {
  user_id: number;
  ingredient_id?: number;
};

const createUserAllergy = async (
  request: UserAllergyRequest
): Promise<UserAllergyResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/preference/user-allergy`,
      METHOD.POST,
      request
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default createUserAllergy;
