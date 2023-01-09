import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { UserAllergyData } from "./createUserAllergy";

export type OwnAllergyResponse = {
  status: number;
  data: UserAllergyData[];
};

const getOwnAllergy = async (
  user_id: number
): Promise<OwnAllergyResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/preference/user-allergy/${user_id}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getOwnAllergy;
