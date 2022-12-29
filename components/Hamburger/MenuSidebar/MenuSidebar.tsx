import React, { useContext } from "react";
import { ReactSVG } from "react-svg";
import { ThemeContext } from "styled-components";
import { useRouter } from "next/router";

import { ICON_PATH } from "../../../utils/constant";

import {
  DimBackground,
  MenuItem,
  MenuNameStyle,
  MenuSidebarPanel,
  MenuSidebarWrapper,
} from "./MenuSidebar.styled";
import CloseIcon from "../../Icon/CloseIcon";
import BaseIcon from "../../Icon/BaseIcon";
import Logo from "../../Logo/Logo";

export type MENU_TYPE = {
  id: string;
  name: string;
  icon: string;
  link: string;
  isActive: boolean;
};

export const GENERAL_MENU_LIST: MENU_TYPE[] = [
  {
    id: "home",
    name: "หน้าแรก",
    icon: "home-outline",
    link: "/",
    isActive: true,
  },
  {
    id: "saved",
    name: "ที่บันทึกไว้",
    icon: "heart-outline",
    link: "/",
    isActive: false,
  },
  {
    id: "profile",
    name: "โปรไฟล์",
    icon: "person-outline",
    link: "/",
    isActive: false,
  },
  // { id: "meal-plan", name: "ตารางมื้ออาหาร", icon: "pie-chart-outline", link: "/", isActive: false },
  // { id: "shopping-list", name: "รายการช้อปปิ้ง", icon: "shopping-bag-outline", link: "/", isActive: false },
  // { id: "article", name: "บทความ", icon: "book-outline", link: "/", isActive: false },
];

export const SETTING_MENU_LIST: MENU_TYPE[] = [
  {
    id: "setting",
    name: "ตั้งค่า",
    icon: "settings-outline",
    link: "/",
    isActive: false,
  },
  {
    id: "help",
    name: "ขอความช่วยเหลือ",
    icon: "question-mark-outline",
    link: "/",
    isActive: false,
  },
  {
    id: "logout",
    name: "ออกจากระบบ",
    icon: "corner-down-left-outline",
    link: "/",
    isActive: false,
  },
];

type MenuSidebarProps = {
  onClose?: () => void;
};

const MenuSidebar = ({ onClose }: MenuSidebarProps) => {
  const themeContext = useContext(ThemeContext);
  const router = useRouter();

  const CLOSE_ICON_SIZE = "1.8rem";
  const MENU_ICON_SIZE = "1.4rem";
  const MENU_ICON_COLOR = themeContext.grayColor;
  const MENU_ICON_COLOR_ACTIVE = themeContext.greenColor;

  const GoToMenuLink = (menuLink: string) => {
    //TODO:close panel
    router.push(menuLink);
  };

  const renderMenuItem = (menu: MENU_TYPE) => (
    <MenuItem margin="1.15rem 0 0 0" onClick={() => GoToMenuLink(menu.link)}>
      <BaseIcon
        iconWidth={MENU_ICON_SIZE}
        iconHeight={MENU_ICON_SIZE}
        color={menu.isActive ? MENU_ICON_COLOR_ACTIVE : MENU_ICON_COLOR}
      >
        <ReactSVG src={`${ICON_PATH}/${menu.icon}.svg`} />
      </BaseIcon>
      <MenuNameStyle isActive={menu.isActive}>{menu.name}</MenuNameStyle>
    </MenuItem>
  );

  return (
    <>
      <MenuSidebarWrapper>
        <CloseIcon
          className="absolute top-0 right-0 mr-4 mt-3 cursor-pointer"
          iconWidth={CLOSE_ICON_SIZE}
          color={MENU_ICON_COLOR}
          onClick={onClose}
        />
        <MenuSidebarPanel>
          <Logo />
          <div>
            {GENERAL_MENU_LIST.map((generalMenu, index) => (
              <div key={`${generalMenu.id}-${index}`}>
                {renderMenuItem(generalMenu)}
              </div>
            ))}
          </div>

          <div className="mt-10">
            {SETTING_MENU_LIST.map((settingMenu, index) => (
              <div key={`${settingMenu.id}-${index}`}>
                {renderMenuItem(settingMenu)}
              </div>
            ))}
          </div>
        </MenuSidebarPanel>
      </MenuSidebarWrapper>
      <DimBackground onClick={onClose} />
    </>
  );
};

export default MenuSidebar;
