import React from 'react'
import {Form,  Input} from 'antd'
const FormItem = Form.Item

function formsData (props) {
    const { getFieldDecorator } = props.form;
    return(
        <FormItem label="Username">
        {getFieldDecorator('Author', {
            rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
    </FormItem>
    )
    
}

export { formsData }