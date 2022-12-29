import { atom } from "recoil";
import { KEYS } from "../keys";

type ModalState = {
  isOpenCookieModal: boolean;
};

const modalState = atom<ModalState>({
  key: KEYS.MODAL,
  default: {
    isOpenCookieModal: true,
  },
});

export default modalState;
