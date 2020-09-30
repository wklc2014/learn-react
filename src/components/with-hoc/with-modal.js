/**
 * Modal 高阶组件
 */
import React, { Component, Fragment } from 'react';
import { Modal } from 'antd';

export default function withModal(ContentComponent, params = {}) {

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
                this.handleOk = this.handleOk.bind(this);
                this.handleCancel = this.handleCancel.bind(this);
                this.handleShow = this.handleShow.bind(this);
                this.handleHidden = this.handleHidden.bind(this);
            }

            changeState(value, callback) {
                this.setState({ [stateKey]: value }, callback);
            }

            handleOk(callback) {
                this.changeState(false, () => {
                    if (typeof callback === 'function') {
                        callback(true);
                    }
                });
            }

            handleCancel(callback) {
                this.changeState(false, () => {
                    if (typeof callback === 'function') {
                        callback(false);
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

                const ModalProps = {
                    title: 'Modal Title',
                    ...restParams,
                    ...api,
                    visible: show,
                    onOk: this.handleOk,
                    onCancel: this.handleCancel,
                }

                return (
                    <Fragment>
                        <WrappedComponent {...CommonProps} />
                        <Modal {...ModalProps}>
                            <ContentComponent {...CommonProps} />
                        </Modal>
                    </Fragment>
                )
            }
        }
    }
}
