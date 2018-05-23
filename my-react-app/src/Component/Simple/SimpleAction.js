import React, { Component } from 'react';
import { Card, Input, Form, Row, Col } from 'antd'
import Selects from '../Tables/Selects'
import SimpleFlag from './SimpleFlag'
import SimpleSwitch from './SimpleSwitch'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class SimpleAction extends Component {
    render() {
        const { TableValue } = this.props
        console.log(TableValue)
        return (
            <Card>
                <Form>
                    <Row gutter={24}>
                        <Col span={18}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <FormItem label="显示名称" {...formItemLayout}>
                                        <Input value={TableValue.Text} disabled></Input>
                                    </FormItem>
                                    <FormItem label="作者" {...formItemLayout}>
                                        <Input value={TableValue.Author} disabled></Input>
                                    </FormItem>
                                    <FormItem label="作者" {...formItemLayout}>
                                        <Input value={TableValue.Author} disabled></Input>
                                    </FormItem>
                                    <FormItem label="作者" {...formItemLayout}>
                                        <Input value={TableValue.Author} disabled></Input>
                                    </FormItem>
                                    <FormItem label="行为类型" {...formItemLayout}>
                                        <Selects SelectKey='Action' disables={true} defaultValue={TableValue.ActionType}></Selects>
                                    </FormItem>
                                    <FormItem label="作者" {...formItemLayout}>
                                        <Input value={TableValue.Author} disabled></Input>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label="ACTION名称" {...formItemLayout}>
                                        <Input value={TableValue.Action} disabled></Input>
                                    </FormItem>
                                    <FormItem label="修改日期" {...formItemLayout}>
                                        <Input value={TableValue.LastModifyTime} disabled></Input>
                                    </FormItem>
                                    <FormItem label="作者" {...formItemLayout}>
                                        <Input value={TableValue.Author} disabled></Input>
                                    </FormItem>
                                    <FormItem label="作者" {...formItemLayout}>
                                        <Input value={TableValue.Author} disabled></Input>
                                    </FormItem>
                                    <FormItem label="所属模块" {...formItemLayout}>
                                        <Selects SelectKey='Module' disables={true} defaultValue={TableValue.Module}></Selects>
                                    </FormItem>
                                    <FormItem label="所属模块" {...formItemLayout}>
                                        <Selects SelectKey='Module' disables={true} defaultValue={TableValue.Module}></Selects>
                                    </FormItem>
                                </Col>
                            </Row>
                            <SimpleFlag></SimpleFlag>
                        </Col>
                        <Col span={6}>
                            <SimpleSwitch></SimpleSwitch>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );
    }
}

export default SimpleAction;