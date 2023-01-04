import { atom } from "recoil";
import { KEYS } from "../keys";
import { userResponse } from "services/auth/createUser";

type AuthState = {
  user: userResponse | undefined;
};

const authState = atom<AuthState>({
  key: KEYS.AUTH,
  default: {
    user: undefined,
  },
});

export default authState;
