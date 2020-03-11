/**
 * 导航组件
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import navConfigs from '../common/nav-config.js';

class LayoutNav extends Component {

  static defaultProps = {

  }

  renderElements = () => {
    return navConfigs.map((v, i) => {
      const key = `nav-${i}`;
      const { path, name } = v;
      return (
        <li className="nav-item" key={key}>
          <Link to={path}>{name}</Link>
        </li>
      );
    })
  }

  render() {
    return (
      <div className="layout-nav">
        <ul className="nav-box">
          {this.renderElements()}
        </ul>
      </div>
    )
  }

}

LayoutNav.propTypes = {

}

export default LayoutNav;
