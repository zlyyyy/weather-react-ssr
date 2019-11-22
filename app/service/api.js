const Service = require('egg').Service;
const config = require('../../config/config.default');

class ApiService extends Service {
  async wallpaper() {
    const { data } = await this.ctx.curl('https://cn.bing.com/HPImageArchive.aspx', {
      data: {
        // format js (一般使用这个，返回json格式)xml（返回xml格式）
        // idx 非必须
        // 0 今天
        // -1 截止中明天 （预准备的）
        // 1 截止至昨天，类推（目前最多获取到7天前的图片）
        // n （必需）	
        // 1-8 返回请求数量，目前最多一次获取8张
        format: 'js',
        n: '1'
      },
      dataType: 'json'
    });
    return data
  }
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
  async cityList() {
    const { serverUrl, key } = config.weather;
    const { data } = await this.ctx.curl(`${serverUrl}/cityList`, {
      data: {
        key
      },
      dataType: 'json'
    });
    return data
  }
}

module.exports = ApiService;