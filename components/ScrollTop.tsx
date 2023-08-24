import React, { useState, useLayoutEffect, useRef } from "react";

const Scrolltop = ({ articleRef }: any) => {
  const [scrollBottom, setScrollBottom] = useState(false);
  // register scroll top button

  const handleScroll = (e: any) => {
    setScrollBottom(!scrollBottom);

    window.scrollTo({
      top: scrollBottom ? 0 : document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
    // ('html, body').animate({ scrollTop: 0 }, 600);
  };

  const [progress, setProgress] = useState(0);
  const position = Math.max(1 - progress, 0);
  const complete = position === 0;
  const notMoved = position === 1;
  const DIAMETER = 68;
  const STROKE_WIDTH = 5;
  const RADIUS = DIAMETER / 2 - STROKE_WIDTH / 2;
  const CIRCUMFERENCE = Math.PI * RADIUS * 2;

  console.log(articleRef, "articleRef");

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (!articleRef.current) return;

      const { height } = articleRef.current.getBoundingClientRect();
      console.log(articleRef.current, "articleRef");

      setProgress(window.scrollY / (height - window.innerHeight));
    };
    updateHeight();

    window.addEventListener("scroll", updateHeight);
    return () => {
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  return (
    <>
      <a
        id="scroll-top"
        onClick={handleScroll}
        className="scroll-top"
        title="Top"
        role="button"
      >
        {complete ? (
          <>
            <i className="w-icon-angle-up"></i>
          </>
        ) : (
          <>
            <i className="w-icon-angle-down"></i>
          </>
        )}

        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 70 70"
        >
          <circle
            cx="35"
            cy="35"
            r={RADIUS}
            id="progress-indicator"
            fill="transparent"
            stroke="#000000"
            strokeWidth={STROKE_WIDTH}
            strokeMiterlimit="10"
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: CIRCUMFERENCE * position,
            }}
          />
        </svg>
      </a>
    </>
  );
};

export default Scrolltop;
