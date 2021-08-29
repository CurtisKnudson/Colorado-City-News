module.exports = {
  mode: "jit",
  purge: [
    "./components/articleCard/articleCard.tsx",
    "./components/articleCard/featuredArticleCard.tsx",
    "./components/chipBar/chip.tsx",
    "./components/chipBar/chipBar.tsx",
    "./components/header/header.tsx",
    "./components/layout/layout.tsx",
    "./components/sidebar/sidebar.tsx",
    "./components/sidebarButtonCollapser/sidebarButtonCollapser.tsx",
    "./icons/sidebarMenuIcon.tsx",
    "./pages/index.tsx",
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
  plugins: [],
};
