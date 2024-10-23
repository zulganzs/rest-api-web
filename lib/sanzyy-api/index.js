//const version = require("./package.json").version

module.exports = {
  creator: "zul",
  version: '1.8.5',
  tools: require("./src/tools.js"),
  downloader: require("./src/downloader.js"),
  search: require("./src/search.js"),
  random: require("./src/random.js"),
  ai: require("./src/ai.js")
}
