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

class SimpleSwitch extends Component {
    callback = (key) => {
        console.log(key);
    }
    Change = (Name, e) => {
        console.log(Name + '---' + e)
    }
    render() {
        const {disableds, Settings}=this.props
        for(let key in Settings){
            if(Settings[key] === 'true'){
                Settings[key] = true
            }else{
                Settings[key] = false
            }
        }
        const Menu = []
        MenuAdmin.map((v, index) => (
            // console.log(v)
            Menu.push(
                <FormItem label={v.Name} {...formItemLayout} key={index}>
                    <Switch
                        defaultChecked={Settings[v.Code]}
                        onChange={this.Change.bind(this,v.Code)}
                        checkedChildren='true'
                        uncheckedchildren='false'
                        disabled={disableds}
                    />
                </FormItem>
            )
        ))
        return (
            <div>
                <Collapse
                    defaultActiveKey={['1', '2', '3']}
                    onChange={this.callback.bind(this)}
                    bordered={false}>
                    <Panel header="功能控制" key="1">
                        <FormItem label='分公司勾选联动' {...formItemLayout}>
                            <Switch
                                defaultChecked={Settings.IsLinkOnOrgSelect}
                                onChange={this.Change.bind(this, 'IsLinkOnOrgSelect')}
                                checkedChildren='true'
                                uncheckedchildren='false'
                                disabled={disableds}
                            />
                        </FormItem>
                        <FormItem label='分公司允许多选' {...formItemLayout}>
                            <Switch
                                defaultChecked={Settings.AllowOrgMultiSelect}
                                onChange={this.Change.bind(this, 'AllowOrgMultiSelect')}
                                checkedChildren='true'
                                uncheckedchildren='false'
                                disabled={disableds}
                            />
                        </FormItem>
                    </Panel>
                    <Panel header="系统控制" key="2">
                        <FormItem label='查询前参数检查' {...formItemLayout}>
                            <Switch
                                defaultChecked={Settings.ParamsCheck}
                                onChange={this.Change.bind(this, 'ParamsCheck')}
                                checkedChildren='true'
                                uncheckedchildren='false'
                                disabled={disableds}
                            />
                        </FormItem>
                        <FormItem label='允许SQL自动重构' {...formItemLayout}>
                            <Switch
                                defaultChecked={Settings.SQLRebuilding}
                                onChange={this.Change.bind(this, 'SQLRebuilding')}
                                checkedChildren='true'
                                uncheckedchildren='false'
                                disabled={disableds}
                            />
                        </FormItem>
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