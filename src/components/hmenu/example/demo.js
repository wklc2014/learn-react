import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Input, Button } from 'antd';
import HMenu from '@components/hmenu/index.js';
import exampleConfigs from '@components/hmenu/example/example_config.js';

class Demo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuActive: 'nest-b-2',
            menuKey: 'id',
            configs: exampleConfigs,
        }
    }

    handleChange = (e, key) => {
        this.setState({ [key]: e.target.value });
    }

    handleClick = () => {
        const { configs } = this.state;
        const newConfigs = configs.map(val => {
            const item = {...val};
            if (item.id === 'example') {
                item.name = "一家人";
            }
            return item;
        })
        this.setState({ configs: newConfigs });
    }

    render() {
        const { menuActive, menuKey, configs } = this.state;

        return (
            <div>
                <div style={{ marginBottom: 40 }}>
                    <HMenu
                        configs={configs}
                        menuActive={menuActive}
                        menuKey={menuKey}
                        isLink={false}
                        menuOpen={false}
                        menuKey="id"
                        menuOpenSingle={true}
                        menuApi={{
                            mode: 'horizontal',
                            // mode: 'inline',
                            selectable: false,
                            onClick: (e) => {
                                this.setState({ menuActive: e.key });
                            },
                            triggerSubMenuAction: 'click',
                        }}
                    />
                </div>
                <div className="mb16">
                    <Input
                        style={{ width: 200 }}
                        value={menuActive}
                        onChange={(e) => this.handleChange(e, 'menuActive')}
                    />
                </div>
                <div className="mb16">
                    <Button onClick={this.handleClick}>设置</Button>
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
