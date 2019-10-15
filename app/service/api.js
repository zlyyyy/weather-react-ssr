const Service = require('egg').Service;
const config = require('../../config/config.default');

class ApiService extends Service {
  async weather(city = '杭州') {
    const { serverUrl, key } = config.weather;
    const { data } = await this.ctx.curl(`${serverUrl}/query`, {
      data: {
        key,
        city
      },
      dataType: 'json'
    });
    return data
  }
}

module.exports = ApiService;