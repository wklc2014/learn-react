/**
 * antd v4.x
 */
import React, { Component, useState } from 'react';
import { Form, Row, Col, Input, Button, Cascader, DatePicker, TimePicker, Select, Rate, Radio, Checkbox, InputNumber, AutoComplete, Slider, Switch, TreeSelect, Upload } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import is from 'is_js';
import { get, sortBy, merge } from 'lodash';

const { Option, OptGroup } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search, TextArea, Password } = Input;

export default class HForm extends Component {

    static defaultProps = {
        cols: 1,
        configs: [],
        extMap: {},
        formApi: {
            layout: 'horizontal',
        },
        rowApi: {},
        onChange: null,
        values: {},
    }

    render() {
        const { cols, configs, extMap, formApi, rowApi, onChange, values } = this.props;
        const isInlineLayout = formApi && formApi.layout === 'inline';
        const colspan = 24 / cols;
        const list = utils.sort(utils.filter(configs));
        const childrenEle = list.map((_val, _i) => {
            const id = get(_val, 'extMap.id', '');
            const key = `H-FORM-${id || _i}`;
            const newProps = {
                config: _val.config,
                extMap: merge({}, extMap, _val.extMap),
                onChange,
                values,
            };
            if (isInlineLayout) {
                return <HFormItem key={key} {...newProps} />;
            }
            const colApi = get(_val, 'extMap.colApi', {});
            return (
                <Col key={key} span={colspan} {...colApi}>
                    <HFormItem {...newProps} />
                </Col>
            );
        });
        const FormProps = { ...formApi, initialValues: values };
        const RowProps = { ...rowApi };
        return (
            <Form {...FormProps}>
                {isInlineLayout ? childrenEle : <Row {...RowProps}>{childrenEle}</Row>}
            </Form>
        );
    }
}

function HFormItem(props) {
    const { config = [], extMap = {}, onChange, values = {} } = props;
    const list = utils.parse(config);
    const length = list.length;
    const childrenEle = list.map((_val, i) => {
        const key: string = _val.id || `H-FORM-ITEM-${i}`;
        const placeholder = utils.placeholder({ ..._val, label: extMap.label });
        const style = utils.style({ ..._val });
        const data = utils.data({ ..._val });
        const newProps = {
            id: _val.id,
            type: _val.type,
            itemApi: merge({
                // noStyle: extMap.type === 'inputgroup',
            }, extMap.subItemApi, _val.itemApi),
            contentApi: merge({}, extMap.subContentApi, _val.contentApi, {
                placeholder,
                style,
                value: values ? values[_val.id] : undefined,
            }),
            ext: merge({}, extMap.subExt, _val.ext, { data }),
            onChange,
        };
        const colspan = Math.round(24 / length);
        const ColProps = {
            key,
            span: colspan,
            ...merge({}, extMap.subColApi, _val.colApi),
        };
        return (
            <Col {...ColProps}>
                <HFormItemContent {...newProps} />
            </Col>
        );
    });
    const newProps = merge({}, {
            label: extMap.label,
            style: { marginBottom: 0 },
            labelCol: { flex: '100px' },
            required: utils.required(list),
        },
        extMap.itemApi,
    );
    const RowProps = merge({}, {
        gutter: 16,
        style: { paddingRight: 10 },
    }, extMap.rowApi);
    return (
        <Form.Item {...newProps}>
            <Row {...RowProps}>{childrenEle}</Row>
        </Form.Item>
    );
}

function HFormItemContent(props) {
    const { id, type, itemApi, contentApi, ext } = props;

    function onChange(e) {
        if (props.onChange) {
            props.onChange({ id, value: e });
        }
    }
    let childrenEle = null;
    const ItemProps = {
        api: contentApi,
        ext,
        onChange,
    };
    switch (type) {
        case 'button':
            childrenEle = <ItemButton {...ItemProps} />;
            break;
        case 'cascader':
            childrenEle = <ItemCascader {...ItemProps} />;
            break;
        case 'number':
            childrenEle = <ItemNumber {...ItemProps} />;
            break;
        case 'rate':
            childrenEle = <ItemRate {...ItemProps} />;
            break;
        case 'render':
            childrenEle = <ItemRender {...ItemProps} />;
            break;
        case 'date':
            childrenEle = <ItemDate {...ItemProps} />;
            break;
        case 'input':
            childrenEle = <ItemInput {...ItemProps} />;
            break;
        case 'radio':
            childrenEle = <ItemRadio {...ItemProps} />;
            break;
        case 'select':
            childrenEle = <ItemSelect {...ItemProps} />;
            break;
        case 'service':
            childrenEle = <ItemService {...ItemProps} />;
            break;
        case 'text':
            childrenEle = <ItemText {...ItemProps} />;
            break;
        case 'checkbox':
            childrenEle = <ItemCheckbox {...ItemProps} />;
            break;
        case 'slider':
            childrenEle = <ItemSlider {...ItemProps} />;
            break;
        case 'switch':
            childrenEle = <ItemSwitch {...ItemProps} />;
            break;
        case 'treeselect':
            childrenEle = <ItemTreeSlect {...ItemProps} />;
            break;
        case 'upload':
            childrenEle = <ItemUpload {...ItemProps} />;
            break;
    }

    const newProps = {
        ...itemApi,
    };
    const noNameTypes = ['render', 'button'];
    if (is.not.inArray(type, noNameTypes)) {
        newProps.name = id;
    }
    if (type === 'checkbox' && ext.subType !== 'group') {
        newProps.valuePropName = 'checked';
    }
    return <Form.Item {...newProps}>{childrenEle}</Form.Item>;
}

const utils = {
    filter: function(_array, _path = 'extMap.hide') {
        if (is.not.array(_array)) return [];
        return _array.filter(function(_v) {
            const hide = get(_v, _path, false);
            return !hide;
        })
    },
    sort: function(_array, _path = 'extMap.order') {
        if (is.not.array(_array)) return [];
        return sortBy(_array, function(_v) {
            const order = get(_v, _path, 1);
            return order;
        });
    },
    parse: function(_config) {
        const list = is.array(_config) ? _config : [_config];
        return this.filter(list, 'ext.hide');
    },
    placeholder: function(_params) {
        const { id = '', type = '', contentApi = {}, ext = {}, label = '' } = _params;
        if (contentApi.placeholder !== undefined) return contentApi.placeholder;
        let placeholder = '';
        const inputTypes = ['input', 'service', 'number'];
        const selectTypes = ['select', 'treeselect', 'cascader', 'date'];
        if (is.inArray(type, inputTypes)) {
            placeholder = `请输入${label || id}`;
        } else if (is.inArray(type, selectTypes)) {
            placeholder = `请选择${label || id}`;
        }
        if (type === 'date' && ext.subType === 'range') {
            placeholder = [`开始${label || id}`, `开始${label || id}`];
        }
        return placeholder;
    },
    style: function(_params) {
        const style = {};
        const { type = '', contentApi = {}, ext = {} } = _params;
        if (ext.toUpperCase) {
            Object.assign(style, { textTransform: 'uppercase' });
        } else if (ext.toLowerCase) {
            Object.assign(style, { textTransform: 'lowercase' });
        }
        const types = ['input', 'cascader', 'date', 'number', 'select', 'treeselect'];
        if (is.inArray(type, types)) {
            Object.assign(style, { width: '100%' });
        }
        merge(style, contentApi.style || {});
        return style;
    },
    data: function(_params) {
        const { type = '', ext = {} } = _params;
        if (is.not.array(ext.data)) return [];
        if (type === 'button') return ext.data;
        return ext.data;
    },
    required: function(_array) {
        const list = this.parse(_array);
        let required = false;
        list.some(function(_v) {
            const rules = get(_v, 'itemApi.rules', []);
            if (!rules || is.not.array(rules)) return false;
            required = rules.some(function(_r) {
                return _r.required;
            })
        })
        return required;
    },
    option: function(_target, _key) {
        if (is.object(_target)) {
            const { label = 'label', ...rest } = _target;
            const newProps = { key: _key, ...rest };
            return <Option {...newProps}>{label}</Option>;
        }
        if (is.string(_target)) {
            return <Option key={_key} value={_target}>{_target}</Option>
        }
        return null;
    },
    _default: function(_configs) {
        if (is.not.array(_configs)) return {};
        const values = {};
        _configs.forEach(function(_v) {
            const conf = _v.config;
            const confArray = is.array(conf) ? conf : [conf];
            confArray.forEach(function(_a) {
                const { ext = {}, id } = _a;
                const { defaultValue } = ext;
                if (defaultValue && id) {
                    values[id] = defaultValue;
                }
            });
        });
        return values;
    }
}

let timeout = null;

function ItemService(props) {
    const { api, ext, onChange } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    function onSearch(_value) {
        if (!_value) {
            setData([]);
            return;
        }
        if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
        }

        function search() {
            try {
                setLoading(true);
                ext.service(_value).then(resp => {
                    const data = ext.callback(resp);
                    setData(data);
                    setLoading(false);
                });
            } catch (e) {}
        }
        timeout = window.setTimeout(search, ext.time || 300);
    }
    const newProps = {
        options: data,
        allowClear: true,
        notFoundContent: loading ? <div><LoadingOutlined spin />&nbsp;loading...</div> : '',
        ...api,
        onSearch,
        onChange,
    }
    return <AutoComplete {...newProps} />;
}

function ItemText(props) {
    const { api = {}, ext = {}, onChange } = props;
    let { value } = api;
    if (is.array(ext.data)) {
        if (is.array(value)) {
            const textMap = [];
            ext.data.forEach(v => {
                if (is.inArray(v.value, value)) textMap.push(v.label);
            });
            value = textMap.join(ext.join);
        } else {
            const findValue = ext.data.find(v => v.value === value);
            if (findValue) value = findValue.label;
        }
    }
    return <span className={`ant-form-text ${api.className}`}>{value}</span>;
}

function ItemSelect(props) {
    const { api = {}, ext = {}, onChange } = props;
    const elements = ext.data.map((_v, _i) => {
        const key = `item-select-${_i}`;
        if (is.array(_v.children)) {
            return <OptGroup label={_v.label} key={key}>{_v.children.map(utils.option)}</OptGroup>;
        }
        return utils.option(_v, key);
    });
    return <Select allowClear {...api} onChange={onChange}>{elements}</Select>;
}

function ItemRadio(props) {
    const { api = {}, ext = {}, onChange } = props;
    const childrenEle = ext.data.map((_v, _i) => {
        const key = `item-radio-${_i}`;
        if (ext.subType === 'button') {
            return <Radio.Button key={key} value={_v.value}>{_v.label}</Radio.Button>;
        }
        return <Radio key={key} value={_v.value}>{_v.label}</Radio>;
    })
    return <Radio.Group {...api} onChange={(e) => onChange(e.target.value)}>{childrenEle}</Radio.Group>
}

function ItemInput(props) {
    const { api = {}, ext = {}, onChange } = props;
    if (ext.subType === 'search') {
        return <Search {...api} onChange={(e) => onChange(e.target.value)} />;
    } else if (ext.subType === 'textarea') {
        return <TextArea rows={5} {...api} onChange={(e) => onChange(e.target.value)} />;
    } else if (ext.subType === 'password') {
        return <Password autoComplete="true" {...api} onChange={(e) => onChange(e.target.value)} />;
    } else {
        return <Input allowClear {...api} onChange={(e) => onChange(e.target.value)} />;
    }
}

function ItemDate(props) {
    const { api = {}, ext = {}, onChange } = props;
    if (ext.subType === 'month') {
        return <MonthPicker {...api} onChange={onChange} />;
    } else if (ext.subType === 'time') {
        return <TimePicker {...api} onChange={onChange} />;
    } else if (ext.subType === 'range') {
        return <RangePicker {...api} onChange={onChange} />;
    } else if (ext.subType === 'week') {
        return <WeekPicker {...api} onChange={onChange} />;
    } else {
        return <DatePicker {...api} onChange={onChange} />;
    }
}

function ItemCascader(props) {
    const { api = {}, ext = {}, onChange } = props;
    return <Cascader options={ext.data} {...api} onChange={onChange} />;
}

function ItemNumber(props) {
    const { api = {}, ext = {}, onChange } = props;
    return <InputNumber { ...api } onChange={onChange} />;
}

function ItemRate(props) {
    const { api = {}, ext = {}, onChange } = props;
    return <Rate { ...api } onChange={onChange} />;
}

function ItemSlider(props) {
    const { api = {}, ext = {}, onChange } = props;
    return <Slider { ...api } onChange={onChange} />;
}

function ItemSwitch(props) {
    const { api = {}, ext = {}, onChange } = props;
    return <Switch { ...api } checked={api.value} onChange={onChange} />;
}

function ItemTreeSlect(props) {
    const { api = {}, ext = {}, onChange } = props;
    const dropdownStyle = { maxHeight: 300, ...api.dropdownStyle };
    return <TreeSelect treeData={ext.data} { ...api } onChange={onChange} dropdownStyle={dropdownStyle} />;
}

function ItemButton(props) {
    const { api = {}, ext = {}, onChange } = props;
    if (is.array(ext.data)) {
        return ext.data.map((_v, _i) => {
            const key = `item-button-${_i}`;
            const style = _i === ext.data.length - 1 ? null : { marginRight: 8 };
            const type = _v.type || api.type;
            return (
                <span style={style} key={key}>
                  <Button type={type} {...api} onClick={() => onChange(_v.value)}>{_v.label}</Button>
                </span>
            );
        });
    }
    return <Button {...api} onClick={() => onChange(ext.value)}>{ext.label || '按钮'}</Button>;
}

function ItemRender(props) {
    const { api = {}, ext = {}, onChange } = props;
    if (is.function(ext.render)) {
        return ext.render({ api, ext, onChange });
    }
    return null;
}

function ItemCheckbox(props) {
    const { api = {}, ext = {}, onChange } = props;
    if (ext.subType === 'group') {
        return <Checkbox.Group options={ext.data} {...api} onChange={onChange} />;
    }
    return <Checkbox checked={!!api.value} {...api} onChange={(e) => onChange(e.target.checked)}>{ext.label}</Checkbox>;
}

function ItemUpload(props) {
    const { api = {}, ext = {}, onChange } = props;
    const { value, ...restApi } = api;
    const newProps = {
        name: 'file',
        ...restApi,
        fileList: value,
        onChange(info) {
            try {
              ext.callback(info);
            } catch (e) {}
        },
    }
    return (
        <Upload {...newProps}>
            {ext.content ? ext.content : (
                <Button>
                  <UploadOutlined /> 点击上传
                </Button>
            )}
        </Upload>
    );
}

export const getValue = utils._default;
