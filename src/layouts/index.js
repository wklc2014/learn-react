/**
 * 主体布局组件
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router } from "react-router-dom";
import store from '../models/stores/index.js';
import LayoutNav from './components/layout-nav.js';
import LayoutRoute from './components/layout-route.js';

class MainLayout extends Component {

  static defaultProps = {

  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <LayoutNav />
          <LayoutRoute />
        </Router>
      </Provider>
    )
  }
}

MainLayout.propTypes = {

}

export default MainLayout;
