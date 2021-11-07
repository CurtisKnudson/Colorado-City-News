const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: "jit",
  purge: [
    "./components/articleCard/articleCard.tsx",
    "./components/articleCard/featuredArticleCard.tsx",
    "/components/authentication/needsAuthentication.tsx",
    "/components/authentication/components/signIn.tsx",
    "./components/chipBar/chip.tsx",
    "./components/chipBar/chipBar.tsx",
    "./components/header/header.tsx",
    "./components/layout/layout.tsx",
    "./components/profile/avater.jsx",
    "./components/profile/setUserInfo.tsx",
    "./components/sidebar/sidebar.tsx",
    "./components/sidebarButtonCollapser/sidebarButtonCollapser.tsx",
    "./components/wysiwyg/editor.tsx",
    "./icons/camera.tsx",
    "./icons/menu.tsx",
    "./icons/menuOpen.tsx",
    "./icons/search.tsx",
    "./icons/share.tsx",
    "./icons/sidebarMenuIcon.tsx",
    "./pages/index.tsx",
    "./pages/article/[slug].tsx",
    "./pages/user/profile.tsx",
    "./pages/write/editor.jsx",
    "./views/article.tsx",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      boxShadow: {
        nav: "3px 5px 6px 0px #ececec",
        darknav: "3px 5px 6px 0px #232121",
      },
      fontFamily: {
        chomsky: ["Chomsky"],
        lfRegular: ["Libre-Franklin-Regular"],
        lfBold: ["Libre-Franklin-Bold"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".center-all": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ".overline": {
          fontFamily: "Libre-Franklin-Bold",
          fontSize: "10px",
          textTransform: "uppercase",
        },
        ".caption": {
          fontFamily: "Merriweather-Italic",
          fontSize: "12px",
        },
        ".button": {
          fontFamily: "Libre-Franklin-Bold",
          fontSize: "14px",
          textTransform: "uppercase",
        },
        ".body2": {
          fontFamily: "Libre-Frankling-Regular",
          fontSize: "14px",
        },
        ".body1": {
          fontFamily: "Merriweather-Regular",
          fontSize: "16px",
        },
        ".body1-light": {
          fontFamily: "Merriweather-Light",
          fontSize: "16px",
        },
        ".subtitle2": {
          fontFamily: "Merriweather-Medium",
          fontSize: "14px",
        },
        ".subtitle1": {
          fontFamily: "Libre-Frankling-Medium",
          fontSize: "16px",
        },
        ".h6Headline": {
          fontFamily: "Merriweather-Bold-Italic",
          fontSize: "20px",
        },
        ".h5Headline": {
          fontFamily: "Libre-Franklin-Regular",
          fontSize: "24px",
        },
        ".h4Headline": {
          fontFamily: "Libre-Franklin-Regular",
          fontSize: "34px",
        },
        ".h3Headline": {
          fontFamily: "Merriweather-Black-Italic",
          fontSize: "48px",
        },
        ".h2Headline": {
          fontFamily: "Libre-Franklin-Light",
          fontSize: "60px",
        },
        ".h1Headline": {
          fontFamily: "Merriweather-Black-Italic",
          fontSize: "96px",
        },
        ".text-black-60": {
          color: "rgba(0,0,0,0.6)",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
