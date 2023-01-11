import { ErrorResponse } from "@/services/type/globalServiceType";
import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type UserAllergyDeleteResponse = {
  status: number;
  data: string;
};

export type UserAllergyDeleteRequest = {
  id: number;
};

const deleteUserAllergy = async (
  request: UserAllergyDeleteRequest
): Promise<UserAllergyDeleteResponse | ErrorResponse | null> => {
  try {
    const result = await makeProtectedRequest(
      `/preference/user-allergy/delete/${request.id}`,
      METHOD.DELETE
    );

    return result;
  } catch (error: any) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      detail: error.response.data.detail,
    };
  }
};

export default deleteUserAllergy;
