import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { Searchs, ActionAPI, Del } from '../../Math/APIconfig'
import { getFetch, getTime, getTimeFetch } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse, notification, Spin } from 'antd'
import SQLManageAction from './SQLManageAction'
const Panel = Collapse.Panel

class SQLManage extends Component {
    constructor(props) {
        super(props)
        this.clear = {}
        this.state = {
            //表格数据
            Data: [],
            //表格列
            columns: [{
                title: 'PK',
                dataIndex: 'PK',
                key: 'PK',
            }, {
                title: 'CreateTime',
                dataIndex: 'CreateTime',
                // key: 'PK',
            }, {
                title: 'LastModifyTime',
                dataIndex: 'LastModifyTime',
                // key: 'PK',
            }, {
                title: 'Author',
                dataIndex: 'Author',
                // key: 'PK',
            }, {
                title: 'SqlName',
                dataIndex: 'SqlName'
            }],
            ActiveKey: ['1'],
            //表单数据
            TableValue: {},
            clearTable: false,
            disabled: true,
            clearObj: {
                Author: this.props.match.params.id,
                BranchID: "STD",
                CreateTime: getTime(),
                DeleteFlag: 0,
                FK: -1,
                GuidString: null,
                LastModifyTime: getTime(),
                LastUpdater: null,
                LineID: -1,
                Module: '',
                Note: '',
                OriginalGuidString: null,
                PK: -1,
                QueryDataRightCode: null,
                ScriptType: '',
                SoftSystemCode: "GOS",
                SqlName: '',
                SqlScripe: '',
                TableDisplayerGuid: null,
                Tag: null,
                Version: 2,
                VersionNum: 2,
                WorkFlowGuid: "",
                WorkFlowState: "",
            },
            loading: true
        }
    }

    //初始加载数据
    componentDidMount() {
        getFetch(Searchs().SQLManage, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
                TableValue: this.state.clearObj,
                loading: false
            })
        })
    }
    //点击搜索加载数据
    GetData = (SearchValue) => {
        this.setState({
            loading: true
        })
        getFetch(Searchs(SearchValue).SQLManage, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
                TableValue: this.state.clearObj,
                loading: false
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
        console.log(key)
        if (key === '1') {
            this.setState({
                ActiveKey: key === undefined ? ['2'] : ['1'],
                disabled: true,
                clearTable:false
            })
        } else {
            this.setState({
                ActiveKey: key === undefined ? ['2'] : ['1'],
                clearTable:true
            })
        }
    }
    //点击表单获取得数据
    TableEmitData = (TableValue) => {
        // console.log(TableValue)
        getTimeFetch(ActionAPI(TableValue.PK).SQL, (res) => {
            console.log(res)
            this.setState({
                TableValue: JSON.parse(JSON.stringify(res)),
                disabled: true
            })
        })
    }
    AddAction = (name) => {
        if (name === 'Add') {
            this.clear = JSON.parse(JSON.stringify(this.state.clearObj))
            this.clear.CreateTime = getTime()
            this.clear.LastModifyTime = getTime()
            this.setState({
                TableValue: this.clear,
                ActiveKey: ['2'],
                disabled: false,
            })
        } else if (name === 'Edit') {
            if (this.state.TableValue.PK === undefined) {
                notification.warning({
                    message: '错误提示',
                    description: '请选择一个节点',
                });
            } else {
                this.clear = this.state.TableValue
                this.clear.LastModifyTime = getTime()
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
                getTimeFetch(Del(this.state.TableValue.PK).SQL, (res) => {
                    if (res === 'True') {
                        notification.success({
                            message: '提示',
                            description: '删除成功'
                        })
                        this.ActiveKey()
                    } else {
                        notification.warning({
                            message: '提示',
                            description: res
                        })
                    }
                })
            }
        }
    }
    ActiveKey = () => {
        this.clear = JSON.parse(JSON.stringify(this.state.clearObj))
        // console.log(res)
        this.GetData()
        this.setState({
            ActiveKey: ['1'],
            disabled: true,
            TableValue: this.clear,
        })
    }
    render() {
        const { Data, columns, ActiveKey, TableValue, clearTable, disabled, loading } = this.state
        return (
            <div>
                <Spin spinning={loading}>
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
                    >
                        <Panel header='表单' key="1" showArrow={true}>
                            <Tables
                                Data={Data}
                                columns={columns}
                                TableEmitData={this.TableEmitData.bind(this)}
                                clearTable={clearTable}
                                type={'radio'}
                            ></Tables>
                        </Panel>
                        <Panel key='2' showArrow={true} header='详细信息'>
                            <SQLManageAction
                                clear={this.clear}
                                TableValue={TableValue}
                                disabled={disabled}
                                ActiveKey={this.ActiveKey}
                            ></SQLManageAction>
                        </Panel>
                    </Collapse>
                </Spin>
            </div>
        );
    }
}

export default SQLManage;

