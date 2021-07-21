module.exports = {
  env: {
    customKey: "my-value",
    // Passport
    TOKEN_SECRET:
      "This is a super secure token secret that is atleast 100 letters long",
    // Mongo
    MONGODB_URI:
      "mongodb+srv://curtis:upGZcaN6xoMNSulm@cluster0.lu9hq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    MONGODB_DB: "colorado_city_news",
    // Google
    GOOGLE_CLIENT_ID:
      "861162194364-bomamlb209upnipkl97cge8j42495uu2.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "NrA-KOAwH6FJTgNAxxsAh5aK",
  },
  webpack5: true,
  images: {
    domains: ["picsum.photos"],
  },
};
