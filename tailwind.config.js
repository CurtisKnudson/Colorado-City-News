module.exports = {
  mode: "jit",
  purge: [
    "./pages/index.tsx",
    "./components/header/header.tsx",
    "./components/layout/layout.tsx",
    "./components/sidebar/sidebar.tsx",
    "./components/sidebarButtonCollapser/sidebarButtonCollapser.tsx",
    "./icons/sidebarMenuIcon.tsx",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      boxShadow: {
        nav: "3px 5px 6px 0px #ececec;",
      },
      fontFamily: {
        chomsky: ["Chomsky"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
