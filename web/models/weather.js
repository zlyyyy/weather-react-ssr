import API from '../services';
const {
  getWeather
} = API.weather
export default {
  namespace: 'weather',
  state: {
    data: []
  },
  reducers: {
    init (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    * getWeather ({ payload }, { call, put }) {
      const data = yield call(getWeather)
      console.log(data)
      yield put({
        type: 'init',
        payload: {
          data
        }
      })
    }
  }

}
