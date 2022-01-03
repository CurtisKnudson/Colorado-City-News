import { useEffect, useState } from "react";
import smoothscroll from "smoothscroll-polyfill";

export const ScrollToTop = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const scrollToTop = () => {
    smoothscroll.polyfill();
    // scroll to top
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {isScrolled ? (
        <div className="fixed h-12 w-12 bottom-6 right-6 bg-white shadow z-30 center-all cursor-pointer rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-black-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={scrollToTop}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 11l7-7 7 7M5 19l7-7 7 7"
            />
          </svg>
        </div>
      ) : null}
    </>
  );
};
