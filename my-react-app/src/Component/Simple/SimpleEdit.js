import React, { Component } from 'react';
import { Input, Form, Row, Col, Select } from 'antd'
import Selects from '../Tables/Selects'
import SimpleSwitchEdit from './SimpleSwitchEdit'
import SimpleTabsEdit from './SimpleTabsEdit'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class SimpleEdit extends Component {
    constructor(props) {
        super(props)
        this.count = 0
        this.state = {
            QueryExtend: [],
            Settings: {},
            TableValueADD: {}
        }
    }
    componentWillMount() {
        const { TableValue } = this.props
        this.setState({
            QueryExtend: JSON.parse(JSON.stringify(TableValue.QueryExtend)),
            Settings: JSON.parse(TableValue.Settings),
            TableValueADD: JSON.parse(JSON.stringify(TableValue))
        })
    }
    componentWillUnmount() {
        this.setState({})
    }

    handleChange = (key, e) => {//第一层的修改
        let value = e.target.value
        // console.log(key + '-----' + value)
        this.setState({
            TableValueADD: Object.assign(this.state.TableValueADD, { [key]: value })
        })
    }
    SelectChange = (key, value) => {//侧边选择的修改
        // console.log(key + '=====' + value)
        this.setState({
            Settings: Object.assign(this.state.Settings, { [key]: value })
        })
    }
    ModuleChange = (key, value) => {//模块及流的修改
        console.log(key + '-----' + value)
        this.setState({
            TableValueADD: Object.assign(this.state.TableValueADD, { [key]: value })
        })
    }
    TabsChange = (data, length) => {//增加框的修改
        console.log(data)
        let TableValueADD = this.state.TableValueADD
        TableValueADD.QueryExtend = data
        TableValueADD.Settings = JSON.stringify(this.state.Settings)
        // console.log(TableValueADD)
        this.count++
        // console.log(length)
        // console.log(this.count)
        if (this.count === length) {
            this.props.isOK(TableValueADD)
        }

    }

    render() {
        const { TableValueADD } = this.state
        return (
            <Form>
                <Row gutter={24}>
                    <Col span={18}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem label="查询表示" {...formItemLayout}>
                                    <Input value={TableValueADD.BillTypeCode}
                                        onChange={this.handleChange.bind(this, 'BillTypeCode')}></Input>
                                </FormItem>
                                <FormItem label="条件控制程序集" {...formItemLayout}>
                                    <Input value={TableValueADD.DQueryParamAssembly}
                                        onChange={this.handleChange.bind(this, 'DQueryParamAssembly')}></Input>
                                </FormItem>
                                <FormItem label="主控件程序集" {...formItemLayout}>
                                    <Input value={TableValueADD.DQueryMasterAssembly}
                                        onChange={this.handleChange.bind(this, 'DQueryMasterAssembly')}></Input>
                                </FormItem>
                                <FormItem label="从控件程序集" {...formItemLayout}>
                                    <Input value={TableValueADD.DQuerySlaveAssembly}
                                        onChange={this.handleChange.bind(this, 'DQuerySlaveAssembly')}></Input>
                                </FormItem>
                                <FormItem label="所属模块" {...formItemLayout}>
                                    <Selects SelectKey='Module' disables={false}
                                        defaultValue={TableValueADD.Module}
                                        handleChange={this.ModuleChange.bind(this)}></Selects>
                                </FormItem>
                                <FormItem label="作者" {...formItemLayout}>
                                    <Input value={TableValueADD.Author}
                                        onChange={this.handleChange.bind(this, 'Author')}></Input>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="窗口名称" {...formItemLayout}>
                                    <Input value={TableValueADD.DQueryCaption}
                                        onChange={this.handleChange.bind(this, 'DQueryCaption')}></Input>
                                </FormItem>
                                <FormItem label="条件控制命名" {...formItemLayout}>
                                    <Input value={TableValueADD.DQueryParamFullName}
                                        onChange={this.handleChange.bind(this, 'DQueryParamFullName')}></Input>
                                </FormItem>
                                <FormItem label="主控件命名" {...formItemLayout}>
                                    <Input value={TableValueADD.DQueryMasterFullName}
                                        onChange={this.handleChange.bind(this, 'DQueryMasterFullName')}></Input>
                                </FormItem>
                                <FormItem label="从控件命名" {...formItemLayout}>
                                    <Input value={TableValueADD.DQuerySlaveFullName}
                                        onChange={this.handleChange.bind(this, 'DQuerySlaveFullName')}></Input>
                                </FormItem>
                                <FormItem label="窗口布局" {...formItemLayout}>
                                    <Select defaultValue={TableValueADD.LayoutMode}
                                        onChange={this.ModuleChange.bind(this, 'LayoutMode')}>
                                        <Option value="fluidLayout">流式布局</Option>
                                        <Option value="fixedLayout">固定布局</Option>
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
                        <SimpleTabsEdit
                            disableds={false}
                            QueryExtend={this.state.QueryExtend}
                            TabsChange={this.TabsChange.bind(this)}
                        ></SimpleTabsEdit>
                    </Col>
                    <Col span={6}>
                        <SimpleSwitchEdit
                            disableds={false}
                            Settings={this.state.Settings}
                            SelectChange={this.SelectChange.bind(this)}
                        ></SimpleSwitchEdit>
                    </Col>
                </Row>
            </Form>

        );
    }
}

export default SimpleEdit;