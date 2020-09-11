import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Input, Button } from 'antd';
import HMenu from '@components/hmenu/index.js';
import configs from '@components/hmenu/example/example_config.js';

class Demo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuActive: 'nest-b-2',
            menuKey: 'id',
        }
    }

    handleChange = (e, key) => {
        this.setState({ [key]: e.target.value });
    }

    render() {
        const { menuActive, menuKey } = this.state;

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
                        menuSingleOpen={true}
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
                <Input
                    style={{ width: 200 }}
                    value={menuActive}
                    onChange={(e) => this.handleChange(e, 'menuActive')}
                />
            </div>
        )
    }
}

Demo.propTypes = {

}

Demo.defaultProps = {

}

export default Demo;
