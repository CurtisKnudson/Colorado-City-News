const production = {
  url: {
    API_URL: "https://coloradocity.news/api",
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:3000/api",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : production;
