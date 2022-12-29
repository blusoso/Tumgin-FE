import React, { useState } from "react";
import { TabMenuStyle, TabMenuWrapper } from "./tabMenu.styled";

type TabMenuListType = {
  emoji?: string;
  name: string;
};

export type TabMenuProps = {
  tabMenuList: TabMenuListType[];
  defaultSelected?: TabMenuListType;
};

const TabMenu = ({ tabMenuList, defaultSelected }: TabMenuProps) => {
  const [selectedTabMenu, setSelectedTabMenu] = useState(tabMenuList[0]);

  return (
    <TabMenuWrapper>
      {tabMenuList.map((tabMenu, key) => (
        <TabMenuStyle
          key={`tab-menu--${key}`}
          isActive={
            defaultSelected
              ? defaultSelected.name === tabMenu.name
              : selectedTabMenu.name === tabMenu.name
          }
          onClick={() => setSelectedTabMenu(tabMenu)}
        >
          <h3>
            {tabMenu.emoji} {tabMenu.name}
          </h3>
        </TabMenuStyle>
      ))}
    </TabMenuWrapper>
  );
};

export default TabMenu;
