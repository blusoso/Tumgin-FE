import { atom } from "recoil";
import { KEYS } from "../keys";
import { UserResponse } from "services/auth/createUser";

type AuthState = {
  user: UserResponse | undefined;
};

const authState = atom<AuthState>({
  key: KEYS.AUTH,
  default: {
    user: undefined,
  },
});

export default authState;
