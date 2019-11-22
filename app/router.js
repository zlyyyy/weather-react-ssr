'use strict'

const config = require('../config/config.ssr')

module.exports = app => {
  const { router, controller } = app
  config.routes.map(route => {
    router.get(`${route.path}`, controller[route.controller][route.handler])
  })
  router.get('/api/wallpaper', controller.api.wallpaper);
  router.get('/api/weather', controller.api.weather);
  router.get('/api/cityList', controller.api.cityList);
}
