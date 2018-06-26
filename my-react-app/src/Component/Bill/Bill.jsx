import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { Searchs } from '../../Math/APIconfig'
import { getFetch, getTime, Errors } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse, notification } from 'antd'
import BillAction from './BillAction'
const Panel = Collapse.Panel
const E = ['Text', 'InitialAssemblyRef', 'Initial']
class Bill extends Component {
    state = {
        //表格数据
        Data: [],
        //表格列
        columns: [{
            title: 'PK',
            dataIndex: 'PK',
            key: 'PK',
        }, {
            title: 'BillTypeCode',
            dataIndex: 'BillTypeCode',
            // key: 'PK',
        }, {
            title: 'BillCatalog',
            dataIndex: 'BillCatalog',
            // key: 'PK',
        }, {
            title: 'BillScripe',
            dataIndex: 'BillScripe',
        }, {
            dataIndex: 'BillTypeName',
            title: 'BillTypeName'
            // key: 'PK',
        }, {
            title: 'Author',
            dataIndex: 'Author',
            // key: 'PK',
        }],
        ActiveKey: ['1'],
        visible: false,
        //表单数据
        TableValue: {},
        clearTable: false,
        disabled: true
    }
    //初始加载数据
    componentDidMount() {
        getFetch(Searchs().BillAPI, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
            })
        })
    }
    //点击搜索加载数据
    GetData = (SearchValue) => {
        getFetch(Searchs(SearchValue).BillAPI, (res) => {
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
    //激活得Collapse
    callback = (key) => {
        this.setState({
            ActiveKey: key === undefined ? ['2'] : ['1']
        })
    }
    //点击表单获取得数据
    TableEmitData = (TableValue) => {
        this.setState({
            TableValue: JSON.parse(JSON.stringify(TableValue))
        })
    }
    AddAction = (name) => {
        if (name === 'Add') {
            let clear = JSON.parse(JSON.stringify(this.state.clearObj))
            clear.CreateTime = getTime()
            clear.LastModifyTime = getTime()
            this.setState({
                TableValue: {},
                ActiveKey: ['2'],
                disabled: false
            })
        } else if (name === 'Edit') {
            if (this.state.TableValue.PK === undefined) {
                notification.warning({
                    message: '错误提示',
                    description: '请选择一个节点',
                });
            } else {
                this.setState({
                    ActiveKey: ['2'],
                    disabled: false
                })
                return
            }
        } else {
            if (this.state.TableValue.PK === undefined) {
                notification.warning({
                    message: '错误提示',
                    description: '请选择一个节点',
                });
            } else {
                //TODO 删除
            }
        }
    }
    handleOk = () => {
        let D = this.state.TableValue
        let counts = 0
        E.map((v) => (
            D[v] === '' ? Errors(v) : counts++
        ))
        if (counts === E.length) {
            console.log(this.state.TableValue)
            //TODO   发送请求
            this.setState({
                visible: false,
                TableValue: JSON.parse(JSON.stringify(this.state.clearObj)),
                clearTable: false
            })
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            TableValue: JSON.parse(JSON.stringify(this.state.clearObj)),
            clearTable: false
        })
    }



    render() {
        const { Data, columns, ActiveKey, TableValue, clearTable, disabled } = this.state
        return (
            <div>
                <TablesBtn
                    GetData={this.GetData.bind(this)}
                    AddAction={this.AddAction.bind(this)}
                ></TablesBtn>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    onChange={this.callback.bind(this)}
                    accordion
                    activeKey={ActiveKey}
                    showArrow={true}
                >
                    <Panel header='表单' key="1" showArrow={false}>
                        <Tables
                            Data={Data}
                            columns={columns}
                            TableEmitData={this.TableEmitData.bind(this)}
                            clearTable={clearTable}
                        ></Tables>
                    </Panel>
                    <Panel key='2' showArrow={false}>
                        <BillAction
                            TableValue={TableValue}
                            disabled={disabled}
                        ></BillAction>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default Bill;

