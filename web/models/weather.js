import API from '../services';
const {
  getCityList,
  getWeather
} = API.weather
export default {
  namespace: 'weather',
  state: {
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
