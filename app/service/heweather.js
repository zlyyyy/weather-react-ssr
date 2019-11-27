const Service = require('egg').Service;
const config = require('../../config/config.default');

class HeWeatherService extends Service {
  // 和风天气
  async weather(params={}) {
    const { serverUrl, key } = config.weather;
    const weatherType = params.weatherType
    params.weatherType = null
    const { data } = await this.ctx.curl(`${serverUrl}${weatherType?'/'+weatherType:''}`, {
      data: {
        key,
        ...params
      },
      dataType: 'json',
      contentType: 'json'
    });
    return data
  }
}

module.exports = HeWeatherService;