import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Icon } from 'antd'
import styles from './index.module.less';
import LeftContent from './components/LeftContent';
import Infor from './components/Infor';

class Home extends Component {
  static getInitialProps = async ({ store }) => {
    await store.dispatch({ type: 'weather/getWeather' })
    await store.dispatch({ type: 'weather/getWallpaper' })
  }

  searchInputOnChange = e => {
    const { value } = e.target;
    const { dispatch } = this.props
    dispatch({
      type: 'weather/updateState',
      payload: {
        searchInput: value
      }
    })
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
          {/* <Row>
            <Col span={16} className={styles.leftContent}> 
              <div className={styles.search}>
                <Row gutter={16}>
                  <Col span={10}>
                    <Input
                      allowClear
                      prefix={<Icon style={{ fontSize: 20, color: 'rgba(0,0,0,.25)' }} type="search" />}
                      placeholder="输入城市名"
                      size='large'
                      value={searchInput}
                      onChange={this.searchInputOnChange}
                      onPressEnter={this.searchInputOnPressEnter}
                      style={{
                        height: 60,
                        borderRadius: '8px'
                      }}
                    />
                  </Col>
                </Row>
              </div>
              <LeftContent {...this.props} />
            </Col>
          </Row> */}
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
  currentCity: weather.currentCity || '杭州',
  forecast: weather.forecast || [],
  now: weather.now || {}
}))(Home);
