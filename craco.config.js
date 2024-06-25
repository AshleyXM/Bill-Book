// CommonJS语法（不是ES6语法），因为这个文件在Node.js环境中运行
const path = require("path");

module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用@表示src文件所在的路径
      "@": path.resolve(__dirname, "src"),
    },
  },
};
