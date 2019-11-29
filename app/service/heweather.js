const Service = require('egg').Service;
const config = require('../../config/config.default');

class HeWeatherService extends Service {
  // 和风天气-常规天气数据
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
  // 城市搜索热门城市
  async searchCityTop(params={}) {
    const { key } = config.weather;
    const { data }= await this.ctx.curl('https://search.heweather.net/top', {
      data: {
        key,
        ...params
      },
      dataType: 'json',
      contentType: 'json'
    });
    return data
  }
  // 城市搜索热门城市
  async searchCityFind(params={}) {
    const { key } = config.weather;
    const { data }= await this.ctx.curl('https://search.heweather.net/find', {
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