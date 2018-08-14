import React, { Component } from 'react';
import { List, Icon } from 'antd'

class ShowData extends Component {
    state = {
        datasource:[],
        targetData:{}
    }
    
    render() {
        const { targetData } = this.props
        console.log(targetData)
        return (
            <List
                bordered
                dataSource={targetData}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            >
            </List>
        );
    }
}

export default ShowData;