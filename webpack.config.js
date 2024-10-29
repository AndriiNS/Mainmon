const config = {
  mode: "production",
  entry: {
    index: "./src/js/index.js",
    preloader: "./src/js/preloader.js",
    mobileNav: "./src/js/mobileNav.js",
    plistWithUs: "./src/js/plistWithUs.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

module.exports = config;
