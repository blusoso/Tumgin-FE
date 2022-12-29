import React, { useState } from "react";

export type CheckboxProps = {
  id: string;
  name: string;
  checked?: boolean;
  label?: string;
  children?: JSX.Element;
  register?: any;
  onChange?: (checked: any, name?: string) => void;
};

const Checkbox = ({
  id,
  name,
  checked = false,
  label,
  children,
  onChange,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: targetChecked, name: inputName } = event.target;
    setIsChecked(targetChecked);

    if (onChange) onChange(targetChecked, inputName);
  };

  return (
    <label className="flex items-center select-none cursor-pointer">
      <input
        id={`checkbox__${id}`}
        type="checkbox"
        className="w-4 h-4 border border-secondary mr-1"
        name={name}
        checked={isChecked}
        onChange={handleChange}
      />
      {label || children}
    </label>
  );
};

export default Checkbox;
