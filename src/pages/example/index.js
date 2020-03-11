import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button } from 'antd';
import List from './list.js';
import styles from './styles.less';

class Example extends Component {

  static defaultProps = {
    amount: 0,
    cityNames: [],
    loading: false,
  }

  handleAdd = () => {
    this.props.addAmount(3);
  }

  handleReduce = () => {
    this.props.reduceAmount(2);
  }

  handlegetAuthToken = () => {
    this.props.getAuthToken();
  }

  render() {
    const { amount, cityNames, loading } = this.props;

    return (
      <div>
        <h2>Example</h2>
        <p>{amount}</p>
        <div style={{ paddingBottom: 16 }}>
          <Button
            style={{ marginRight: 16 }}
            type="primary"
            onClick={this.handleAdd}
          >
             + add
          </Button>
          <Button
            style={{ marginRight: 16 }}
            type="primary"
            onClick={this.handleReduce}
          >
            - reduce
          </Button>
          <Button
            style={{ marginRight: 16 }}
            type="primary"
            loading={loading} onClick={this.handlegetAuthToken}> Get </Button>
        </div>
        <List
          options={{
            spinning: false,
            containerCls: styles.list,
            containerStyle: {},
          }}
          list={cityNames}
        />
      </div>
    )
  }

}

Example.propTypes = {
  amount: propTypes.number,
  cityNames: propTypes.array,
  loading: propTypes.bool,
}

export default Example;