import React from "react";
import Link from "next/link";

import Checkbox from "../Checkbox";

type PolicyConsentCheckboxProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  isError?: boolean;
  onChange: (checked: any, name?: string) => void;
};

const PolicyConsentCheckbox = ({
  id = "policy-consent",
  name = "is_consent",
  checked = true,
  isError,
  onChange,
}: PolicyConsentCheckboxProps) => {
  return (
    <>
      <Checkbox
        id={id}
        name={name}
        checked={checked}
        isError={isError}
        onChange={onChange}
      >
        <div>
          ฉันอ่านและยอมรับ{" "}
          <Link
            href="/terms-of-service"
            target="_blank"
            className="link--underline"
          >
            เงื่อนไข
          </Link>{" "}
          และ{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="link--underline"
          >
            นโยบายความเป็นส่วนตัว
          </Link>
        </div>
      </Checkbox>
    </>
  );
};

export default PolicyConsentCheckbox;
