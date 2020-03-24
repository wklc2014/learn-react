import React, { Component } from 'react';
import { Button } from 'antd';
import SiteWaterWave from '../index.js';

class SiteWaterWaveDemo extends Component {

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      amount: 30,
    }
  }

  handleClick = () => {
    const value = Math.round(Math.random() * 80);
    this.setState({
      amount: Math.min(Math.max(value, 20), 80),
    })
  }

  renderText = () => {
    const { amount } = this.state;
    return (
      <div style={{ textAlign: 'center', paddingTop: 50, fontSize: 14 }}>
        <div>现场资源健康度</div>
        <div style={{ fontSize: 40 }}>{amount / 100}</div>
      </div>
    )
  }

  render() {
    const { amount } = this.state;

    return (
      <div>
        <Button onClick={this.handleClick} type="primary">变化</Button>
        <SiteWaterWave value={amount} />
      </div>
    )
  }

}

SiteWaterWaveDemo.propTypes = {

}

export default SiteWaterWaveDemo;