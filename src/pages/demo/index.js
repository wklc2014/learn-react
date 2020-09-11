import React, { Component } from 'react';
import propTypes from 'prop-types';
import WaterWaveDemo from '@components/water-wave/example/demo.js';
import HMenuDemo from '@components/hmenu/example/demo.js';

class Index extends Component {

  static defaultProps = {

  }

  render() {

    return (
      <div>
        <h2>Demo</h2>
        <HMenuDemo />
      </div>
    )
  }

}

Index.propTypes = {

}

export default Index;
