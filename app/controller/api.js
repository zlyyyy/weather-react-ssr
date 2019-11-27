const Controller = require('egg').Controller;

class ApiController extends Controller {
  async weather() {
    const ctx = this.ctx;
    const { city='杭州' } = ctx.query;
    const res = await ctx.service.api.weather(city);
    this.ctx.body = res
  }
  async cityList() {
    const ctx = this.ctx;
    const res = await ctx.service.api.cityList();
    this.ctx.body = res
  }
}

module.exports = ApiController;