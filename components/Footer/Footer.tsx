import { APP_NAME } from "@/utils/constant";
import Link from "next/link";
import React, { useRef } from "react";

const FOOTER_ITEM_LIST = [
  { name: "นโยบายความเป็นส่วนตัว", link: "privacy-policy" },
  { name: "เงื่อนไข", link: "terms-of-service" },
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <footer
      ref={footerRef}
      className="border border-secondary--light border-t-secondary--light border-b-white border-l-white border-r-white"
    >
      <div className="container flex justify-between py-3 font-normal mx-auto">
        <div>©2022 {APP_NAME}</div>
        <div className="text-right">
          {FOOTER_ITEM_LIST.map((footerItem, index: number) => (
            <React.Fragment key={`footer-item__${index}`}>
              <Link
                href={`/${footerItem.link}`}
                className={`link__secondary--underline ${
                  FOOTER_ITEM_LIST.length !== index + 1 ? "mr-4" : ""
                }`}
              >
                {footerItem.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
