const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {


  app.use(
    '/identity',


    createProxyMiddleware({
      target: 'http://abd:7776/',
      changeOrigin: true,
    }));
  app.use(
    '/logs',

    createProxyMiddleware({
      target: 'http://trustdecisionlogs:9000/',
      changeOrigin: true,
    }));


  app.use(
    '/v1',


    createProxyMiddleware({
      target: 'http://tv:8181/',
      changeOrigin: true,
    })
  );
};