import API from '../services';
const {
  getWallpaper,
  getCityList,
  getWeather
} = API.weather
export default {
  namespace: 'weather',
  state: {
    url: '',
    copyright: '',
    city: [],
    searchCitys: [],
    currentCity: '杭州',
    searchInput: '',
    realtime: {},
    future: [],
    data: []
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
      console.log(res)
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
      console.log(res)
      yield put({
        type: 'update',
        payload: {
          url,
          copyright
        }
      })
    },
    *getCityList ({ payload }, { call, put }) {
      const res = yield call(getCityList)
      const {
        result=[]
      } = res
      console.log(res)
      yield put({
        type: 'update',
        payload: {
          city: result
        }
      })
    },
    *getWeather ({ payload={} }, { call, put }) {
      const { city='杭州' } = payload
      const res = yield call(getWeather, {
          city
        }
      )
      console.log(res)
      const {
        result:{
          city: currentCity,
          realtime,
          future
        }={}
      } = res
      yield put({
        type: 'update',
        payload: {
          currentCity,
          realtime,
          future
        }
      })
    }
  }
}
