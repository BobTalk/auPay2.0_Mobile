
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