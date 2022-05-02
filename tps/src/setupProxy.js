const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/logs',
    createProxyMiddleware({
      target: 'http://localhost:9000/',
      changeOrigin: true,
    }));

  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'http://localhost:8181/',
      changeOrigin: true,
    })
  );
};