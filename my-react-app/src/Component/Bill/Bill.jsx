import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { Searchs, ActionAPI, Del } from '../../Math/APIconfig'
import { getFetch, getTime, getTimeFetch } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse, notification, Spin } from 'antd'
import BillAction from './BillAction'
const Panel = Collapse.Panel

class Bill extends Component {
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
            }, {
                title: 'CreateTime',
                dataIndex: 'CreateTime'
            }],
            ActiveKey: ['1'],
            //表单数据
            TableValue: {},
            clearTable: false,
            disabled: true,
            clearObj: {
                // ActionName: "",
                Author: "",
                BillCatalog: "",
                BillPrintCode: null,
                BillScripe: "",
                BillTypeCode: "",
                BillTypeName: "",
                BranchID: "STD",
                ClassAssembly: "",
                ClassName: "",
                ClassNameSpace: "",
                CreateTime: "",
                DQueryEnable: null,
                DQueryID: -1,
                DataSource: 1,
                DeleteFlag: 0,
                DisplayBillFormAssembly: "JZT.UI",
                DisplayBillFormNameSpace: "JZT.UI.FlowControl.BillReDisplayForm",
                EditControlAssembly: "JZT.GOS.Finance.Win",
                EditControlNameSpace: "JZT.GOS.Finance.Win.EditSecondClearControl",
                EditWinAssembly: "JZT.UI",
                EditWinNameSpace: "JZT.UI.FlowControl.BaseBillForm",
                FK: -1,
                HpClassNameSpace: "",
                IncludeChild: "",
                Initial: null,
                InitialAssemblyRef: null,
                IsBpm: false,
                IsLoadNewAssemblyAndNameSpace: false,
                IsOpen: null,
                LastModifyTime: "",
                LineID: -1,
                MasterTableName: "",
                Module: null,
                NewDisplayBillFormAssembly: null,
                NewDisplayBillFormNameSpace: null,
                NewEditControlAssembly: null,
                NewEditControlNameSpace: null,
                NewEditWinAssembly: null,
                NewEditWinNameSpace: null,
                NewValidateManager: null,
                NewValidateManagerGuid: null,
                Note: null,
                // OrgName: null,
                PK: -1,
                ParamString: "ACD",
                PrintSqlNames: null,
                QueryBillFormAssembly: "JZT.UI",
                QueryBillFormNameSpace: "JZT.UI.FlowControl.QueryBillForm",
                QueryCondControlAssembly: "QueryCondControlAssembly",
                QueryCondControlNameSpace: "QueryCondControlNameSpace",
                QueryDataRightCode: null,
                QuerySqlGuid: null,
                SQLScripe: null,
                ServerValidate: null,
                ServerValidateGuid: null,
                SloveTableName: "",
                Tag: null,
                Text: "",
                URL: null,
                ValidateClassAssembly: "Test",
                ValidateClassNameSpace: "Test",
                ValidateManager: null,
                ValidateManagerGuid: null,
                Version: 1,
                WorkFlowGuid: "",
                WorkFlowState: "",
            },
            loading:true
        }
    }

    //初始加载数据
    componentDidMount() {
        getFetch(Searchs().BillAPI, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
                loading:false
            })
        })
    }
    //点击搜索加载数据
    GetData = (SearchValue) => {
        this.setState({
            loading:true
        })
        getFetch(Searchs(SearchValue).BillAPI, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
                TableValue: {},
                loading:false
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
        getTimeFetch(ActionAPI(TableValue.PK).Bill, (res) => {
            // console.log(res)
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
                getTimeFetch(Del(this.state.TableValue.PK).BillDefine, (res) => {
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
                                type={'radio'}
                                Data={Data}
                                columns={columns}
                                TableEmitData={this.TableEmitData.bind(this)}
                                clearTable={clearTable}
                            ></Tables>
                        </Panel>
                        <Panel key='2' showArrow={true} header='详细信息'>
                            <BillAction
                                clear={this.clear}
                                TableValue={TableValue}
                                disabled={disabled}
                                ActiveKey={this.ActiveKey}
                            ></BillAction>
                        </Panel>
                    </Collapse>
                </Spin>
            </div>
        );
    }
}

export default Bill;

