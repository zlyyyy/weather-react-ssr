const Controller = require('egg').Controller;

const statusCode = {
  'ok':	'数据正常',
  'invalid key':	'无效的key，请检查你的key是否输入以及是否输入有误',
  'invalid key type':	'你输入的key不适用于当前获取数据的方式，即SDK的KEY不能用于Web API或通过接口直接访问，反之亦然。',
  'invalid param':	'无效的参数，请检查你传递的参数是否正确、完整',
  'bad bind':	'错误的绑定，例如绑定的package name、bundle id或IP地址不一致的时候',
  'no data for this location':	'该城市/地区没有你所请求的数据',
  'no more requests':	'超过访问次数，需要等到当月最后一天24点（免费用户为当天24点）后进行访问次数的重置或升级你的访问量',
  'no balance':	'没有余额，你的按量计费产品由于余额不足或欠费而不能访问，请尽快充值',
  'too fast':	'超过限定的QPM，请参考QPM说明',
  'dead':	'无响应或超时，接口服务异常',
  'unknown location':	'没有你查询的这个地区，或者地区名称错误',
  'permission denied':	'无访问权限，你没有购买你所访问的这部分服务',
  'sign error':	'签名错误，请参考签名算法'
}
const nowRule = {
  weatherType: { type: 'string', values:[ 'now', 'forecast', 'hourly', 'lifestyle' ], required: false},
  location: 'string',
  lang: { type: 'string', required: false },
  unit: { type: 'string', required: false },
}
class HeWeatherController extends Controller {
  // 常规天气数据
  async weather() {
    const { ctx } = this
    try {
      ctx.validate(nowRule, ctx.query);
      // const { location='杭州' } = ctx.query;
      const res = await ctx.service.heweather.weather({...ctx.query});
      // 检查调用是否成功，如果调用失败会抛出异常
      this.checkSuccess(res);
      ctx.body = res.HeWeather6[0] || res
    } catch (error) {
      this.ctx.body = {
        error: error
      }
    }
  }
  // 城市搜索热门城市
  async searchCityTop() {
    const { ctx } = this
    const searchCityTopRule = {
      group: { type: 'string', values:[ 'world', 'cn', 'overseas' ], required: true},
      number: { type: 'number', required: false },
      lang: { type: 'string', required: false }
    }
    try {
      ctx.validate(searchCityTopRule, ctx.query);
      const res = await ctx.service.heweather.searchCityTop({...ctx.query});
      // 检查调用是否成功，如果调用失败会抛出异常
      this.checkSuccess(res);
      ctx.body = res.HeWeather6[0] || res
    } catch (error) {
      this.ctx.body = {
        error: error
      }
    }
  }
  // 城市搜索
  async searchCityFind() {
    const { ctx } = this
    const searchCityFindRule = {
      location: 'string',
      mode: { type: 'string', values:[ 'equal', 'match' ], required: false },
      group: { type: 'string', required: true},
      number: { type: 'number', required: false },
      lang: { type: 'string', required: false }
    }
    try {
      ctx.validate(searchCityFindRule, ctx.query);
      const res = await ctx.service.heweather.searchCityFind({...ctx.query});
      // 检查调用是否成功，如果调用失败会抛出异常
      this.checkSuccess(res);
      ctx.body = res.HeWeather6[0] || res
    } catch (error) {
      this.ctx.body = {
        error: error
      }
    }
  }
  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    const { status } = result.HeWeather6[0] || {}
    if (status !== 'ok') {
      const errorMsg = result.HeWeather6[0] && status ? statusCode[status] : 'unknown error';
      this.ctx.throw(status, errorMsg);
    }
    // if (!result.data.success) {
    //   // 远程调用返回格式错误
    //   this.ctx.throw(500, 'remote response error', { data: result.data });
    // }
  }
}

module.exports = HeWeatherController;