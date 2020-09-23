import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Button, Spin } from 'antd';
import mirror from '@components/mirror/index.js';

@connect((state) => {
    // console.log('home state>>>', state);
    return {
        count: state.user.count,
        app: state.car.app,
        loading: state.loading.global,
    };
})
class Home extends Component {

    static defaultProps = {
        count: 0,
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
            payload: '成都',
        })
    }

    render() {
        const { count, app, loading } = this.props;
        return (
            <Spin spinning={loading}>
                <h2>Home</h2>
                <div className="mb16">
                    <Button onClick={this.handleClick}>{count}</Button>
                </div>
                <div>
                    <Button onClick={this.handleFetch}>{app}</Button>
                </div>
            </Spin>
        );
    }
}

Home.propTypes = {

}

export default Home;
