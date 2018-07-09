import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { Searchs, ActionAPI, Del } from '../../Math/APIconfig'
import { getFetch, getTime, getTimeFetch } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse, notification } from 'antd'
import PopWindowsAction from './PopWindowsAction'
const Panel = Collapse.Panel

class PopWindows extends Component {
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
                title: 'FormAction',
                dataIndex: 'FormAction',
                // key: 'PK',
            }, {
                title: 'FormName',
                dataIndex: 'FormName',
                // key: 'PK',
            }, {
                title: 'Author',
                dataIndex: 'Author',
                // key: 'PK',
            }],
            ActiveKey: ['1'],
            //表单数据
            TableValue: {},
            clearTable: false,
            disabled: true,
            clearObj: {
                Author: '',
                BranchID: "STD",
                ConditionControlAssembly: '',
                ConditionControlNameSpace: '',
                CreateTime: getTime(),
                DataSource: '',
                DeleteFlag: 0,
                DisplayAssembly: '',
                DisplayNamespace: '',
                DisplayToolbar: false,
                EntityPk: -1,
                FK: -1,
                FormAction: '',
                FormName: '',
                GuidString: null,
                ImmediatelyQuery: false,
                IsDisplayConditionControl: false,
                IsUseCacheServer: false,
                LastModifyTime: getTime(),
                LastUpdater: null,
                LineID: -1,
                Module: '',
                MultiSelect: false,
                Note: null,
                OneRowAutoPopForm: false,
                OriginalGuidString: null,
                PK: -1,
                RelateObjectGuid: null,
                SQLScripeGUID: '',
                SearchControlConfig: null,
                SearchControlConfigGuid: null,
                SearchFormAssembly: '',
                SearchFormHeight: '',
                SearchFormNameSpace: '',
                SearchFormShowPosition: "01",
                SearchFormWide: '',
                SoftSystemCode: "GOS",
                SqlCode: '',
                SqlScripe: {
                    Author: '',
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
                Tag: null,
                UseClientCache: false,
                Version: 1,
                VersionNum: 1,
                WorkFlowGuid: "",
                WorkFlowState: "",
            }
        }
    }

    //初始加载数据
    componentDidMount() {
        getFetch(Searchs().Pop, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
                TableValue: this.state.clearObj
            })
        })
    }
    //点击搜索加载数据
    GetData = (SearchValue) => {
        getFetch(Searchs(SearchValue).Pop, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
                TableValue: this.state.clearObj
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
        if (key === 1) {
            this.setState({
                ActiveKey: key === undefined ? ['2'] : ['1'],
                disabled: true
            })
        } else {
            this.setState({
                ActiveKey: key === undefined ? ['2'] : ['1'],
            })
        }

    }
    //点击表单获取得数据
    TableEmitData = (TableValue) => {
        // console.log(TableValue)
        getTimeFetch(ActionAPI(TableValue.PK).Pop, (res) => {
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
                this.clear.SqlScripe.LastModifyTime = getTime()
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
                getTimeFetch(Del(this.state.TableValue.PK).Pop, (res) => {
                    if (res === 'True') {
                        notification.success({
                            message: '提示',
                            description: '删除成功'
                        })
                        this.GetData()
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
                        <PopWindowsAction
                            clear={this.clear}
                            TableValue={TableValue}
                            disabled={disabled}
                        ></PopWindowsAction>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default PopWindows;

