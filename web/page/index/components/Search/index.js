import React, { Component } from 'react';
import { Icon, Button, Input, AutoComplete  } from 'antd';
import styles from './index.module.less';

const { Option, OptGroup } = AutoComplete;

class Search extends Component {

  onChange = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'weather/updateState',
      payload: {
        searchInput: value
      }
    })
    if(value === ''){
      dispatch({
        type: 'weather/getSearchCityTop'
      })
    }else{
      dispatch({
        type: 'weather/getSearchCityFind',
        payload: {
          location: value
        }
      })
    }
  };

  onSelect = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'weather/getWeather',
      payload: {
        city: value
      }
    })
  }

  render() {
    const { searchInput, searchCitys } = this.props
    const renderTitle = title => {
      return (
        <span>
          {title}
        </span>
      );
    }
    const options = searchCitys
      .map(group => (
        <OptGroup key={group.title} label={renderTitle(group.title)}>
          {group.children.map(opt => (
            <Option key={`${opt.location},${opt.parent_city}`} value={`${opt.location},${opt.parent_city}`}>
              {`${opt.location}-${opt.parent_city}`}
            </Option>
          ))}
        </OptGroup>
      ))
    return (
      <div className={styles.searchWrapper}>
        <AutoComplete
          className={styles.search}
          size="large"
          value={searchInput}
          dataSource={options}
          onChange={this.onChange}
          onSelect={this.onSelect}
          placeholder="输入搜索城市"
          optionLabelProp="value"
          dropdownClassName="searchDropdown"
        >
          <Input
            suffix={
              <Button
                className={styles.searchBtn}
                style={{ marginRight: -12 }}
                size="large"
                type="primary"
              >
                <Icon type="search" />
              </Button>
            }
          />
        </AutoComplete>
      </div>
    );
  }
}

export default Search;