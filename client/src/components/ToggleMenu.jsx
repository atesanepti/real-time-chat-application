import React, { useEffect, useState } from "react";

const ToggleMenu = ({ isVisiable, setVisiable, children, position }) => {
  const [menuShow, setMenuShow] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target.matches("#menu_box") ||
        e.target.parentElement?.id == "menu_box"
      ) {
        return;
      } else {
        setVisiable(false);
        document.removeEventListener("click", handleClick);
      }
    };

    if (menuShow) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [menuShow, setVisiable]);

  useEffect(() => {
    if (isVisiable) {
      setMenuShow(true);
    } else {
      setMenuShow(false);
    }
  }, [isVisiable]);

  if (isVisiable) {
    return (
      <div
        id="menu_box"
        className={`absolute ${position} pop-animation bg-dark-surface shadow-md text-white py-1 lg:py-2 rounded-md w-[100px] lg:w-[120px]`}
      >
        {children}
      </div>
    );
  }
};

export default ToggleMenu;
