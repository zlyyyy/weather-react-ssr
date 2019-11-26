import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Input, Icon, Typography, Spin, Card } from 'antd'
import styles from './index.module.less'
import weatherIcon from '@/config/weatherIcon'
import moment from 'moment'

const { Title } = Typography;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1461308_u9kzjfbwsu.js',
});

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
      inforLoading,
      url,
      copyright,
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
      }={},
      future=[]
    } = this.props
    const gridStyle = {
      width: '20%',
      textAlign: 'center',
      boxShadow: 'none',
      padding: '8px'
    };
    const containerStyle = {
      background: `url(${url}) 50% 50% / cover`
    }
    return (
      <div className={styles.main} style={containerStyle}>
        <div className={styles.container}>
          <Row>
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
              <Title style={{ color: '#100E3C' }}>{currentCity}-未来五天天气</Title>
              <Card style={{ background: 'none' }} bodyStyle={{ padding: 0, margin: '-8px' }} bordered={false}>
                <Spin className={styles.LoadingLeft} size='large' spinning={inforLoading} delay={100} tip="加载数据中...">
                  {
                    !inforLoading&&Array.isArray(future)&&future.map(item =>(
                      <Card.Grid style={gridStyle} key={item.date}>
                        <div
                          className={styles.futureContent}>
                            <div className={styles.futureDate}>
                              {item.date}
                            </div>
                            <div className={styles.futureWeather} title={item.weather}>
                              {
                                weatherIcon[item.weather]?
                                <IconFont type={weatherIcon[item.weather]} />:
                                <span
                                  style={{
                                    color: '#100E3C',
                                    fontSize: '16px'
                                  }}>
                                  {item.weather}
                                </span>
                              }
                            </div>
                            <div className={styles.futureTemperature}>
                              {item.temperature}
                            </div>
                            <div className={styles.futureDirect}>
                              {item.direct}
                            </div>
                        </div>
                      </Card.Grid>
                    ))
                  }
                </Spin>
              </Card>
            </Col>
            <Col span={8} className={styles.infor}>
              <Spin size='large' spinning={inforLoading} delay={100} tip="加载数据中...">
                {
                  !inforLoading&&<div className={styles.inforContent}>
                    <div className={styles.dateContent}>
                      <div className={styles.weatherIcon}>
                        {
                          weatherIcon[info]?
                          <IconFont type={weatherIcon[info]} />: <span style={{ color: '#fff' }}>{info}</span>
                        }
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
                  </div>
                }
                
              </Spin>
            </Col>
          </Row>
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
  future: weather.future || [],
  realtime: weather.realtime || {}
}))(Home);
