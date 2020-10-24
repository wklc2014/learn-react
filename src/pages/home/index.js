import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Button, Spin } from 'antd';
import hmodel from '@models/index.js';
import PageLearn from '@pages/home/learn.js';

@connect((state) => {
    const { car = {}, user = {}, loading = {} } = state;
    console.log('loading>>>', loading.global);
    return {
        count: user.count,
        address: user.address,
        app: car.app,
        loading: loading.global,
    };
})
class Home extends Component {

    static defaultProps = {
        count: 0,
        loading: false,
        app: 'null',
    }

    constructor(props) {
        super(props);
        this.state = {
            // count: 1,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
    }

    handleClick() {
        this.props.dispatch({
            type: 'user/addCount',
            payload: 2,
        })
    }

    handleFetch() {
        this.props.dispatch({
            type: 'user/fetch',
            payload: '北京',
        })
        // hmodel.actions.user.fetch('天津');
    }

    render() {
        const { count, app, loading, address } = this.props;
        // console.log('loading>>>', loading);
        return (
            <Spin spinning={loading}>
                <h2>Home</h2>
                <p>address: {address}</p>
                <p>app: {app}</p>
                <div className="mb16">
                    <Button onClick={this.handleClick}>{count}</Button>
                </div>
                <div className="mb16">
                    <Button onClick={this.handleFetch}>{app}</Button>
                </div>
                <PageLearn />
            </Spin>
        );
    }
}

Home.propTypes = {

}

export default Home;
