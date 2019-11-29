import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import Search from './components/Search';
import Infor from './components/Infor';

class Home extends Component {
  static getInitialProps = async ({ store }) => {
    await store.dispatch({ type: 'weather/getWeather' })
    await store.dispatch({ type: 'weather/getWallpaper' })
    await store.dispatch({ type: 'weather/getSearchCityTop' })
  }

  searchInputOnPressEnter = e => {
    const { value } = e.target;
    const { dispatch } = this.props
    dispatch({
      type: 'weather/getWeather',
      payload: {
        city: value
      }
    })
  }

  render () {
    const {
      url,
      copyright,
      searchInput
    } = this.props
    const containerStyle = {
      background: `url(${url}) 50% 50% / cover`
    }
    return (
      <div className={styles.main} style={containerStyle}>
        <div className={styles.container}>
          <Search {...this.props} />
          <Infor {...this.props} />
        </div>
        <div className={styles.copyright}>
          Photo by&nbsp;
          <a href={`${copyright.link}`} target="_blank">
						{copyright.name}
          </a>
        </div>
      </div>
    )
  }
}

export default connect(({ weather, loading }) => ({
  inforLoading: loading.effects['weather/getWeather'],
  url: weather.url || '',
  copyright: weather.copyright || '',
  city: weather.city || [],
  searchInput: weather.searchInput || '',
  searchCitys: weather.searchCitys || [],
  currentCity: weather.currentCity || '杭州',
  forecast: weather.forecast || [],
  now: weather.now || {}
}))(Home);
