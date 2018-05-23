import React, { Component } from 'react';
import { Collapse, Form, Switch } from 'antd'
const Panel = Collapse.Panel;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 8 },
};
const MenuAdmin = ['允许导出数据', '允许状态扭转', '允许查看工作流', '允许打印所有', '允许打印', '允许重设'
    , '允许删除', '允许编辑', '允许查看', '允许查分公司数据']

class SimpleSwitch extends Component {
    callback = (key) => {
        console.log(key);
    }
    Change = (Name, e) => {
        console.log(Name + '---' + e)
    }
    render() {
        const Menu = []
        MenuAdmin.map((v,index) => (
            Menu.push(
                <FormItem label={v} {...formItemLayout} key={index}>
                    <Switch
                        defaultChecked
                        onChange={this.Change.bind(this)}
                        checkedChildren='true'
                        uncheckedchildren='false'
                    />
                </FormItem>
            )
        ))
        return (
            <div>
                <Collapse defaultActiveKey={['1', '2', '3']} onChange={this.callback.bind(this)} bordered={false}>
                    <Panel header="功能控制" key="1">
                        <FormItem label='分公司勾选联动' {...formItemLayout}>
                            <Switch
                                defaultChecked
                                onChange={this.Change.bind(this)}
                                checkedChildren='true'
                                uncheckedchildren='false'
                            />
                        </FormItem>
                        <FormItem label='分公司允许多选' {...formItemLayout}>
                            <Switch
                                defaultChecked
                                onChange={this.Change.bind(this)}
                                checkedChildren='true'
                                uncheckedchildren='false'
                            />
                        </FormItem>
                    </Panel>
                    <Panel header="系统控制" key="2">
                        <FormItem label='查询前参数检查' {...formItemLayout}>
                            <Switch
                                defaultChecked
                                onChange={this.Change.bind(this)}
                                checkedChildren='true'
                                uncheckedchildren='false'
                            />
                        </FormItem>
                        <FormItem label='允许SQL自动重构' {...formItemLayout}>
                            <Switch
                                defaultChecked
                                onChange={this.Change.bind(this)}
                                checkedChildren='true'
                                uncheckedchildren='false'
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