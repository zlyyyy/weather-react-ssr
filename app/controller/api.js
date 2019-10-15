const Controller = require('egg').Controller;

class ApiController extends Controller {
  async weather() {
    const ctx = this.ctx;
    const { city='杭州' } = ctx.query;
    const res = await ctx.service.api.weather(city);
    this.ctx.body = res
  }
}

module.exports = ApiController;