import React, { useState } from "react";
import MenuIcon from "../Icon/MenuIcon";
import MenuSidebar from "./MenuSidebar/MenuSidebar";

export type HamburgerProps = {};

const Hamburger = ({}: HamburgerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebarMenu = () => {
    setIsOpen(true);
  };

  const handleCloseSidebarMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div onClick={toggleSidebarMenu}>
        <MenuIcon iconWidth="2rem" />
      </div>

      {isOpen && <MenuSidebar onClose={handleCloseSidebarMenu} />}
    </div>
  );
};

export default Hamburger;
