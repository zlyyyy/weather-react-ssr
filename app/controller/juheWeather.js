const Controller = require('egg').Controller;

class JuheWeatherController extends Controller {
  async weather() {
    const ctx = this.ctx;
    const { city='杭州' } = ctx.query;
    const res = await ctx.service.juheWeather.weather(city);
    this.ctx.body = res
  }
  async cityList() {
    const ctx = this.ctx;
    const res = await ctx.service.juheWeather.cityList();
    this.ctx.body = res
  }
}

module.exports = JuheWeatherController;