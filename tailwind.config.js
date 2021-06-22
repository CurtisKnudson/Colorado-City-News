module.exports = {
  mode: "jit",
  purge: [
    "./pages/index.tsx",
    "./components/sidebar/sidebar.tsx",
    "./components/sidebar/sidebarButtonCollapser.tsx",
    "./icons/sidebarMenuIcon.tsx",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      boxShadow: {
        nav: "10px 0 5px -2px #ececec;",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
