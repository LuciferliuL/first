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

class SimpleSwitchEdit extends Component {
    constructor(props) {
        super(props)
        this.Menu = [],
            this.Servers = [],
            this.Fun = []
    }
    callback = (key) => {
        console.log(key);
    }
    SelectChange = (key, value) => {
        // console.log(key +'-----'+ value)
        this.props.SelectChange(key, value)
    }
    componentWillMount() {
        const { disableds, Settings } = this.props
        console.log(Settings)//如果是修改  需要JSON转换 TODO
        for (let key in Settings) {
            if (Settings[key] === 'true') {
                Settings[key] = true
            } else {
                Settings[key] = false
            }
        }
        MenuAdmin.map((v, index) => {
            let Randoms = Math.random()
            return this.Menu.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${(index + 1) * Randoms}Menu`}>
                    <Switch
                        defaultChecked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                        onChange={this.SelectChange.bind(this, v.Code)}
                    />
                </FormItem>
            )
        }
            // console.log(v)

        )

        ServerAdmin.map((v, index) => {
            let Randoms = Math.random()
            // console.log(v)
            return this.Servers.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${(index + 1) * Randoms}Ser`}>
                    <Switch
                        defaultChecked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                        onChange={this.SelectChange.bind(this, v.Code)}
                    />
                </FormItem>
            )
        })

        FunAdmin.map((v, index) => {

            let Randoms = Math.random()
            // console.log(v)
            return this.Fun.push(
                <FormItem label={v.Name} {...formItemLayout} key={`${(index + 1) * Randoms}Fun`}>
                    <Switch
                        defaultChecked={Settings[v.Code]}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                        onChange={this.SelectChange.bind(this, v.Code)}
                    />
                </FormItem>
            )
        })
    }
    render() {
        return (
            <div>
                <Collapse
                    defaultActiveKey={['1', '2', '3']}
                    onChange={this.callback.bind(this)}
                    bordered={false}>
                    <Panel header="功能控制" key="1">
                        {this.Fun}
                    </Panel>
                    <Panel header="系统控制" key="2">
                        {this.Servers}
                    </Panel>
                    <Panel header="菜单控制" key="3">
                        {this.Menu}
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default SimpleSwitchEdit;