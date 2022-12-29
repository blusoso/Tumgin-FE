import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "styled-components";

import BaseNavbar from "@/components/Navbar/BaseNavbar/BaseNavbar";
import Hamburger from "@/components/Hamburger/Hamburger";
import MyAvatar from "@/components/Avatar/MyAvatar/MyAvatar";
import Logo from "@/components/Logo/Logo";
import { MENU_TYPE } from "@/components/Hamburger/MenuSidebar/MenuSidebar";
import {
  MenuItem,
  MenuNameStyle,
} from "@/components/Hamburger/MenuSidebar/MenuSidebar.styled";
import useDetectMobile from "@/utils/detectDevice/useDetectMobile";
import BellIcon from "@/components/Icon/BellIcon";
import PingNotification from "@/components/Notification/PingNotification";
import SearchRecipe from "@/components/Search/SearchRecipe/SearchRecipe";
import useDetectTablet from "@/utils/detectDevice/useDetectTablet";

const NAVBAR_LIST: MENU_TYPE[] = [
  {
    id: "home",
    name: "หน้าแรก",
    icon: "home-outline",
    link: "/",
    isActive: true,
  },
  {
    id: "home",
    name: "ประเภท",
    icon: "home-outline",
    link: "/",
    isActive: false,
  },
];

type HomeNavbarProps = {
  showNavMobile?: boolean;
};

const HomeNavbar = ({ showNavMobile = false }: HomeNavbarProps) => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();

  const router = useRouter();
  const username = "Bluso";

  const MENU_ICON_SIZE = "1.4rem";
  const MENU_ICON_COLOR = themeContext.grayColor;
  const MENU_ICON_COLOR_ACTIVE = themeContext.greenColor;

  const welcomeText = (
    <div>
      <h3 className="text-secondary font-light">Tumgin ยินดีต้อนรับ 👋</h3>
      <h3 className="-mt-1">{username}</h3>
    </div>
  );

  const GoToMenuLink = (menuLink: string) => {
    //TODO:close panel
    router.push(menuLink);
  };

  const rightDesktop = () => (
    <>
      <div className="relative mr-5">
        <BellIcon />
        <div className="absolute top-0 right-1">
          <PingNotification />
        </div>
      </div>
      <MyAvatar isNotification={false} />
    </>
  );

  const desktopMenu = (
    <div className="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
      {NAVBAR_LIST.map((navbar, index) => (
        <div key={`${navbar.id}-${index}`}>
          <MenuItem onClick={() => GoToMenuLink(navbar.link)}>
            <MenuNameStyle isActive={navbar.isActive}>
              {navbar.name}
            </MenuNameStyle>
          </MenuItem>
        </div>
      ))}
      <SearchRecipe />
    </div>
  );

  return (
    <div className="mb-5">
      {isMobile || isTablet ? (
        showNavMobile && (
          <BaseNavbar
            left={<Hamburger />}
            center={welcomeText}
            right={<MyAvatar isNotification={true} />}
          />
        )
      ) : (
        <BaseNavbar
          left={<Logo className="mb-2" />}
          center={desktopMenu}
          right={rightDesktop()}
        />
      )}
    </div>
  );
};

export default HomeNavbar;
