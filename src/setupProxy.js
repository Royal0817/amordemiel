const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/homepage',
    createProxyMiddleware({
      target: 'https://amordemiel.com',
      changeOrigin: true,
    })
  );
};
