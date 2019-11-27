import React from 'react';
import { Icon } from 'antd';
import weatherIcon from '@/config/weatherIcon';
import Future from './future';
import moment from 'moment';
import styles from './index.module.less';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1461308_u9kzjfbwsu.js',
});
const Infor = (
  {
    inforLoading,
    currentCity,
    now: {
      // 云量
      cloud,
      // 实况天气状况代码
      cond_code,
      // 实况天气状况描述
      cond_txt,
      // 	体感温度，默认单位：摄氏度
      fl,
      // 相对湿度
      hum,
      // 降水量
      pcpn,
      // 大气压强
      pres,
      // 温度，默认单位：摄氏度
      tmp,
      // 能见度，默认单位：公里
      vis,
      // 风向360角度
      wind_deg,
      // 风向
      wind_dir,
      // 风力
      wind_sc,
      // 风速，公里/小时
      wind_spd
    } = {},
    forecast=[]
  }
  ) => (
  <div className={styles.infor}>
      {
        inforLoading?
        <div className={styles.Loading}>Loading...</div>:
        <div className={styles.inforContent}>
          <div className={styles.temperature}>
            {tmp}
            <span className={styles.unit}>℃</span>
          </div>
          <div className={styles.dateContent}>
            <div className={styles.dateInfor}>
              <div className={styles.today}>
                Today - - {cond_txt}
                <div className={styles.weatherIcon}>
                  {
                    weatherIcon[cond_txt]?
                    <IconFont type={weatherIcon[cond_txt]} style={{color: '#fff'}} />: <span style={{ color: '#fff' }}>{cond_txt}</span>
                  }
                </div>
              </div>
              <div className={styles.date}>{moment().format('LL')}</div>
            </div>
            <div className={styles.area}>
              {currentCity}
            </div>
          </div>
          <ul className={styles.other}>
            <li className={styles.otherItem}>相对湿度：{hum}</li>
            <li className={styles.otherItem}>风向：{wind_dir}</li>
            <li className={styles.otherItem}>风力：{wind_sc}级</li>
            <li className={styles.otherItem}>能见度：{vis}公里</li>
          </ul>
          <Future inforLoading={inforLoading} forecast={forecast}  />
        </div>
      }
  </div>
)

export default Infor;