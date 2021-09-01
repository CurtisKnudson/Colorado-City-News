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
    "./components/profile/avater.tsx",
    "./components/sidebar/sidebar.tsx",
    "./components/sidebarButtonCollapser/sidebarButtonCollapser.tsx",
    "./icons/sidebarMenuIcon.tsx",
    "./pages/index.tsx",
    "./pages/user/profile.tsx",
    "./pages/write/editor.jsx",
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
      };

      addUtilities(newUtilities);
    }),
  ],
};
