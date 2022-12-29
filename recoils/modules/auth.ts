import { atom } from "recoil";
import { KEYS } from "../keys";

type AuthState = {
  userData: any;
};

const authState = atom<AuthState>({
  key: KEYS.AUTH,
  default: {
    userData: {},
  },
});

export default authState;
