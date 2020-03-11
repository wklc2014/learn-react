import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

class Home extends Component {

  static defaultProps = {

  }

  currentUrl = window.location.href;

  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1,
    })
  }
  componentDidMount() {
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <h2>Home</h2>
        <div>
          <Button onClick={this.handleClick}>{count}</Button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {

}

export default withRouter(Home);
