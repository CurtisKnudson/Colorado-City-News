const production = {
  url: {
    API_URL:
      "https://colorado-city-news-dev-4pylwbueb-midgard-marketing.vercel.app/api",
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:3000/api",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : production;
