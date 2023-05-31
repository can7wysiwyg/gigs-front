const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {

    app.use(
        '/auth',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      ),
      app.use(
        '/qualification',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/user',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/subject',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/admin',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
    
    
      
    
    



    
}