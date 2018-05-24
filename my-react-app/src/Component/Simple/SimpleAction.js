import React, { Component } from 'react';
import { Card, Input, Form, Row, Col, Select } from 'antd'
import Selects from '../Tables/Selects'
import SimpleFlag from './SimpleFlag'
import SimpleSwitch from './SimpleSwitch'
import SimpleTabs from './SimpleTabs'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const Option = Select.Option
class SimpleAction extends Component {
    state = {
        QueryExtend : {}
    }
    render() {
        const { TableValue } = this.props
        if (TableValue.QueryExtend !== undefined) {
            this.state.QueryExtend = TableValue.QueryExtend
        }
        console.log(TableValue)
        return (
            <Form>
                <Row gutter={24}>
                    <Col span={18}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem label="查询表示" {...formItemLayout}>
                                    <Input value={TableValue.BillTypeCode} disabled></Input>
                                </FormItem>
                                <FormItem label="条件控制程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQueryParamAssembly} disabled></Input>
                                </FormItem>
                                <FormItem label="主控件程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQueryMasterAssembly} disabled></Input>
                                </FormItem>
                                <FormItem label="从控件程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQuerySlaveAssembly} disabled></Input>
                                </FormItem>
                                <FormItem label="所属模块" {...formItemLayout}>
                                    <Selects SelectKey='Module' disables={true} defaultValue={TableValue.Module}></Selects>
                                </FormItem>
                                <FormItem label="作者" {...formItemLayout}>
                                    <Input value={TableValue.Author} disabled></Input>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="窗口名称" {...formItemLayout}>
                                    <Input value={TableValue.DQueryCaption} disabled></Input>
                                </FormItem>
                                <FormItem label="条件控制命名" {...formItemLayout}>
                                    <Input value={TableValue.DQueryParamFullName} disabled></Input>
                                </FormItem>
                                <FormItem label="主控件命名" {...formItemLayout}>
                                    <Input value={TableValue.DQueryMasterFullName} disabled></Input>
                                </FormItem>
                                <FormItem label="从控件命名" {...formItemLayout}>
                                    <Input value={TableValue.DQuerySlaveFullName} disabled></Input>
                                </FormItem>
                                <FormItem label="窗口布局" {...formItemLayout}>
                                    <Select disabled defaultValue={TableValue.LayoutMode}>
                                        <Option value={1}>流式布局</Option>
                                        <Option value={0}>固定布局</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="打开设计" {...formItemLayout}>
                                    <Select disabled defaultValue={0}>
                                        <Option value={0}>代码设计器</Option>
                                        <Option value={1}>XML设计器</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <SimpleTabs QueryExtend={this.state.QueryExtend}></SimpleTabs>
                    </Col>
                    <Col span={6}>
                        <SimpleSwitch disableds={true}></SimpleSwitch>
                    </Col>
                </Row>
            </Form>

        );
    }
}

export default SimpleAction;