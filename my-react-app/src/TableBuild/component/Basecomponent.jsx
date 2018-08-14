import React, { Component } from 'react';
import { Input, List, Button, Icon } from "antd";

const itemtype = [
    {itemkey: 'INPUT', icons: 'plus-square',label:"输入框",required:true, message:'必选',type:'text',id:'input' },
    {itemkey: 'CHECKEDBOX', icons: 'plus-square' },
    {itemkey: 'CHECKEDBOXGROUP', icons: 'plus-square' },
    {itemkey: 'RADIOGROUP', icons: 'plus-square' },
    {itemkey: 'TABLE', icons: 'plus-square' },
    {itemkey: 'LOOKUP', icons: 'plus-square' },
    {itemkey: 'SELECT', icons: 'plus-square' },
    {itemkey: 'TIMEPICKER', icons: 'plus-square' },
]

class Basecomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    //添加元素
    additem = (item) => {
        this.props.additem(item)
    }
    render() {

        return (
            <List
                bordered
                dataSource={itemtype}
                renderItem={item => (
                    <List.Item actions={[<Icon type="plus-square" onClick={this.additem.bind(this,item)} />]}>
                        <List.Item.Meta title={<div><Icon type={item.icons} /><span>{item.itemkey}</span></div>  }
                        />
                    </List.Item>
                )}
            >
            </List>
        );
    }
}

export default Basecomponent;