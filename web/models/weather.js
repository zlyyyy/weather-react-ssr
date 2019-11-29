import API from '../services';
const {
  getWallpaper,
  getSearchCityTop,
  getSearchCityFind,
  getWeather
} = API.weather
export default {
  namespace: 'weather',
  state: {
    url: '',
    copyright: '',
    searchCitys: [],
    currentCity: '杭州',
    searchInput: '',
    now: {},
    forecast: [],
    lifestyle: []
  },
  reducers: {
    update (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *updateState ({ payload }, {call, put}) {
      yield put({
        type: 'update',
        payload
      })
    },
    *getWallpaper ({ payload }, { call, put }) {
      const res= yield call(getWallpaper)
      const data = res.data[0]
      let url
      let copyright
      if (res.type === 'bing') {
        url = /\.com/.test(data.url) ? data.url : 'https://cn.bing.com' + data.url
        copyright = {
          name: 'Bing',
          link: /\.com/.test(data.copyrightlink)
            ? data.copyrightlink : 'https://cn.bing.com' + data.copyrightlink
        }
      } else { // unsplash
        url = data.urls.raw + '?w=2200'
        copyright = {
          name: data.user.name,
          profileImage: data.user.profile_image.small,
          link: data.user.links.html
        }
      }
      yield put({
        type: 'update',
        payload: {
          url,
          copyright
        }
      })
    },
    *getSearchCityTop (_, { call, put }) {
      // const { searchInput } = yield select(({ weather }) => ({
      //   searchInput: weather.searchInput
      // }))
      const res = yield call(getSearchCityTop,{
        group: 'cn'
      })
      const {
        basic=[]
      } = res
      const searchCitys = [
        {
          title: '热门城市',
          children: basic
        }
      ]
      yield put({
        type: 'update',
        payload: {
          searchCitys
        }
      })
    },
    *getSearchCityFind ({ payload }, { call, put }) {
      const { location } = payload
      const res = yield call(getSearchCityFind,{
        group: 'cn',
        location
      })
      const {
        basic=[]
      } = res
      const searchCitys = [
        {
          title: '猜你要搜',
          children: basic
        }
      ]
      yield put({
        type: 'update',
        payload: {
          searchCitys
        }
      })
    },
    *getWeather ({ payload={} }, { call, put }) {
      const { city='杭州' } = payload
      const res = yield call(getWeather, {
          location: city
        }
      )
      const { basic, now, daily_forecast, lifestyle } = res
      yield put({
        type: 'update',
        payload: {
          currentCity: basic.location,
          now,
          forecast: daily_forecast,
          lifestyle
        }
      })
    }
  }
}
