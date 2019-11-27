import React from 'react';
import { Icon, Typography, Spin, Card } from 'antd';
import weatherIcon from '@/config/weatherIcon';
import styles from './index.module.less';

const { Title } = Typography;
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1461308_u9kzjfbwsu.js',
});
const gridStyle = {
  width: '20%',
  textAlign: 'center',
  boxShadow: 'none',
  padding: '8px'
};
const LeftContent = ({inforLoading, currentCity, future=[],}) => (
 	<>
		<Title style={{ color: '#100E3C' }}>
			{currentCity}-未来五天天气
		</Title>
		<Card
			style={{ background: 'none' }}
			bodyStyle={{ padding: 0, margin: '-8px' }}
			bordered={false}
			>
			<Spin
				className={styles.LoadingLeft}
				size='large'
				spinning={inforLoading}
				delay={100}
				tip="加载数据中..."
				>
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
 	</>
)

export default LeftContent;