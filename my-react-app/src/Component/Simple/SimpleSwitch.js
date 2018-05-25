import React, { Component } from 'react';
import { Collapse, Form, Switch } from 'antd'
const Panel = Collapse.Panel;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 8 },
};
const MenuAdmin = [
    { Name: '允许导出数据', Code: 'AllowExport' },
    { Name: '允许状态扭转', Code: 'AllowReverseState' },
    { Name: '允许查看工作流', Code: 'AllowWorkFlowQuery' },
    { Name: '允许打印所有', Code: 'PrintAll' },
    { Name: '允许打印', Code: 'AllowPrint' },
    { Name: '允许重设', Code: 'AllowReset' },
    { Name: '允许删除', Code: 'AllowDelete' },
    { Name: '允许编辑', Code: 'AllowEdit' },
    { Name: '允许查看', Code: 'AllowView' },
    { Name: '允许查分公司数据', Code: 'ShowOrgSelect' }
]
const ServerAdmin = [
    { Name: '查询前参数检查', Code: 'ParamsCheck' },
    { Name: '允许SQL自动重构', Code: 'SQLRebuilding' }
]
const FunAdmin = [
    { Name: '分公司勾选联动', Code: 'IsLinkOnOrgSelect' },
    { Name: '分公司允许多选', Code: 'AllowOrgMultiSelect' }
]
let Menu = []
let Servers = []
let Fun = []
class SimpleSwitch extends Component {
    callback = (key) => {
        console.log(key);
    }
    componentWillMount() {
        const { disableds, Settings } = this.props
        for (let key in Settings) {
            if (Settings[key] === 'true') {
                Settings[key] = true
            } else {
                Settings[key] = false
            }
        }
        MenuAdmin.map((v, index) => (
            // console.log(v)
            Menu.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${index}Menu`}>
                    <Switch
                        defaultChecked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                    />
                </FormItem>
            )
        ))

        ServerAdmin.map((v, index) => (
            // console.log(v)
            Servers.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${index}Ser`}>
                    <Switch
                        defaultChecked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                    />
                </FormItem>
            )
        ))

        FunAdmin.map((v, index) => (
            // console.log(v)
            Fun.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${index}Fun`}>
                    <Switch
                        defaultChecked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                    />
                </FormItem>
            )
        ))
    }
    componentWillReceiveProps(next) {
        // console.log(next)
        Fun=[]
        Servers=[]
        Menu=[]
        const Settings = next.Settings
        const disableds = next.disableds
        for (let key in Settings) {
            if (Settings[key] === 'true') {
                Settings[key] = true
            } else {
                Settings[key] = false
            }
        }
        MenuAdmin.map((v, index) => (
            // console.log(v)
            Menu.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${index}Menu`}>
                    <Switch
                        checked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                    />
                </FormItem>
            )
        ))

        ServerAdmin.map((v, index) => (
            // console.log(v)
            Servers.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${index}Ser`}>
                    <Switch
                        checked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                    />
                </FormItem>
            )
        ))

        FunAdmin.map((v, index) => (
            // console.log(v)
            Fun.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${index}Fun`}>
                    <Switch
                        checked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                    />
                </FormItem>
            )
        ))
    }
    render() {
        return (
            <div>
                <Collapse
                    defaultActiveKey={['1', '2', '3']}
                    onChange={this.callback.bind(this)}
                    bordered={false}>
                    <Panel header="功能控制" key="1">
                        {Fun}
                    </Panel>
                    <Panel header="系统控制" key="2">
                        {Servers}
                    </Panel>
                    <Panel header="菜单控制" key="3">
                        {Menu}
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default SimpleSwitch;