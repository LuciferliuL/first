import React, { Component } from 'react';
import { Button, Input } from 'antd'
const ButtonGroup = Button.Group
const InputSearch = Input.Search

/**
 * @param GetData  查询获取数据
 */

class TablesBtn extends Component {
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
                    <Button type="primary">增加</Button>
                    <Button type="primary">修改</Button>
                    <Button type='danger'>删除</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default TablesBtn;