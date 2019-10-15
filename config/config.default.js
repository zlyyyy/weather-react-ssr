const resolvePath = (path) => require('path').resolve(__dirname, path)

module.exports = {
  keys: 'egg-ssr',
  static: {
    prefix: '/',
    dir: resolvePath('../dist')
  },
  weather: {
    serverUrl: 'http://apis.juhe.cn/simpleWeather',
    key: '868f6f413a7ccf9e72188b369288e0b8'
  }
}
