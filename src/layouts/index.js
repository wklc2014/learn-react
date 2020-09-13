/**
 * 主体布局组件
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from "react-router-dom";
import HMenu from '@components/hmenu/index.js';
import navConfigs from '@layouts/common/nav-config.js';
import LayoutRoute from '@layouts/components/routes.js';
import styles from '@layouts/index.less';

const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends Component {

    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
      }
      this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse() {
        const { collapsed } = this.state;
        this.setState({ collapsed: !collapsed });
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className={styles.logo}>React</div>
                    <HMenu
                        configs={navConfigs}
                        menuSelected={location.pathname}
                        menuApi={{
                            theme: 'dark',
                            mode: 'inline',
                        }}
                    />
                </Sider>
                <Layout className={styles.contentBox}>
                    <Content className={styles.content}>
                        <LayoutRoute />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(MainLayout);
