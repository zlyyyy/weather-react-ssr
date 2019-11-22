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
    // let appDiv = document.getElementById("app");
    // appDiv.style.background = `url("${this.props.weather.url}") 50% 50% / cover;`
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
      background: `url("${url}") 50% 50% / cover;`
    }
    // const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
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
                  {/* <Select
                  prefix={<Icon style={{ fontSize: 20, color: 'rgba(0,0,0,.25)' }} type="search" />}
                    showSearch
                    value={searchInput}
                    placeholder='请输入地区'
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    notFoundContent={null}
                  >
                    {options}
                  </Select> */}
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
            <Title style={{ color: '#100E3C' }}>{currentCity}-未来五天天气</Title>
            <Card style={{ background: 'none' }} bodyStyle={{ padding: 0, margin: '-8px' }} bordered={false}>
              <Spin className={styles.LoadingLeft} size='large' spinning={inforLoading} delay={100} tip="加载数据中...">
                {
                  Array.isArray(future)&&future.map(item =>(
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
