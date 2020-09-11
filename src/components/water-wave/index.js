import React, { Component } from 'react';
import propTypes from 'prop-types';
import is from 'is_js';
import WaterWave from './utils/water-wave.js';

class Index extends Component {

  static defaultProps = {
    width: 200,
    height: 200,
    value: 50,
    options: {},
    style: {},
    render: null,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.isDrawContainer = false;
  }

  componentDidMount() {
    const canvas = this.getCanvas();
    const options = this.getWaterWaveOptions(this.props);
    this.WaterWave = new WaterWave(canvas, options);
    this.WaterWave.update();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.WaterWave) {
      const options = this.getWaterWaveOptions(nextProps);
      this.WaterWave.init(options);
      this.WaterWave.update();
    }
  }

  getCanvas = () => {
    return this.canvas;
  }

  getWaterWaveOptions = (props) => {
    const { width, height, value, options } = props;
    return {
      ...options,
      canvasWidth: width,
      canvasHeight: height,
      targetValue: value,
    }
  }

  renderTextEle = () => {
    const { width, style, value, render } = this.props;
    const textHeight = 40;
    const divStyle = {
      color: '#975fe4',
      fontSize: 30,
      paddingTop: (width - textHeight) / 2,
      textAlign: 'center',
      height: textHeight + (width - textHeight) / 2,
      lineHeight: `${textHeight}px`,
      ...style,
    }
    if (is.function(render)) {
      return render(value);
    }
    return <div style={divStyle}>{`${value}%`}</div>;
  }

  render() {
    const { width, height } = this.props;
    const boxStyle = {
      position: 'relative',
      width,
      height,
    }
    const valueStyle = {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    return (
      <div style={boxStyle}>
        <div style={valueStyle}>{this.renderTextEle()}</div>
        <canvas ref={node => this.canvas = node} style={{ position: 'relative', zIndex: 1 }}></canvas>
      </div>
    );
  }
}

Index.propTypes = {
  color: propTypes.any,
  width: propTypes.number,
  height: propTypes.number,
}

export default Index;
