'use strict'

const config = require('../config/config.ssr')

module.exports = app => {
  const { router, controller } = app
  config.routes.map(route => {
    router.get(`${route.path}`, controller[route.controller][route.handler])
  })
  router.get('/api/juheweather', controller.juheWeather.weather);
  router.get('/api/juhecityList', controller.juheWeather.cityList);
  router.get('/api/wallpaper', controller.wallpaper.getWallpaper);
  router.get('/api/heweather', controller.heweather.weather);
  router.get('/api/heweather/city/top', controller.heweather.searchCityTop);
  router.get('/api/heweather/city/find', controller.heweather.searchCityFind);
}
