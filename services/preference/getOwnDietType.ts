import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";
import { UserDietTypeData } from "./createUserDietType";

export type OwnDietTypeResponse = {
  status: number;
  data: UserDietTypeData[];
};

const getOwnDietType = async (
  user_id: number
): Promise<OwnDietTypeResponse | null | undefined> => {
  try {
    const result = await makeProtectedRequest(
      `/preference/user-diet/${user_id}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getOwnDietType;
