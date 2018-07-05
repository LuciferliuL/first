import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { Searchs, Save, Del } from '../../Math/APIconfig'
import { getFetch, getTime, Errors, postFetchForm } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse, Modal, notification, Button } from 'antd'
import WindowsAction from '../Windows/WindowsAction'
import WindowsEdit from '../Windows/WindowsEdit'
const Panel = Collapse.Panel
const ButtonGroup = Button.Group
const E = ['Text', 'InitialAssemblyRef', 'Initial']
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
        clearTable: false
    }
    componentDidMount() {
        getFetch(Searchs().WindowsAPI, (res) => {
            // console.log(res)
            this.setState({
                Data: res,
            })
        })
    }
    GetData = (SearchValue) => {
        getFetch(Searchs(SearchValue).WindowsAPI, (res) => {
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
        this.setState({
            TableValue: JSON.parse(JSON.stringify(TableValue))
        })
    }
    //新增与编辑报错 An error occurred while updating the entries. See the inner exception for details.
    AddAction = (name) => {
        if (name === 'Add') {
            let clear = JSON.parse(JSON.stringify(this.state.clearObj))
            clear.CreateTime = getTime()
            this.setState({
                TableValue: clear,
                visible: true,
                clearTable: true
            })
        } else if (name === 'Edit') {
            console.log(this.state.TableValue)
            if (this.state.TableValue.PK === undefined || this.state.TableValue.PK === -1) {
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
                    clearTable: true
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
                getFetch(Del(this.state.TableValue.PK).Windows, (res) => {
                    if (res === 'True') {
                        notification.success({
                            message: '提示',
                            description: '删除成功'
                        })
                    } else {
                        notification.warning({
                            message: '提示',
                            description: res
                        })
                        this.GetData()
                    }
                })
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
            let data = this.state.TableValue
            //TODO   发送请求
            postFetchForm(Save().Windows, data, (res) => {
                if (res.IsSuccess === 'True') {
                    notification.success({
                        message: '提示',
                        description: '可以执行同步',
                        key: 1,
                        btn: <ButtonGroup>
                            <Button onClick={() => { this.asyncData(res.SqlList) }} size='small'>同步</Button>
                            <Button onClick={() => { notification.close(this.key) }} size='small'>取消</Button>
                        </ButtonGroup>
                    })
                } else {
                    notification.warning({
                        message: '提示',
                        description: res.ErrMessage
                    })
                }
                this.GetData()
            })
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
    handleChange = (key, value) => {
        if (key === 'ActionType') {
            if (value === '自定义的InitialAction') {
                let Table = this.state.TableValue
                Table.InitialAssemblyRef = 'JZT.GOS.Equipment.Win'
                Table.Initial = 'JZT.GOS.Equipment.Win.WorkFlow.LendingGoodsAuditForm'
                this.setState({
                    TableValue: Table
                })
            } else if (value === '编辑单据EditBill') {
                let Table = this.state.TableValue
                Table.InitialAssemblyRef = 'JZT.UI'
                Table.Initial = 'JZT.GOS.Win.InitAction.EditBillFormByBillCodeInitial'
                this.setState({
                    TableValue: Table
                })
            } else {
                let Table = this.state.TableValue
                Table.InitialAssemblyRef = 'JZT.UI'
                Table.Initial = 'JZT.UI.Query.QueryExtendForm'
                this.setState({
                    TableValue: Table
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

    asyncData = (value) => {
        let path = {
            pathname: '/Home/AsyncData',
            state: value
        }
        this.props.history.push(path)
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
                    <Panel header='基本信息' key='2' showArrow={false}>
                        <WindowsAction
                            TableValue={TableValue}
                        ></WindowsAction>
                    </Panel>
                </Collapse>
                <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1440}
                >
                    <WindowsEdit
                        TableValue={TableValue}
                        handleChange={this.handleChange.bind(this)}
                    ></WindowsEdit>
                </Modal>
            </div>
        );
    }
}

export default Windows;

