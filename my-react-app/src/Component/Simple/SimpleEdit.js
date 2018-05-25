import React, { Component } from 'react';
import { Input, Form, Row, Col, Select } from 'antd'
import Selects from '../Tables/Selects'
import SimpleSwitch from './SimpleSwitch'
import SimpleTabs from './SimpleTabs'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class SimpleEdit extends Component {
    state = {
        QueryExtend: {},
        Settings: {}
    }
    componentWillReceiveProps(next) {
        // console.log(next)
        this.setState({
            QueryExtend: JSON.parse(JSON.stringify(next.TableValue.QueryExtend)),
            Settings: next.TableValue.Settings
        })
    }
    componentWillMount() {
        const { TableValue } = this.props
        // console.log(TableValue)
        if (TableValue.QueryExtend !== undefined) {
            this.setState({
                QueryExtend: JSON.parse(JSON.stringify(TableValue.QueryExtend)),
                Settings: TableValue.Settings
            })
        }
    }
    handleChange = (key, e) => {
        let value = e.target.value
        // console.log(key + '-----' + value)
        this.props.handleChange(key,value)
    }
    SelectChange = (key, value) => {
        console.log(key + '=====' + value)
        this.props.handleChange(key,value)
    }
    render() {
        const { TableValue } = this.props
        // console.log(TableValue)
        return (
            <Form>
                <Row gutter={24}>
                    <Col span={18}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem label="查询表示" {...formItemLayout}>
                                    <Input value={TableValue.BillTypeCode} onChange={this.handleChange.bind(this, 'BillTypeCode')}></Input>
                                </FormItem>
                                <FormItem label="条件控制程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQueryParamAssembly} onChange={this.handleChange.bind(this, 'DQueryParamAssembly')}></Input>
                                </FormItem>
                                <FormItem label="主控件程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQueryMasterAssembly} onChange={this.handleChange.bind(this, 'DQueryMasterAssembly')}></Input>
                                </FormItem>
                                <FormItem label="从控件程序集" {...formItemLayout}>
                                    <Input value={TableValue.DQuerySlaveAssembly} onChange={this.handleChange.bind(this, 'DQuerySlaveAssembly')}></Input>
                                </FormItem>
                                <FormItem label="所属模块" {...formItemLayout}>
                                    <Selects SelectKey='Module' disables={false} defaultValue={TableValue.Module} handleChange={this.SelectChange.bind(this)}></Selects>
                                </FormItem>
                                <FormItem label="作者" {...formItemLayout}>
                                    <Input value={TableValue.Author} onChange={this.handleChange.bind(this, 'Author')}></Input>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="窗口名称" {...formItemLayout}>
                                    <Input value={TableValue.DQueryCaption} onChange={this.handleChange.bind(this, 'DQueryCaption')}></Input>
                                </FormItem>
                                <FormItem label="条件控制命名" {...formItemLayout}>
                                    <Input value={TableValue.DQueryParamFullName} onChange={this.handleChange.bind(this, 'DQueryParamFullName')}></Input>
                                </FormItem>
                                <FormItem label="主控件命名" {...formItemLayout}>
                                    <Input value={TableValue.DQueryMasterFullName} onChange={this.handleChange.bind(this, 'DQueryMasterFullName')}></Input>
                                </FormItem>
                                <FormItem label="从控件命名" {...formItemLayout}>
                                    <Input value={TableValue.DQuerySlaveFullName} onChange={this.handleChange.bind(this, 'DQuerySlaveFullName')}></Input>
                                </FormItem>
                                <FormItem label="窗口布局" {...formItemLayout}>
                                    <Select defaultValue={TableValue.LayoutMode}>
                                        <Option value={1}>流式布局</Option>
                                        <Option value={0}>固定布局</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="打开设计" {...formItemLayout}>
                                    <Select defaultValue={0}>
                                        <Option value={0}>代码设计器</Option>
                                        <Option value={1}>XML设计器</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <SimpleTabs
                            disableds={false}
                            QueryExtend={this.state.QueryExtend}
                            handleChange={this.SelectChange.bind(this)}></SimpleTabs>
                    </Col>
                    <Col span={6}>
                        <SimpleSwitch
                            disableds={false}
                            Settings={this.state.Settings}></SimpleSwitch>
                    </Col>
                </Row>
            </Form>

        );
    }
}

export default SimpleEdit;