import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import WaterWaveDemo from '@components/water-wave/demo/demo.js';
import HMenuDemo from '@components/hmenu/demo/demo.js';
import CopyDemo from '@components/common/copy/index.js';
import HFormDemo from '@components/hform/demo/demo.js';
import WithModalDemo from '@components/with-hoc/demo/demo.js';

class Index extends Component {

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleShow() {
        // console.log('arguments>>>', arguments);
    }

    handleAdd() {
        // this.props.dispatch({ type: 'user/addCount', payload: 1 })
    }

    render() {

        return (
            <div>
                <h2>Demo</h2>
                <WithModalDemo
                />
            </div>
        )
    }
}

Index.propTypes = {

}

export default Index;
