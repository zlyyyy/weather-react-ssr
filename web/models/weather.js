import API from '../services';
const {
  getWeather
} = API.weather
export default {
  namespace: 'weather',
  state: {
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
