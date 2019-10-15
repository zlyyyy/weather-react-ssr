import React, { Component } from 'react'
import { connect } from 'dva'
import { DatePicker } from 'antd'
import './index.less'
import { Link } from 'react-router-dom'

class Home extends Component {
  render () {
    const {news} = this.props
    return (
      <div className='normal'>
      <div className='welcome' />
      {/* <ul className='list'>
        {
          news && news.map(item => (
            <li key={item.id}>
              <div>文章标题: {item.title}</div>
              <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
            </li>
          ))
        }
      </ul> */}
      <DatePicker />
    </div>
    )
  }
}

Home.getInitialProps = async ({ store }) => {
  await store.dispatch({ type: 'weather/getWeather' })
}

export default connect(({ weather }) => ({
  news: weather.news
}))(Home);
