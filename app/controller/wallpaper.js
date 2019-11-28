const Controller = require('egg').Controller;

class WallpaperController extends Controller {
  // 实况天气
  async getWallpaper() {
    const { ctx } = this
    try {
      const res = await ctx.service.wallpaper.getWallpaper();
      ctx.body = { type: 'bing', data: res.images }
    } catch (error) {
      ctx.body = {
        type: 'bing',
        data: [{
          url: '/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg',
          copyrightlink: '/search?q=%e4%b8%8a%e6%b5%b7%e4%b8%96%e7%95%8c%e9%87%91%e8%9e%8d%e4%b8%ad%e5%bf%83&form=hpcapt&mkt=zh-cn'
        }]
      }
    }
  }
}

module.exports = WallpaperController;