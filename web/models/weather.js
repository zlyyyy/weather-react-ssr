import API from '../services';
const {
  getCityList,
  getWeather
} = API.weather
export default {
  namespace: 'weather',
  state: {
    cisy: [],
    currentCity: '杭州',
    searchInput: '',
    realtime: {},
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
    *updateSearchInput ({ payload }, {call, put}) {
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
          city: []
        }
      })
    },
    *getWeather ({ payload }, { call, put }) {
      const res = yield call(getWeather)
      const {
        result:{
          realtime
        }={}
      } = res
      yield put({
        type: 'update',
        payload: {
          realtime
        }
      })
    }
  }

}
