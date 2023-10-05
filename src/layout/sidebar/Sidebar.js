import React, { useState } from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Logo from "../logo/Logo";
import Menu from "../menu/Menu";
import Toggle from "./Toggle";
import EcommerceMenu from "../menu/EcommerceMenu";

import { useTheme, useThemeUpdate } from "../provider/Theme";

const Sidebar = ({ fixed, className, ...props }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const [mouseEnter, setMouseEnter] = useState(false);

  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);

  const classes = classNames({
    "nk-sidebar": true,
    "nk-sidebar-fixed": fixed,
    "nk-sidebar-active": theme.sidebarVisibility,
    "nk-sidebar-mobile": theme.sidebarMobile,
    "is-compact": theme.sidebarCompact,
    "has-hover": theme.sidebarCompact && mouseEnter,
    [`is-light`]: theme.sidebar === "white",
    [`is-${theme.sidebar}`]: theme.sidebar !== "white" && theme.sidebar !== "light",
    [`${className}`]: className,
  });

  return (
    <>
      <div className={classes}>
        <div className="nk-sidebar-element nk-sidebar-head">
          <div className="nk-sidebar-brand">
            <Logo />
          </div>
          <div className="nk-menu-trigger me-n2">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none me-n2"
              icon="arrow-left"
              click={themeUpdate.sidebarVisibility}
            />
            <Toggle
              className={`nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex ${
                theme.sidebarCompact ? "compact-active" : ""
              }`}
              click={themeUpdate.sidebarCompact}
              icon="menu"
            />
          </div>
        </div>
        <div className="nk-sidebar-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SimpleBar className="nk-sidebar-menu">
            {window.location.pathname.split("/")[2] === "ecommerce" ? <EcommerceMenu /> : <EcommerceMenu />}
          </SimpleBar>
        </div>
      </div>
      {theme.sidebarVisibility && <div onClick={themeUpdate.sidebarVisibility} className="nk-sidebar-overlay"></div>}
    </>
  );
};
export default Sidebar;
