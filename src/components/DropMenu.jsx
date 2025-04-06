import React, { useState, useEffect, useRef } from "react";
import "../styles/dropmenu.css";

const DropMenu = (la) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const adjustDropdownPosition = () => {
    if (!isOpen || !buttonRef.current || !dropdownRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = dropdownRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;

    // Reset styles
    dropdownRef.current.style.left = "";
    dropdownRef.current.style.right = "";
    dropdownRef.current.style.transform = "";

    if (viewportWidth <= 600) {
      // Mobile view - center the dropdown
      dropdownRef.current.style.left = "50%";
      dropdownRef.current.style.transform = "translateX(-50%)";
    } else if (buttonRect.left + dropdownWidth > viewportWidth) {
      // Desktop view - prevent right overflow
      dropdownRef.current.style.left = "auto";
      dropdownRef.current.style.right = "0";
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", adjustDropdownPosition);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", adjustDropdownPosition);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      adjustDropdownPosition();
    }
  }, [isOpen]);

  return (
    <div className="dropdown-container">
      <button
        ref={buttonRef}
        className="dropdown-button"
        onClick={toggleDropdown}
      >
        Cart
      </button>

      <div
        ref={dropdownRef}
        className={`dropdown-content ${isOpen ? "active" : ""}`}
      >
        <p>This is your dropdown content.</p>
        <p>It will stay within view when the window is resized.</p>
        <p>Additional items can go here.</p>
      </div>
    </div>
  );
};

export default DropMenu;
