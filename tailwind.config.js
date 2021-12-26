const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: "jit",
  purge: [
    "./components/article/index.tsx",
    "./components/articleCard/articleCard.tsx",
    "./components/articleCard/featuredArticleCard.tsx",
    "/components/authentication/needsAuthentication.tsx",
    "/components/authentication/components/signIn.tsx",
    "./components/chipBar/chip.tsx",
    "./components/chipBar/index.tsx",
    "./components/comments/index.tsx",
    "./components/comments/comment.tsx",
    "./components/header/header.tsx",
    "./components/layout/layout.tsx",
    "./components/loading/index.tsx",
    "./components/profile/avater.tsx",
    "./components/profile/userInfo.tsx",
    "./components/profile/recentActivity.tsx",
    "./components/profile/profileInput.tsx",
    "./components/profile/adornmentInputWithValidation.tsx",
    "./components/sidebar/sidebar.tsx",
    "./components/sidebarButtonCollapser/sidebarButtonCollapser.tsx",
    "./components/wysiwyg/button.tsx",
    "./components/wysiwyg/editor.tsx",
    "./components/wysiwyg/toolbar.tsx",
    "./icons/camera.tsx",
    "./icons/menu.tsx",
    "./icons/menuOpen.tsx",
    "./icons/search.tsx",
    "./icons/share.tsx",
    "./icons/sidebarMenuIcon.tsx",
    "./pages/index.tsx",
    "./pages/article/[id].tsx",
    "./pages/user/[id].tsx",
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
          color: "#666666",
        },

        ".merriweather": {
          fontFamily: "Merriweather-Regular",
        },
        ".merriweather-light": {
          fontFamily: "Merriweather-Light",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
