import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Popconfirm, Button, message, Table } from 'antd';
import withModal from '../with-modal.js';
import withDrawer from '../with-drawer.js';

class Edit extends Component {
    render() {
        const { count } = this.props;
        return (
            <div>
                <h1>Edit</h1>
                <Button onClick={() => this.props.dispatch({
                    type: 'user/addCount',
                    payload: 2
                })}>{count}</Button>
            </div>
        );
    }
}

class View extends Component {
    render() {
        const { count } = this.props;
        return (
            <div>
                <h1>View</h1>
                <Button>{count}</Button>
            </div>
        );
    }
}

class Delete extends Component {
    render() {
        const { count } = this.props;
        return (
            <div>
                <h1>Delete</h1>
                <Button>{count}</Button>
            </div>
        );
    }
}

@connect((state) => {
    const { car = {}, user = {}, loading = {} } = state;
    return {
        count: user.count,
    };
})
@withModal(Edit, { title: '编辑', name: 'edit' })
@withDrawer(View, { title: '查看', name: 'view' })
@withModal(Delete, { title: '删除', name: 'delete' })
class Demo extends Component {

    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleView = this.handleView.bind(this);
    }

    handleConfirm(e) {
        this.props.onShow(() => {
            // message.success('Click on Yes');
        });
    }

    handleCancel(e) {
        message.error('Click on No');
    }

    handleView() {

    }

    render() {

        const dataSource = [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                render: (text, record) => {
                    return (
                        <div>
                            <span className="mr16">
                                <Button onClick={this.props.onShowEdit}>编辑</Button>
                            </span>
                            <span className="mr16">
                                <Button onClick={this.props.onShowDelete}>删除</Button>
                            </span>
                            <span>
                                <Button onClick={this.props.onShowView}>查看</Button>
                            </span>
                        </div>
                    );
                }
            },
        ];

        return <Table bordered dataSource={dataSource} columns={columns} />;
    }
}

export default Demo;
