import React, { Component } from 'react';
import { Icon, Button, Input, AutoComplete  } from 'antd';
import styles from './index.module.less';

const { Option } = AutoComplete;

class Search extends Component {
  state = {
    value: '',
    dataSource: ['213','123'],
  };

  onSearch = searchText => {
    this.setState({
      dataSource: !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)],
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  onSelect = value => {
    console.log('onSelect', value);
  }

  render() {
    const { dataSource } = this.state
    return (
      <div className={styles.searchWrapper}>
        <AutoComplete
          className={styles.search}
          size="large"
          dataSource={dataSource}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="输入搜索城市"
          optionLabelProp="text"
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