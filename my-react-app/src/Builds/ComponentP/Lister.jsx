import React from 'react'
import { List, Radio, Checkbox } from 'antd';
const RadioGroup = Radio.Group


export default class Lister extends React.Component {
    state = {
        data: [],
        // loading: false,
    }

    componentWillMount() {
        // console.log(this.props.data)
        this.setState({
            data: this.props.data
        })
    }
    render() {
        // console.log(this.props.data)
        if (this.props.Type) {
            return (
                <div className="demo-infinite-container">
                    <RadioGroup value={1}>
                        <List
                            header={this.props.name}
                            dataSource={this.props.data}
                            renderItem={item => (
                                < List.Item key={item.id}>
                                    <List.Item.Meta
                                        description={<Radio value={item.id}></Radio>}
                                    />
                                    {item.ServerName}
                                </List.Item>
                            )}
                        >
                        </List>
                    </RadioGroup>
                </div >
            );
        } else {
            return (
                <div className="demo-infinite-container">
                    <List
                        header={this.props.name}
                        dataSource={this.props.data}
                        renderItem={item => (
                            < List.Item key={item.id}>
                                <List.Item.Meta
                                    description={<Checkbox checked={item.id !== 1 ? true : false}></Checkbox>}
                                />
                                {item.ServerName}
                            </List.Item>
                        )}
                    >
                    </List>
                </div >
            );
        }

    }
}

