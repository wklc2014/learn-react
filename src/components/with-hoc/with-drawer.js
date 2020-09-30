/**
 * Drawer 高阶组件
 */
import React, { Component, Fragment } from 'react';
import { Drawer } from 'antd';

export default function withDrawer(ContentComponent, params = {}) {

    const { name = '', ...restParams } = params;
    const stateKey = 'show-' + name;

    function getDisplayName(Component) {
        return Component.displayName || Component.name || 'Component';
    }

    function capitalize(str) {
        if (!str) return '';
        const first = str.charAt(0).toUpperCase();
        const last = str.substring(1);
        return first + last;
    }

    return function(WrappedComponent) {
        return class HOC extends Component {

            static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

            constructor(props) {
                super(props);
                this.state = {
                    [stateKey]: false,
                }
                this.changeState = this.changeState.bind(this);
                this.handleClose = this.handleClose.bind(this);
                this.handleShow = this.handleShow.bind(this);
                this.handleHidden = this.handleHidden.bind(this);
            }

            changeState(value, callback) {
                this.setState({ [stateKey]: value }, callback);
            }

            handleClose(callback) {
                this.changeState(false, () => {
                    if (typeof callback === 'function') {
                        callback(true);
                    }
                });
            }

            handleShow(callback) {
                this.changeState(true, () => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }

            handleHidden(callback) {
                this.changeState(false, () => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }

            render() {
                const { api, ...restProps } = this.props;
                const show = this.state[stateKey];
                const showKey = 'onShow' + capitalize(name);
                const hiddenKey = 'onHidden' + capitalize(name);

                const CommonProps = {
                    params: restParams,
                    ...restProps,
                    [stateKey]: show,
                    [showKey]: this.handleShow,
                    [hiddenKey]: this.handleHidden,
                }

                const DrawerProps = {
                    title: 'Drawer Title',
                    ...restParams,
                    ...api,
                    visible: show,
                    onClose: this.handleClose,
                }

                return (
                    <Fragment>
                        <WrappedComponent {...CommonProps} />
                        <Drawer {...DrawerProps}>
                            <ContentComponent {...CommonProps} />
                        </Drawer>
                    </Fragment>
                )
            }
        }
    }
}
