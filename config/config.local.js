
module.exports = {
  proxy: [
    {
      host: 'http://127.0.0.1:8000', // 本地开发的时候代理前端打包出来的资源地址
      match: /(\/static)|(\/sockjs-node)|(\/__webpack_dev_server__)|hot-update/
    },
    // {
    //   host: 'http://localhost:7001', // proxy alicdn.com... 
    //   match: /api/
    // }
  ],
  cors: {
    origin: 'http://localhost:8000',//匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  },
  // security: {
  //   // 关闭csrf验证
  //   csrf: {
  //       enable: false,
  //   },
  //   // 白名单
  //   domainWhiteList: ['http://localhost:8000']
  // }
}
