import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { Searchs, ActionAPI } from '../../Math/APIconfig'
import { getFetch, getTime } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse, Modal, notification } from 'antd'
import SimpleAction from './SimpleAction'
import SimpleEdit from './SimpleEdit'
const Panel = Collapse.Panel

class Simple extends Component {
    state = {
        Data: [],
        columns: [{
            title: 'PK',
            dataIndex: 'PK',
            key: 'PK',
        }, {
            title: 'DQueryCaption',
            dataIndex: 'DQueryCaption',
            // key: 'PK',
        }, {
            title: 'BillTypeCode',
            dataIndex: 'BillTypeCode',
            // key: 'PK',
        }, {
            title: 'Author',
            dataIndex: 'Author',
            // key: 'PK',
        }, {
            title: 'BranchID',
            dataIndex: 'BranchID',
            // key: 'PK',
        }],
        ActiveKey: ['1'],
        visible: false,
        clearObj: {
            Action: '',
            ActionType: '',
            Author: '',
            BranchID: "STD",
            CreateTime: '',
            DeleteFlag: 0,
            FK: -1,
            GuidString: null,
            Initial: '',
            InitialAssemblyRef: '',
            IsSingle: true,
            LastModifyTime: getTime(),
            LastUpdater: null,
            LineID: -1,
            Module: '',
            Note: "",
            Notes: '',
            OriginalGuidString: 0,
            PK: -1,
            ParamString: '',
            Shortcuts: null,
            SoftSystemCode: "GOS",
            Tag: null,
            Text: '',
            Version: 1,
            WorkFlowGuid: "",
            WorkFlowState: ""
        },
        TableValue: {},
        clearTable:false
    }
    componentDidMount() {
        getFetch(Searchs().SimpleAPI, (res) => {
            this.setState({
                Data: res,
            })
        })
    }
    GetData = (SearchValue) => {
        getFetch(Searchs(SearchValue).SimpleAPI, (res) => {
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
            ActiveKey: key === undefined ? ['2'] : ['1']
        })
    }
    TableEmitData = (TableValue) => {
        getFetch(ActionAPI(TableValue.PK).Simple,(res)=>{
            this.setState({
                TableValue: JSON.parse(JSON.stringify(res))
            })
        })      
    }
    AddAction = (name) => {
        if (name === 'Add') {
            let clear = JSON.parse(JSON.stringify(this.state.clearObj))
            clear.CreateTime = getTime()
            this.setState({
                TableValue: clear,
                visible: true,
                clearTable:true
            })
        } else if (name === 'Edit') {
            if (this.state.TableValue.PK === undefined) {
                notification.warning({
                    message: '错误提示',
                    description: '请选择一个节点',
                });
            } else {
                let clear = JSON.parse(JSON.stringify(this.state.TableValue))
                clear.LastModifyTime = getTime()
                this.setState({
                    TableValue: clear,
                    visible: true,
                    clearTable:true
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
        console.log(this.state.TableValue)
        //TODO   发送请求
        this.setState({
            visible: false,
            TableValue: JSON.parse(JSON.stringify(this.state.clearObj)),
            clearTable:false
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            TableValue: JSON.parse(JSON.stringify(this.state.clearObj)),
            clearTable:false
        })
    }
    handleChange = (key, value) => {
        if (key === 'ActionType') {          
            if (value === '自定义的InitialAction'){
                let Table = this.state.TableValue
                Table.InitialAssemblyRef = 'JZT.GOS.Equipment.Win'
                Table.Initial = 'JZT.GOS.Equipment.Win.WorkFlow.LendingGoodsAuditForm'
                this.setState({
                    TableValue:Table
                })
            }else if(value === '编辑单据EditBill'){
                let Table = this.state.TableValue
                Table.InitialAssemblyRef = 'JZT.UI'
                Table.Initial = 'JZT.GOS.Win.InitAction.EditBillFormByBillCodeInitial'
                this.setState({
                    TableValue:Table
                })
            }else{
                let Table = this.state.TableValue
                Table.InitialAssemblyRef = 'JZT.UI'
                Table.Initial = 'JZT.UI.Query.QueryExtendForm'
                this.setState({
                    TableValue:Table
                })
            }
            this.setState({
                TableValue: Object.assign(this.state.TableValue, { [key]: value })
            })
        } else {
            this.setState({
                TableValue: Object.assign(this.state.TableValue, { [key]: value })
            })
        }
    }


    render() {
        const { Data, columns, ActiveKey, TableValue, visible, clearTable } = this.state
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
                    <Panel header='表单' key="1" showArrow={false}>
                        <Tables
                            Data={Data}
                            columns={columns}
                            TableEmitData={this.TableEmitData.bind(this)}
                            clearTable={clearTable}
                        ></Tables>
                    </Panel>
                    <Panel header='基本信息' key='2' showArrow={false}>
                        <SimpleAction
                            TableValue={TableValue}
                        ></SimpleAction>
                    </Panel>
                </Collapse>
                <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1440}
                >
                    <SimpleEdit
                        TableValue={TableValue}
                        handleChange={this.handleChange.bind(this)}
                    ></SimpleEdit>
                </Modal>
            </div>
        );
    }
}

export default Simple;

