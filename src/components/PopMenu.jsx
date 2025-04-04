import { useState, useRef, useEffect } from "react";

const Popover = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const updatePopoverPosition = () => {
    if (!open || !buttonRef.current || !popoverRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let top = buttonRect.bottom + window.scrollY + 5; // Default: below button
    let left = buttonRect.left + window.scrollX; // Default: align with button

    // Prevent right overflow
    if (left + popoverRect.width > windowWidth) {
      left = windowWidth - popoverRect.width - 10;
    }

    // Prevent bottom overflow (move above button)
    if (top + popoverRect.height > windowHeight) {
      top = buttonRect.top + window.scrollY - popoverRect.height - 5;
    }

    // Apply final position
    popoverRef.current.style.top = `${top}px`;
    popoverRef.current.style.left = `${left}px`;
  };

  useEffect(() => {
    if (open) {
      updatePopoverPosition();
      window.addEventListener("resize", updatePopoverPosition);
      window.addEventListener("scroll", updatePopoverPosition);
    }

    return () => {
      window.removeEventListener("resize", updatePopoverPosition);
      window.removeEventListener("scroll", updatePopoverPosition);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-auto"
      >
        Toggle Popover
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute w-48 bg-white text-gray-800 p-2 border border-gray-300 rounded-lg shadow-lg transition-all duration-300"
          style={{ position: "absolute" }}
        >
          Greetings, one and all!
        </div>
      )}
    </div>
  );
};

export default Popover;
