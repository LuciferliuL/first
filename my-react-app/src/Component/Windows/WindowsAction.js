import React, { Component } from 'react';
import { Card, Input, Form, Row, Col, Switch } from 'antd'
import Selects from '../Tables/Selects'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};

class WindowsAction extends Component {
    Switchs = (value) => {
        console.log(value)
    }
    render() {
        return (
            <Card>
                <Form>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem label="显示名称" {...formItemLayout}>
                                <Input></Input>
                            </FormItem>
                            <FormItem label="作者" {...formItemLayout}>
                                <Input></Input>
                            </FormItem>
                            <FormItem label="行为类型" {...formItemLayout}>
                                <Selects SelectKey='Action'></Selects>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="ACTION名称" {...formItemLayout}>
                                <Input></Input>
                            </FormItem>
                            <FormItem label="修改日期" {...formItemLayout}>
                                <Input></Input>
                            </FormItem>
                            <FormItem label="所属模块" {...formItemLayout}>
                                <Selects SelectKey='Module'></Selects>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="程序集" {...formItemLayout}>
                        <Input></Input>
                    </FormItem>
                    <FormItem label="命名空间" {...formItemLayout}>
                        <Input></Input>
                    </FormItem>
                    <FormItem label="参数" {...formItemLayout}>
                        <Input></Input>
                    </FormItem>
                    <FormItem label="窗体是否唯一" {...formItemLayout}>
                        <Switch
                            checkedChildren="开"
                            unCheckedChildren="关"
                            defaultChecked
                            onChange={this.Switchs.bind(this)}
                        />
                    </FormItem>
                    <FormItem label="备注" {...formItemLayout}>
                        <Input></Input>
                    </FormItem>
                </Form>
            </Card>

        );
    }
}

export default WindowsAction;