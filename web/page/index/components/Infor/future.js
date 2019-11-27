import React from 'react';
import { Icon } from 'antd';
import weatherIcon from '@/config/weatherIcon';
import styles from './index.module.less';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1461308_u9kzjfbwsu.js',
});
const Future = (
  {
    inforLoading,
    forecast=[]    
  }) => (
  <div className={styles.Future}>
    {
      !inforLoading&&Array.isArray(forecast)&&forecast.map(item =>(
        <div className={styles.futureItem} key={item.date}>
          <div className={styles.futureDate}>
            {item.date.slice(5)}
          </div>
          <div className={styles.futureWeather} title={item.weather}>
            {
              weatherIcon[item.cond_txt_d]?
              <IconFont type={weatherIcon[item.cond_txt_d]} />:
              <span
                style={{
                  color: '#100E3C',
                  fontSize: '16px'
                }}>
                {item.cond_txt_d}
              </span>
            }
          </div>
          <div className={styles.futureTemperatureMax}>
            {item.tmp_max}
          </div>
          <div className={styles.futureTemperatureMin}>
            {item.tmp_min}
          </div>
        </div>
      ))
    }
  </div>
)

export default Future;