const production = {
  url: {
    API_URL: "https://coloradocity.news",
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:3000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : production;
