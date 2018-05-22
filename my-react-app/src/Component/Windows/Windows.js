import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { WindowsAPI } from '../../Math/APIconfig'
import { getFetch } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse } from 'antd'
import WindowsAction from '../Windows/WindowsAction'
const Panel = Collapse.Panel

class Windows extends Component {
    state = {
        Data: [],
        columns: [{
            title: 'PK',
            dataIndex: 'PK',
            key: 'PK',
        }, {
            title: 'Action',
            dataIndex: 'Action',
            // key: 'PK',
        }, {
            title: 'ActionType',
            dataIndex: 'ActionType',
            // key: 'PK',
        }, {
            title: 'Author',
            dataIndex: 'Author',
            // key: 'PK',
        }, {
            title: 'Notes',
            dataIndex: 'Notes',
            // key: 'PK',
        }],
        ActiveKey:['1']
    }
    componentDidMount() {
        getFetch(WindowsAPI().Searchs, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
            })
        })
    }
    GetData = (SearchValue) => {
        getFetch(WindowsAPI(SearchValue).Searchs, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
                TableValue: {}
            })
        })
    }
    RowSelected = (e) => {
        // console.log(e)
        return {
            onClick: (e) => {
                console.log(e)
            }
        }
    }
    callback = (key) => {
        this.setState({
            ActiveKey:key === undefined?['2']:['1']
        })
    }
    TableEmitData = (TableValue) => {
        this.setState({
            TableValue: JSON.parse(JSON.stringify(TableValue))
        }, () => {
            console.log(this.state.TableValue)
        })

    }
    render() {
        const { Data, columns, ActiveKey } = this.state
        return (
            <div>
                <TablesBtn
                    GetData={this.GetData.bind(this)}
                ></TablesBtn>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    onChange={this.callback.bind(this)} 
                    accordion
                    activeKey={ActiveKey}
                >
                    <Panel header='表单' key="1" showArrow={false}>
                        <Tables
                            Data={Data}
                            columns={columns}
                            TableEmitData={this.TableEmitData.bind(this)}
                        ></Tables>
                    </Panel>
                    <Panel header='基本信息' key='2' showArrow={false}>
                        <WindowsAction></WindowsAction>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default Windows;

