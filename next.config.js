module.exports = {
  env: {
    customKey: "my-value",
    // Iron Auth Session
    TOKEN_SECRET:
      "This is a super secure token secret that is atleast 100 letters long",
    // Mongo
    MONGODB_URI:
      "mongodb+srv://curtis:upGZcaN6xoMNSulm@cluster0.lu9hq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    MONGODB_DB: "colorado_city_news",
    // Magic
    MAGIC_SECRET_KEY: "sk_live_5BD80FB5B92D2010",
    MAGIC_PUBLISHABLE_KEY: "pk_live_645EEB45FD696412",
  },
  webpack5: true,
  images: {
    domains: ["picsum.photos"],
  },
};
