const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: resolvePath('../dist')
  },
  weather: {
    serverUrl: 'https://free-api.heweather.net/s6/weather',
    key: '948a635d666b44c6817d202fc4fae461'
  },
  juheweather: {
    serverUrl: 'http://apis.juhe.cn/simpleWeather',
    key: '868f6f413a7ccf9e72188b369288e0b8'
  },
  // 加载 errorHandler 中间件
  middleware: [ 'errorHandler' ],
  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: '/api',
  }
}
