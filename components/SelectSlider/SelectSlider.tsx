import React from "react";
import styled from "styled-components";

import Button, { BUTTON_TYPE } from "../Button/Button";
import { ScrollHorizontal } from "../Mixin/Mixin";

export const SelectSliderWrapper = styled(ScrollHorizontal)``;

export type SelectorListType = {
  emoji: string;
  name: string;
};

export type SelectSliderProps = {
  id: string;
  className?: string;
  selectorList: SelectorListType[];
  activeIndexList: number[];
  onClick: (index: number) => void;
};

const SelectSlider = ({
  id,
  className,
  selectorList,
  activeIndexList = [],
  onClick,
}: SelectSliderProps) => {
  const onSelectSlider = (index: number) => {
    onClick(index);
  };

  return (
    <SelectSliderWrapper className={`-mr-5 ${className ? className : ""}`}>
      {selectorList.map((selector: any, index: number) => (
        <Button
          key={`${id}-item--${index}`}
          className="mr-2"
          type={
            activeIndexList.includes(index)
              ? BUTTON_TYPE.PRIMARY
              : BUTTON_TYPE.SECONDARY_OUTLINE
          }
          onClick={() => onSelectSlider(index)}
        >
          <span>
            {selector.emoji} {selector.name}
          </span>
        </Button>
      ))}
    </SelectSliderWrapper>
  );
};

export default SelectSlider;
