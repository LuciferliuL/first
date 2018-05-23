import React, { Component } from 'react';
import { Card, Input, Form, Row, Col, Switch } from 'antd'
import Selects from '../Tables/Selects'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};

class WindowsEdit extends Component {
    Switchs = (key, value) => {
        // console.log(value)
        this.props.handleChange(key, value)
    }
    Change = (key, e) => {
        let value = e.target.value
        this.props.handleChange(key, value)
    }
    render() {
        const { TableValue } = this.props
        // console.log(TableValue)
        return (
            <Card>
                <Form>
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem
                                label="显示名称" {...formItemLayout}
                                validateStatus='error'
                                help="必填项">
                                <Input value={TableValue.Text} onChange={this.Change.bind(this, 'Text')} ></Input>
                            </FormItem>
                            <FormItem label="作者" {...formItemLayout}>
                                <Input value={TableValue.Author} onChange={this.Change.bind(this, 'Author')}></Input>
                            </FormItem>
                            <FormItem label="行为类型" {...formItemLayout}>
                                <Selects
                                    SelectKey='Action'
                                    defaultValue={TableValue.ActionType}
                                    handleChange={this.props.handleChange}
                                ></Selects>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="ACTION名称" {...formItemLayout}>
                                <Input value={TableValue.Action} onChange={this.Change.bind(this, 'Action')}></Input>
                            </FormItem>
                            <FormItem label="修改日期" {...formItemLayout}>
                                <Input value={TableValue.LastModifyTime} disabled></Input>
                            </FormItem>
                            <FormItem label="所属模块" {...formItemLayout}>
                                <Selects
                                    SelectKey='Module'
                                    defaultValue={TableValue.Module}
                                    handleChange={this.props.handleChange}
                                ></Selects>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem
                        label="程序集" {...formItemLayout}
                        validateStatus='error'
                        help="必填项">
                        <Input value={TableValue.InitialAssemblyRef} onChange={this.Change.bind(this, 'InitialAssemblyRef')} ></Input>
                    </FormItem>
                    <FormItem
                        label="命名空间" {...formItemLayout}
                        validateStatus='error'
                        help="必填项">
                        <Input value={TableValue.Initial} onChange={this.Change.bind(this, 'Initial')} ></Input>
                    </FormItem>
                    <FormItem label="参数" {...formItemLayout}>
                        <Input value={TableValue.ParamString} onChange={this.Change.bind(this, 'ParamString')}></Input>
                    </FormItem>
                    <FormItem label="窗体是否唯一" {...formItemLayout}>
                        <Switch
                            checkedChildren="YES"
                            unCheckedChildren="NO"
                            defaultChecked={TableValue.IsSingle}
                            onChange={this.Switchs.bind(this, 'IsSingle')}
                        />
                    </FormItem>
                    <FormItem label="备注" {...formItemLayout}>
                        <Input value={TableValue.Notes} onChange={this.Change.bind(this, 'Notes')}></Input>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

export default WindowsEdit;