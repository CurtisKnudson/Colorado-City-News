module.exports = {
  mode: "jit",
  purge: [
    "./pages/index.tsx",
    "./components/sidebar/sidebar.tsx",
    "./components/sidebar/sidebarButtonCollapser.tsx",
    "./icons/sidebarMenuIcon.tsx",
    "",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
