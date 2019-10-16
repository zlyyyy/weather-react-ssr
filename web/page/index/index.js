import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Input, Icon, Typography } from 'antd'
import styles from './index.module.less'
import weatherIcon from '@/config/weatherIcon'
import moment from 'moment'

const { Title } = Typography;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1461308_thhja2yiw2.js',
});

class Home extends Component {
  static getInitialProps = async ({ store }) => {
    await store.dispatch({ type: 'weather/getWeather' })
    await store.dispatch({ type: 'weather/getCityList' })
  }

  searchInputOnChange = e => {
    const { value } = e.target;
    const { dispatch } = this.props
    dispatch({
      type: 'weather/updateSearchInput',
      payload: {
        searchInput: value
      }
    })
  }

  // fomatDisplayRender = (label, selectedOptions) => {
  //   return label[`${label.length - 1}`]
  // }
  // onChange(value) {
  //   console.log(value);
  // }
  render () {
    const {
      currentCity,
      searchInput,
      realtime:{
        temperature,
        humidity,
        info,
        wid,
        direct,
        power,
        aqi
      }={}
    } = this.props
    return (
      <div className={styles.container}>
        <Row>
          <Col span={16} className={styles.leftContent}> 
            <div className={styles.search}>
              <Row gutter={16}>
                <Col span={16}>
                  <Input
                    prefix={<Icon style={{ fontSize: 20, color: 'rgba(0,0,0,.25)' }} type="search" />}
                    placeholder="输入城市名"
                    size='large'
                    value={searchInput}
                    onChange={this.searchInputOnChange}
                    style={{
                      height: 60,
                      borderRadius: '8px'
                    }}
                  />
                </Col>
                <Col span={6}>
                  {/* <Cascader
                    allowClear={false}
                    size='large'
                    style={{
                      width: 80,
                      height: 60,
                      border: 'none'
                    }}
                    placeholder='地区'
                    changeOnSelect
                    options={options}
                    displayRender={this.fomatDisplayRender}
                    onChange={() => this.onChange}
                  /> */}
                </Col>
              </Row>
            </div>
            <Title>{currentCity}</Title>
          </Col>
          <Col span={8} className={styles.infor}>
            <div className={styles.dateContent}>
              <div className={styles.weatherIcon}>
                <IconFont type={weatherIcon[info]} />
              </div>
              <div className={styles.dateInfor}>
                <div className={styles.today}>Today</div>
                <div className={styles.date}>{moment().format('LL')}</div>
              </div>
            </div>
            <div className={styles.temperature}>
              {temperature}
              <span className={styles.unit}>℃</span>
            </div>
            <div className={styles.area}>
              {currentCity}
            </div>
            <ul className={styles.other}>
              <li className={styles.otherItem}>湿度：{humidity}</li>
              <li className={styles.otherItem}>风向：{direct}</li>
              <li className={styles.otherItem}>风力：{power}</li>
              <li className={styles.otherItem}>空气质量指数：{aqi}</li>
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({ weather }) => ({
  searchInput: weather.searchInput || '',
  currentCity: weather.currentCity || '杭州',
  realtime: weather.realtime || {}
}))(Home);
