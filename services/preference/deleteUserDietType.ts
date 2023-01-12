import { ErrorResponse } from "@/services/type/globalServiceType";
import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type UserDietTypeDeleteResponse = {
  status: number;
  data: string;
};

export type UserDietTypeDeleteRequest = {
  id: number;
};

const deleteUserDietType = async (
  request: UserDietTypeDeleteRequest
): Promise<UserDietTypeDeleteResponse | ErrorResponse | null> => {
  try {
    const result = await makeProtectedRequest(
      `/preference/user-diet/delete/${request.id}`,
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

export default deleteUserDietType;
