const Controller = require('egg').Controller;

class ApiController extends Controller {
  async wallpaper() {
    try {
      const res = await this.ctx.service.api.wallpaper();
      console.log(res)
      this.ctx.body = { type: 'bing', data: res.images }
    } catch (error) {
      this.ctx.body = {
        type: 'bing',
        data: [{
          url: '/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg',
          copyrightlink: '/search?q=%e4%b8%8a%e6%b5%b7%e4%b8%96%e7%95%8c%e9%87%91%e8%9e%8d%e4%b8%ad%e5%bf%83&form=hpcapt&mkt=zh-cn'
        }]
      }
    }
  }
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