import { UserResponse } from "./../auth/createUser";
import makeProtectedRequest, { METHOD } from "@/utils/api/makeProtectedRequest";

export type ReviewData = {
  id: number;
  user: UserResponse;
  recipe_id: number;
  rating?: number;
  comment: string;
  sub_comment_of?: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type ReviewListResponse = {
  status: number;
  data: ReviewData[];
};

export type ReviewListRequest = {
  recipe_id: number;
  skip?: number;
  limit?: number;
};

const getReviewList = async (
  request: ReviewListRequest
): Promise<ReviewListResponse | null | undefined> => {
  try {
    const { recipe_id, skip, limit } = request;

    const result = await makeProtectedRequest(
      `/food/review/${recipe_id}?skip=${skip}&limit=${limit}`,
      METHOD.GET
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export default getReviewList;
