import React, { Component } from 'react';
import { Select } from 'antd'

const ModuleData = [
    '财务模块','采购模块','价格模块','结算模块','库存模块','其他模块','销售模块','资金模块','系统设置模块'
]
const ActionData = [
    '自定义的InitialAction','编辑单据EditBill','简单通用查询'
]
const Option = Select.Option
class Selects extends Component {
    handleChangeModule = (value)=>{
        console.log(value)
    }
    handleChangeAction = (value)=>{
        console.log(value)
    }
    render() {
        let ModuleItem = []
        ModuleData.map((v,index)=>{
            ModuleItem.push(
                <Option value={v} key={v}>{v}</Option>
            )
        })
        let ActionItem = []
        ActionData.map((v,index)=>{
            ActionItem.push(
                <Option value={v} key={v}>{v}</Option>
            )
        })
        const {SelectKey,defaultValue} = this.props
        if(SelectKey === 'Module'){
            return (
                <Select defaultValue={defaultValue} onChange={this.handleChangeModule.bind(this)}>
                    {ModuleItem}
                </Select>
            );
        }else{
            return (
                <Select defaultValue={defaultValue} onChange={this.handleChangeAction.bind(this)}>
                    {ActionItem}
                </Select>
            );
        }
        
    }
}

export default Selects;