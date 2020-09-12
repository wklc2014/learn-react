/**
 * 菜单导航
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import { pathToRegexp } from 'path-to-regexp';
import { Menu } from 'antd';

const { SubMenu } = Menu;

class HMenu extends Component {

    static defaultProps = {
        configs: [],
        isLink: true,
        menuApi: {},
        menuOpenSingle: true,
        menuOpen: true,
        menuActive: '',
        menuKey: 'path',
    }

    constructor(props) {
        super(props);
        this.state = {
            openKeys: this.getOpenKeys(props),
        }
        this.renderMenus = this.renderMenus.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const openKeys = this.getOpenKeys(nextProps);
        this.setState({ openKeys });
    }

    getOpenKeys(props) {
        const { configs, menuActive, menuKey, menuOpen } = props;
        if (!menuOpen) return [];
        const activeKey = findActiveKey({ menuList: configs, menuActive, menuKey });
        const fatherKey = findFatherKey({ menuList: configs, menuActive: activeKey, menuKey });
        const openKeys = fatherKey ? fatherKey.split(',') : [];
        return openKeys;
    }

    onTitleClick({ key }) {
        const { menuOpenSingle, configs, menuKey, menuOpen } = this.props;
        if (!menuOpen) return;
        const { openKeys } = this.state;
        const hasOpen = openKeys.indexOf(key) !== -1;
        let newOpenKeys = [...openKeys];
        if (hasOpen) {
            newOpenKeys = newOpenKeys.filter(v => v !== key);
        } else {
            if (menuOpenSingle) {
                const fatherKey = findFatherKey({ menuList: configs, menuActive: key, menuKey });
                newOpenKeys = (fatherKey + ',' + key).split(',');
            } else {
                newOpenKeys.push(key);
            }
        }
        this.setState({ openKeys: newOpenKeys });
    }

    onMenuItemClick({ key }) {
        const { menuOpenSingle, configs, menuKey, menuOpen } = this.props;
        const { openKeys } = this.state;
        if (!menuOpen) return;
        const fatherKey = findFatherKey({ menuList: configs, menuActive: key, menuKey });
        if (menuOpenSingle) {
            this.setState({ openKeys: fatherKey.split(',') });
        } else {
            const newOpenKeys = [...openKeys];
            fatherKey.split(',').forEach(v => {
                if (newOpenKeys.indexOf(v) === -1) {
                    newOpenKeys.push(v);
                }
            })
            this.setState({ openKeys: newOpenKeys });
        }
    }

    // 渲染菜单
    renderMenus(menus, menuKey) {
        if (!isArray(menus)) return null;
        return menus.map(_item => {
            const commonProps = { key: _item[menuKey], icon: _item.icon }
            if (isArray(_item.children)) {
                return (
                    <SubMenu {...commonProps} title={_item.name} onTitleClick={this.onTitleClick}>
                        {this.renderMenus(_item.children, menuKey)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item {...commonProps} onClick={this.onMenuItemClick}>
                    {this.renderMenuItem(_item)}
                </Menu.Item>
            );
        })
    }

    // 渲染菜单选项
    renderMenuItem(menu) {
        const { isLink } = this.props;
        if (isFunction(menu.name)) {
            return menu.name(menu);
        }
        if (isLink && menu.path) {
            return <Link to={menu.path}>{menu.name}</Link>
        }
        return menu.name;
    }

    render() {
        const { configs, menuApi, menuActive, menuKey, menuOpen } = this.props;
        const { openKeys } = this.state;
        const activeKey = findActiveKey({ menuList: configs, menuActive, menuKey });
        const MenuProps = {
            selectedKeys: [activeKey],
            ...menuApi,
        }

        if (menuOpen) {
            MenuProps.openKeys = openKeys;
        }

        return <Menu {...MenuProps}>{this.renderMenus(configs, menuKey)}</Menu>;
    }

}

HMenu.propTypes = {
    configs: propTypes.array,
    isLink: propTypes.bool,
    menuApi: propTypes.object,
    menuOpenSingle: propTypes.bool,
    menuOpen: propTypes.bool,
    menuActive: propTypes.string,
    menuKey: propTypes.string,
}

export default HMenu;

// 查找高亮菜单
function findActiveKey(params) {
    const { menuList, menuActive, menuKey } = params || {};

    function func_find(_array, _father = '') {
        let activeKey = '';

        _array.forEach(_item => {
            const value = _item[menuKey];
            if (isArray(_item.children)) {
                const secondFather = _father ? `${_father},${value}` : value;
                const result = func_find(_item.children, secondFather);
                if (!activeKey) {
                    activeKey = result;
                }
            } else {
                let isActive = false;
                if (value === menuActive) {
                    isActive = true;
                } else if (_item.active) {
                    const checkList = isArray(_item.active) ? _item.active : [_item.active];
                    checkList.some(v => {
                        const reg = pathToRegexp(v);
                        const result = reg.exec(menuActive);
                        if (result) {
                            isActive = true;
                        }
                        return isActive;
                    });
                }
                if (isActive) {
                    activeKey = value;
                }
            }
        })
        return activeKey;
    }

    if (isArray(menuList)) {
        return func_find(menuList);
    }

    return '';
}

// 获取目标菜单的祖先菜单
// 或所有的祖先菜单
function findFatherKey(_params) {
    const { menuList, menuActive, menuKey } = _params || {};
    const result = {};

    function func_find(_array, _father = '') {
        _array.forEach(_item => {
            const value = _item[menuKey];
            if (!value) return;
            if (isArray(_item.children)) {
                const secondFather = _father ? `${_father},${value}` : value;
                func_find(_item.children, secondFather);
            }
            result[value] = _father;
        })
    }

    if (isArray(menuList)) {
        func_find(menuList);
    }

    if (menuActive !== undefined) {
        return result[menuActive] || '';
    }

    return result;
}

// 检查给定值是否是数组
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

// 检查给定值是否是 Function
function isFunction(value){
  return Object.prototype.toString.call(value) === '[object Function]';
}
