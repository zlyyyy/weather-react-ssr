'use strict'

const config = require('../config/config.ssr')

module.exports = app => {
  const { router, controller } = app
  config.routes.map(route => {
    router.get(`${route.path}`, controller[route.controller][route.handler])
  })
  router.get('/api/wallpaper', controller.wallpaper.getWallpaper);
  router.get('/api/heweather', controller.heweather.weather);
}
