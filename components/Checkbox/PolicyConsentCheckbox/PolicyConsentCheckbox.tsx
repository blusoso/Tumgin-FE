import React from "react";
import Link from "next/link";

import Checkbox from "../Checkbox";

type PolicyConsentCheckboxProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange: (checked: any, name?: string) => void;
};

const PolicyConsentCheckbox = ({
  id = "policy-consent",
  name = "is_consent",
  checked = true,
  onChange,
}: PolicyConsentCheckboxProps) => {
  return (
    <>
      <Checkbox id={id} name={name} checked={checked} onChange={onChange}>
        <div>
          ฉันอ่านและยอมรับ{" "}
          <Link
            href="/terms-of-service"
            target="_blank"
            className="link--underline px-1"
          >
            เงื่อนไข
          </Link>{" "}
          และ{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="link--underline px-1"
          >
            นโยบายความเป็นส่วนตัว
          </Link>
        </div>
      </Checkbox>
    </>
  );
};

export default PolicyConsentCheckbox;
