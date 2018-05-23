import React, { Component } from 'react';
import { Button, Input } from 'antd'
const ButtonGroup = Button.Group
const InputSearch = Input.Search

/**
 * @param GetData  查询获取数据
 */

class TablesBtn extends Component {
    shouldComponentUpdate(){
        return false
    }
    AddAction =(name)=>{
        this.props.AddAction(name)
    }
    render() {
        return (
            <div>
                <InputSearch
                    placeholder="input search text"
                    onSearch={value => this.props.GetData(value)}
                    enterButton
                    style={{ width: 200 }}
                />
                <ButtonGroup>
                    <Button type="primary" onClick={this.AddAction.bind(this,'Add')}>增加</Button>
                    <Button type="primary" onClick={this.AddAction.bind(this,'Edit')}>修改</Button>
                    <Button type='danger' onClick={this.AddAction.bind(this,'Delet')}>删除</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default TablesBtn;