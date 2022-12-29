import { atom } from "recoil";
import { KEYS } from "../keys";

type CookiesState = {
  isCookieConsent: boolean;
};

const cookiesState = atom<CookiesState>({
  key: KEYS.COOKIE,
  default: {
    isCookieConsent: false,
  },
});

export default cookiesState;
