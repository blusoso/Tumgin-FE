import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "styled-components";
import { useRecoilValue } from "recoil";

import { authState } from "@/recoils/index";

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
import SelectModal from "@/components/Select/SelectModal/SelectModal";
import { ProfileSelectWrapper } from "./HomeNavbar.styled";
import { LinkHover } from "@/components/Search/SearchRecipe/SearchRecipe.styled";
import { ReactSVG } from "react-svg";
import { ICON_PATH } from "@/utils/constant";
import BaseIcon from "@/components/Icon/BaseIcon";
import { LOGIN_WITH } from "services/auth/createUser";
import { googleLogout } from "@react-oauth/google";
import { clearToken } from "@/utils/cookies";
import { APP_NAME } from "@/utils/constant";
import Button, { BUTTON_TYPE } from "@/components/Button/Button";

const NAVBAR_LIST: MENU_TYPE[] = [
  {
    id: "home",
    name: "หน้าแรก",
    icon: "home-outline",
    link: "/",
    isActive: true,
  },
  {
    id: "category",
    name: "ประเภท",
    icon: "home-outline",
    link: "/",
    isActive: false,
  },
];

export enum PROFILE_SETTING_ID {
  LOGOUT = "logout",
}

const PROFILE_SETTING_LIST = [
  { id: "logout", name: "ออกจากระบบ", icon: "log-out-outline" },
];

type HomeNavbarProps = {
  showNavMobile?: boolean;
  showCenter?: boolean;
};

const PROFILE_MODAL_PADDING = "0.6rem 0";

const HomeNavbar = ({
  showNavMobile = false,
  showCenter = true,
}: HomeNavbarProps) => {
  const themeContext = useContext(ThemeContext);
  const isMobile = useDetectMobile();
  const isTablet = useDetectTablet();
  const router = useRouter();

  const { user } = useRecoilValue(authState);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const username = user && user.username;

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

  const handleLogout = () => {
    clearToken();

    switch (user?.login_with) {
      case LOGIN_WITH.GOOGLE:
        googleLogout();
        break;

      case LOGIN_WITH.FACEBOOK:
        break;

      case LOGIN_WITH.SITE:
      default:
        break;
    }

    router.reload();
  };

  const handleProfileSettingLink = (profileSettingId: string) => {
    if (profileSettingId === PROFILE_SETTING_ID.LOGOUT) {
      handleLogout();
    }
  };

  const renderMyAvatar = ({
    showNotification,
  }: {
    showNotification: boolean;
  }) => (
    <div className="relative">
      <MyAvatar
        img={user?.profile_img}
        isNotification={showNotification}
        onClick={() => setIsOpenProfile(!isOpenProfile)}
      />
      <ProfileSelectWrapper>
        <SelectModal
          isOpen={isOpenProfile}
          position="absolute"
          width="12rem"
          padding={PROFILE_MODAL_PADDING}
        >
          <>
            {PROFILE_SETTING_LIST.map((item) => (
              <LinkHover
                key={`profile-setting__${item.id}`}
                className="flex items-center gap-1"
                onClick={() => handleProfileSettingLink(item.id)}
              >
                <BaseIcon iconWidth="1.2rem">
                  <ReactSVG src={`${ICON_PATH}/${item.icon}.svg`} />
                </BaseIcon>
                {item.name}
              </LinkHover>
            ))}
          </>
        </SelectModal>
      </ProfileSelectWrapper>
    </div>
  );

  const userNavbar = (
    <>
      {!(isMobile || isTablet) && (
        <div className="relative mr-5">
          <BellIcon />
          <div className="absolute top-0 right-1">
            <PingNotification />
          </div>
        </div>
      )}

      {renderMyAvatar({
        showNotification: isMobile || isTablet ? true : false,
      })}
    </>
  );

  const guestNavbar = (
    <Button
      id="sign_in__navbar"
      type={BUTTON_TYPE.PRIMARY_OUTLINE}
      onClick={() => router.push("/session/new")}
    >
      <>เข้าสู่ระบบ</>
    </Button>
  );

  const rightNavbar = () => (user ? userNavbar : guestNavbar);

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
    <>
      {isMobile || isTablet ? (
        showNavMobile && (
          <div
            className={`${showCenter ? "mb-5" : "mb-8"} ${
              showCenter ? "" : "my-4"
            }`}
          >
            <BaseNavbar
              left={<Hamburger />}
              center={
                showCenter ? user ? welcomeText : <h1>{APP_NAME}</h1> : ""
              }
              right={rightNavbar()}
            />
          </div>
        )
      ) : (
        <div
          className={`${showCenter ? "mb-5" : "mb-8"} ${
            showCenter ? "" : "my-4"
          }`}
        >
          <BaseNavbar
            left={<Logo className="mb-2" />}
            center={showCenter ? desktopMenu : ""}
            right={rightNavbar()}
          />
        </div>
      )}
    </>
  );
};

export default HomeNavbar;
