import React, { Component } from 'react';
import { Card, Input, Form, Row, Col, Select } from 'antd'
import Selects from '../Tables/Selects'
import SimpleFlag from './SimpleFlag'
import SimpleSwitch from './SimpleSwitch'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class SimpleEdit extends Component {
    render() {
        const {TableValue} = this.props
        // console.log(TableValue)
        return (
            <Form>
                <Row gutter={24}>
                    <Col span={18}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem label="查询表示" {...formItemLayout}>
                                    <Input value={TableValue.BillTypeCode} ></Input>
                                </FormItem>
                                <FormItem label="条件控制程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQueryParamAssembly} ></Input>
                                </FormItem>
                                <FormItem label="主控件程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQueryMasterAssembly} ></Input>
                                </FormItem>
                                <FormItem label="从控件程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQuerySlaveAssembly} ></Input>
                                </FormItem>
                                <FormItem label="所属模块" {...formItemLayout}>
                                    <Selects SelectKey='Module' disables={false} defaultValue={TableValue.Module}></Selects>
                                </FormItem>
                                <FormItem label="作者" {...formItemLayout}>
                                    <Input value={TableValue.Author} ></Input>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="窗口名称" {...formItemLayout}>
                                    <Input value={TableValue.DQueryCaption} ></Input>
                                </FormItem>
                                <FormItem label="条件控制命名" {...formItemLayout}>
                                    <Input value={TableValue.DQueryParamFullName} ></Input>
                                </FormItem>
                                <FormItem label="主控件命名" {...formItemLayout}>
                                    <Input value={TableValue.DQueryMasterFullName} ></Input>
                                </FormItem>
                                <FormItem label="从控件命名" {...formItemLayout}>
                                    <Input value={TableValue.DQuerySlaveFullName} ></Input>
                                </FormItem>
                                <FormItem label="窗口布局" {...formItemLayout}>
                                    <Select  defaultValue={TableValue.LayoutMode}>
                                        <Option value={1}>流式布局</Option>
                                        <Option value={0}>固定布局</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="打开设计" {...formItemLayout}>
                                    <Select  defaultValue={0}>
                                        <Option value={0}>代码设计器</Option>
                                        <Option value={1}>XML设计器</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <SimpleFlag disableds={false}></SimpleFlag>
                    </Col>
                    <Col span={6}>
                        <SimpleSwitch disableds={false}></SimpleSwitch>
                    </Col>
                </Row>
            </Form>

        );
    }
}

export default SimpleEdit;