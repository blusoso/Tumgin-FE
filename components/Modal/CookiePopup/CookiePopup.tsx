import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

import BaseModal, { ALIGN_ITEM, BUTTON_ALIGN } from "../BaseModal/BaseModal";
import { COOKIE_CONSENT_MAX_AGE_SECONDS } from "@/utils/constant";
import { COOKIE_NAME } from "@/utils/cookies";
import { useRecoilState } from "recoil";
import cookiesState from "@/recoils/modules/cookie";

export type CookiePopupProps = {};

const CookiePopup = ({}: CookiePopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useRecoilState(cookiesState);

  useEffect(() => {
    const cookieConsent: any = getCookie(COOKIE_NAME.COOKIE_CONSENT);
    const cookieConsentJson: any = cookieConsent && JSON.parse(cookieConsent);

    setIsOpen(!cookieConsentJson?.status);
    setCookies({ ...cookies, isCookieConsent: cookieConsentJson?.status });
  }, []);

  const acceptCookieConsent = () => {
    const cookieConsent = {
      status: true,
    };

    setCookie(COOKIE_NAME.COOKIE_CONSENT, cookieConsent, {
      maxAge: COOKIE_CONSENT_MAX_AGE_SECONDS,
    });

    setIsOpen(false);
  };

  return (
    <>
      <BaseModal
        isOverlay={false}
        isOpen={isOpen}
        hasClose={false}
        title="🍪 เว็บไซต์นี้มีการใช้คุกกี้"
        buttonAlign={BUTTON_ALIGN.RIGHT}
        buttonPrimaryText="ยอมรับทั้งหมด"
        onPrimaryClick={acceptCookieConsent}
        // buttonSecondaryText="ปรับแต่งคุกกี้"
        width="93%"
        alignItem={ALIGN_ITEM.BOTTOM}
        bottom="1.5%"
      >
        <>
          เราใช้คุกกี้เพื่อเพิ่มประสบการณ์ที่ดีให้กับคุณ
          และช่วยให้เราเข้าใจผู้ใช้ที่มีต่อเว็บไซต์เราเพิ่มมากขึ้น
          โดยใช้เพื่อการวิเคราะห์และจุดประสงค์อื่นๆที่คุณสามารถดูเพิ่มเติมได้ที่{" "}
          <a className="link--underline">Cookie Policy</a>
        </>
      </BaseModal>
    </>
  );
};

export default CookiePopup;
