import React, { Component } from 'react';
import propTypes from 'prop-types';
import WaterWaveDemo from '@components/water-wave/example/demo.js';
import HMenuDemo from '@components/hmenu/example/demo.js';
import CopyDemo from '@components/common/copy/index.js';
import HFormDemo from '@components/hform/example/demo.js';

class Index extends Component {

  static defaultProps = {

  }

  render() {

    return (
      <div>
        <h2>Demo</h2>
        <HFormDemo />
      </div>
    )
  }

}

Index.propTypes = {

}

export default Index;
