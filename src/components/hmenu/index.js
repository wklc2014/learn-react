/**
 * 菜单导航
 * inline 模式下，菜单展开可控，HMenu组件state控制
 * vertical/horizontal 模式下，菜单展开不可控，Menu组件内部控制
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
        menuSelected: '',
        menuKey: 'path',
    }

    constructor(props) {
        super(props);
        this.state = {
            openKeys: findOpenKeys(props),
            prevOpenKeys: [],
        }
        this.renderMenus = this.renderMenus.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const openKeys = findOpenKeys(nextProps);
        if (JSON.stringify(prevState.prevOpenKeys) !== JSON.stringify(openKeys)) {
            return { openKeys, prevOpenKeys: openKeys };
        }
        return null;
    }

    // 子菜单标题点击
    onTitleClick({ key }) {
        const menuCanOpen = checkMenuCanOpen(this.props);
        if (!menuCanOpen) return;
        const { menuOpenSingle, configs, menuKey } = this.props;
        const { openKeys } = this.state;
        const hasOpen = openKeys.indexOf(key) !== -1;
        let newOpenKeys = [...openKeys];
        if (hasOpen) {
            newOpenKeys = newOpenKeys.filter(v => v !== key);
        } else {
            if (menuOpenSingle) {
                const fatherKey = findFatherKey({ menuList: configs, menuSelected: key, menuKey });
                newOpenKeys = (fatherKey + ',' + key).split(',');
            } else {
                newOpenKeys.push(key);
            }
        }
        this.setState({ openKeys: newOpenKeys });
    }

    // 菜单元素点击
    onMenuItemClick({ key }) {
        const { menuOpenSingle, configs, menuKey } = this.props;
        const menuCanOpen = checkMenuCanOpen(this.props);
        if (!menuCanOpen) return;
        const fatherKey = findFatherKey({ menuList: configs, menuSelected: key, menuKey });
        const { openKeys } = this.state;
        let newOpenKeys = [...openKeys];
        if (menuOpenSingle) {
            newOpenKeys = fatherKey.split(',');
        } else {
            fatherKey.split(',').forEach(v => {
                if (newOpenKeys.indexOf(v) === -1) {
                    newOpenKeys.push(v);
                }
            })
        }
        this.setState({ openKeys: newOpenKeys });
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
        const { configs, menuApi, menuSelected, menuKey } = this.props;
        const { openKeys } = this.state;
        const menuCanOpen = checkMenuCanOpen(this.props);
        const selectedKey = findSelectedKey({ menuList: configs, menuSelected, menuKey });
        const MenuProps = {
            selectedKeys: [selectedKey],
            ...menuApi,
        }

        if (menuCanOpen) {
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
    menuSelected: propTypes.string,
    menuKey: propTypes.string,
}

export default HMenu;

// 根据props映射 state.openKeys
function findOpenKeys(props) {
    const { configs, menuSelected, menuKey } = props || {};
    const menuCanOpen = checkMenuCanOpen(props);
    if (!menuCanOpen) return [];
    const activeKey = findSelectedKey({ menuList: configs, menuSelected, menuKey });
    const fatherKey = findFatherKey({ menuList: configs, menuSelected: activeKey, menuKey });
    const openKeys = fatherKey ? fatherKey.split(',') : [];
    return openKeys;
}

// 根据props检查是否展开菜单
// inline 模式下，一定可以展开菜单
function checkMenuCanOpen(props) {
    const { menuApi } = props || {};
    return menuApi.mode === 'inline';
}

// 查找高亮菜单
function findSelectedKey(params) {
    const { menuList, menuSelected, menuKey } = params || {};

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
                if (value === menuSelected) {
                    isActive = true;
                } else if (_item.active) {
                    const checkList = isArray(_item.active) ? _item.active : [_item.active];
                    checkList.some(v => {
                        const reg = pathToRegexp(v);
                        const result = reg.exec(menuSelected);
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
    const { menuList, menuSelected, menuKey } = _params || {};
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

    if (menuSelected !== undefined) {
        return result[menuSelected] || '';
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
