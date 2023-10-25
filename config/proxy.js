
console.log('process.env.REACT_APP_BASE_URL',process.env.REACT_APP_BASE_URL)
module.exports = {
  "/user": {
    target: process.env.REACT_APP_BASE_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {},
  },
  "/operate": {
    target: process.env.REACT_APP_BASE_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {},
  },
  "/wallet": {
    target: process.env.REACT_APP_BASE_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {},
  }
};