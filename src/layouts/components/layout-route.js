/**
 * 路由组件
 */
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from '../../pages/home/index.js';
import Help from '../../pages/help/index.js';
import Simple from '../../pages/simple/index.js';
import Example from '../../pages/example/index-container.js';

class LayoutRoute extends Component {

  static defaultProps = {

  }

  render() {

    return (
      <div className="layout-route">
        <Route path="/" exact component={Home} />
        <Route path="/help" component={Help} />
        <Route path="/simple" component={Simple} />
        <Route path="/example" component={Example} />
      </div>
    )
  }
}

LayoutRoute.propTypes = {

}

export default LayoutRoute;
