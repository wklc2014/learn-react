import React, { useState } from 'react';
import HForm, { getValue } from '../index.js';
import { Form, Button } from 'antd';
import demoConfigs from './configs.js';

const ExampleDemo = (props) => {
    const defValues = getValue(demoConfigs);
    const [values, setValues] = useState(defValues);
    const [form] = Form.useForm();
    const onChange = ({ id, value }) => {
        console.log(id, value);
        setValues({
            ...values,
            [id]: value,
        })
    }

    const handleValidate = () => {
        form.validateFields().then((resp) => {
            console.log('resp>>>', resp);
        })
    }

    const handleReset = () => {
        form.resetFields();
    }

    console.log('values>>>', values);

    return (
        <div style={{ width: 800, maxWidth: '100%', border: '1px solid #ddd', padding: 16 }}>
            <div style={{ paddingBottom: 16 }}>
                <Button type="primary" style={{ marginRight: 16 }} onClick={handleValidate}>验证</Button>
                <Button type="primary" onClick={handleReset}>重置</Button>
            </div>
            <HForm
                cols={1}
                configs={demoConfigs}
                values={values}
                onChange={onChange}
                formApi={{
                    form: form,
                }}
            />
        </div>
    )
}

export default ExampleDemo;
