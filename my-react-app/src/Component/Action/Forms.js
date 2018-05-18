import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd'
// import { formsData } from './FormsData'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formsName = ['Action',
    'Author',
    'Caption',
    'Param1',
    'Param2',
    'Note']
const Forms = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        let Obj = {}
        formsName.map((v)=>(
             Obj[v] = Form.createFormField({
                ...props.username,  
                value: props.selectedObj[v],
            })   
        ))
        return Obj
    },
    onValuesChange(_, values) {
        console.log(values);
        // this.props.form.setFieldsValue(values)
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    console.log(props)
    return (
        <Form layout='horizontal'>
            <FormItem label="Action" {...formItemLayout}>
                {getFieldDecorator('Action', {
                    rules: [{ required: true, message: 'Action is required!' }],
                })(<Input disabled/>)}
            </FormItem>
            <FormItem label="Author" {...formItemLayout}>
                {getFieldDecorator('Author', {
                    rules: [{ required: true, message: 'Author is required!' }],
                })(<Input disabled/>)}
            </FormItem>
            <FormItem label="Caption" {...formItemLayout}>
                {getFieldDecorator('Caption', {
                    rules: [{ required: true, message: 'Caption is required!' }],
                })(<Input disabled/>)}
            </FormItem>
            <FormItem label="Param1" {...formItemLayout}>
                {getFieldDecorator('Param1', {
                    rules: [{ required: true, message: 'Param1 is required!' }],
                })(<Input disabled/>)}
            </FormItem>
            <FormItem label="Param2" {...formItemLayout}>
                {getFieldDecorator('Param2', {
                    rules: [{ required: true, message: 'Param2 is required!' }],
                })(<Input disabled/>)}
            </FormItem>
            <FormItem label="Note" {...formItemLayout}>
                {getFieldDecorator('Note', {
                    rules: [{ required: true, message: 'Note is required!' }],
                })(<Input disabled/>)}
            </FormItem>
        </Form>
    );
});
export default Forms;