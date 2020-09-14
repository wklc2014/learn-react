import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

class Home extends Component {

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleIncrease() {
    this.props.increase(1);
  }

  handleDecrease() {
    this.props.decrease(1);
  }

  render() {
    const { count } = this.props;

    return (
      <div>
        <h2>Home</h2>
        <p>{count}</p>
        <div>
          <Button className="mr16" onClick={this.handleIncrease}>+</Button>
          <Button onClick={this.handleDecrease}>-</Button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {

}

export default Home;
