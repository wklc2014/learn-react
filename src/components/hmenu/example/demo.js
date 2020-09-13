import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Form, Input, Button, Select, Radio, Checkbox } from 'antd';
import HMenu from '@components/hmenu/index.js';
import exampleConfigs from '@components/hmenu/example/example_config.js';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};
const { Option } = Select;

class Demo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuSelected: 'nest-b-2',
            menuKey: 'id',
            configs: exampleConfigs,
            mode: 'horizontal',
            theme: 'light',
            menuOpen: false,
            menuOpenSingle: false,
        }
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e });
    }

    handleUpdate = () => {
        const { configs } = this.state;
        const newConfigs = configs.map(val => {
            const item = { ...val };
            if (item.id === 'example') {
                item.name = "一家人";
            }
            return item;
        })
        this.setState({ configs: newConfigs });
    }

    render() {
        const { menuSelected, menuKey, configs, mode, theme, menuOpen, menuOpenSingle } = this.state;

        return (
            <div style={{ marginBottom: 40 }}>
                <Form className="mb16" {...layout}>
                    <Form.Item label="高亮菜单">
                        <Input
                            placeholder="请输入菜单类型"
                            value={menuSelected}
                            onChange={(e) => this.handleChange(e.target.value, 'menuSelected')}
                        />
                    </Form.Item>
                    <Form.Item label="菜单类型">
                        <Select
                            placeholder="请选择菜单类型"
                            onChange={(e) => this.handleChange(e, 'mode')}
                            value={mode}
                            allowClear
                        >
                          <Option value="vertical">vertical</Option>
                          <Option value="horizontal">horizontal</Option>
                          <Option value="inline">inline</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="主题颜色">
                        <Select
                            placeholder="请选择主题颜色"
                            onChange={(e) => this.handleChange(e, 'theme')}
                            value={theme}
                            allowClear
                        >
                          <Option value="light">light</Option>
                          <Option value="dark">dark</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Checkbox
                            checked={menuOpenSingle}
                            onChange={(e) => this.handleChange(e.target.checked, 'menuOpenSingle')}
                        >
                            同级只打开一个菜单
                        </Checkbox>
                    </Form.Item>
                </Form>
                <div style={{ width: (mode !== 'horizontal' ? '220px' : '100%') }}>
                    <HMenu
                        configs={configs}
                        menuSelected={menuSelected}
                        menuKey={menuKey}
                        isLink={false}
                        menuKey="id"
                        menuOpenSingle={menuOpenSingle}
                        menuApi={{
                            mode,
                            theme,
                            selectable: false,
                            onClick: (e) => {
                                this.setState({ menuSelected: e.key });
                            },
                            triggerSubMenuAction: 'click',
                        }}
                    />
                </div>
            </div>
        )
    }
}

Demo.propTypes = {

}

Demo.defaultProps = {

}

export default Demo;
