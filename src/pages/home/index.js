import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import mirror from '@components/mirror/index.js';

@connect((state) => {
    console.log('home state>>>', state);
    return {
        count: state.user.count,
        app: state.car.app,
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
        const { count, app } = this.props;
        return (
            <div>
                <h2>Home</h2>
                <div className="mb16">
                    <Button onClick={this.handleClick}>{count}</Button>
                </div>
                <div>
                    <Button onClick={this.handleFetch}>{app}</Button>
                </div>
            </div>
        );
    }
}

Home.propTypes = {

}

export default Home;
