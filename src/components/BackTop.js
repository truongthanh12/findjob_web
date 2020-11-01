import React, { useState } from "react";

const BackTop = () => {
  // back to top
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div
      onClick={scrollTop}
      style={{
        height: 40,
        display: showScroll ? "" : "none",
        position: "fixed",
        bottom: "20px",
        right: "30px",
        zIndex: 9999909,
      }}
    >
      <i className="fas fa-arrow-circle-up"></i>
    </div>
  );
};

export default BackTop;
