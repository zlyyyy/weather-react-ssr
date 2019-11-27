const Service = require('egg').Service;
const config = require('../../config/config.default');
const { serverUrl, key } = config.juheweather;

class JuheWeatherService extends Service {
  async weather(city = '杭州') {
    const { data } = await this.ctx.curl(`${serverUrl}/query`, {
      data: {
        key,
        city
      },
      dataType: 'json'
    });
    return data
  }
  async cityList() {
    const { data } = await this.ctx.curl(`${serverUrl}/cityList`, {
      data: {
        key
      },
      dataType: 'json'
    });
    return data
  }
}

module.exports = JuheWeatherService;