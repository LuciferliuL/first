import React, { Component } from 'react';
import Tables from '../Tables/Tables'
import { Searchs, ActionAPI, Save, Del } from '../../Math/APIconfig'
import { getFetch, getTime, postFetchForm } from '../../Math/Math'
import TablesBtn from '../Tables/TablesBtn'
import { Collapse, Modal, notification, Button } from 'antd'
import SimpleAction from './SimpleAction'
import SimpleEdit from './SimpleEdit'
const Panel = Collapse.Panel
const ButtonGroup = Button.Group

class Simple extends Component {
    constructor(props) {
        super(props)
        this.Collapse = 0
        this.state = {
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
                Author: '',
                BillTypeCode: '',
                BranchID: "STD",
                CreateTime: '',
                DQueryCaption: '',
                DQueryMasterAssembly: '',
                DQueryMasterFullName: '',
                DQueryParamAssembly: '',
                DQueryParamFullName: '',
                DQuerySlaveAssembly: null,
                DQuerySlaveFullName: null,
                DeleteFlag: '',
                FK: -1,
                GuidString: null,
                LastModifyTime: getTime(),
                LastUpdater: null,
                LayoutMode: '',
                LineID: 9991,
                Module: '',
                Note: null,
                OriginalGuidString: null,
                PK: -1,
                QueryConfig: null,
                QueryExtend: [{
                    BillTypeCode: '',
                    BranchID: "STD",
                    CreateTime: getTime(),
                    DQueryCaption: '',
                    DQueryName: '',
                    DQuerySql: {
                        Author: '',
                        BranchID: "STD",
                        CreateTime: '',
                        DeleteFlag: 0,
                        FK: -1,
                        GuidString: null,
                        LastModifyTime: getTime(),
                        LastUpdater: null,
                        LineID: -1,
                        Module: null,
                        Note: null,
                        OriginalGuidString: null,
                        PK: -1,
                        QueryDataRightCode: null,
                        ScriptType: null,
                        SoftSystemCode: "GOS",
                        SqlName: '',
                        SqlScripe: '',
                        TableDisplayerGuid: null,
                        Tag: null,
                        Version: 5,
                        VersionNum: 4,
                        WorkFlowGuid: "",
                        WorkFlowState: "",
                    },
                    DataSource: 1,
                    DeleteFlag: 0,
                    FK: 0,
                    GuidString: null,
                    IsPaging: 1,
                    IsUseCacheServer: 1,
                    LastModifyTime: getTime(),
                    LineID: 0,
                    Note: null,
                    OriginalGuidString: null,
                    PK: -1,
                    QuerySqlGuid: null,
                    SoftSystemCode: "GOS",
                    SolrBranch: null,
                    SolrScript: null,
                    SolrScriptGuid: null,
                    Tag: null,
                    Version: 1,
                    WorkFlowGuid: "",
                    WorkFlowState: "",
                }],
                Settings: ' { "ShowOrgSelect": "true", "ParamsCheck": "true", "AllowOrgMultiSelect": "true", "IsLinkOnOrgSelect": "true", "SQLRebuilding": "true", "AllowView": "true", "AllowEdit": "true", "AllowDelete": "true", "AllowReset": "true", "AllowPrint": "true", "PrintAll": "true", "AllowWorkFlowQuery": "true", "AllowReverseState": "true", "AllowExport": "true" }',
                SoftSystemCode: 'GOS',
                Tag: null,
                Version: 2,
                VersionNum: 4,
                WorkFlowGuid: "",
                WorkFlowState: "",
            },
            TableValue: {},
            clearTable: false,
        }
    }
    componentDidMount() {
        let clear = JSON.parse(JSON.stringify(this.state.clearObj))
        getFetch(Searchs().SimpleAPI, (res) => {
            this.setState({
                Data: res,
                TableValue: clear
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
        getFetch(ActionAPI(TableValue.PK).Simple, (res) => {
            console.log(res)
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
                clearTable: true,
            })
        } else if (name === 'Edit') {
            console.log(this.state.TableValue.PK)
            if (this.state.TableValue.PK === -1) {
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
                    clearTable: true,
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
                let PK = this.state.TableValue.PK
                getFetch(Del(PK).Simple, (res) => {
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
    handleOk = () => {
        // console.log(this.state.TableValue)
        let clear = JSON.parse(JSON.stringify(this.state.clearObj))
        this.setState({
            visible: false,
            TableValue: clear,
            clearTable: false,
        })
    }
    handleCancel = () => {
        let clear = JSON.parse(JSON.stringify(this.state.clearObj))
        this.setState({
            visible: false,
            TableValue: clear,
            clearTable: false,
        })
    }
    handleChange = (key, value) => {//第一层
        // console.log(key, value)
        this.setState({
            TableValue: Object.assign(this.state.TableValue, { [key]: value })
        })
    }
    isOK = (DataObj) => {
        console.log(DataObj)
        postFetchForm(Save().Simple, DataObj, (res) => {
            if (res.IsSuccess === 'True') {
                this.GetData()
                notification.success({
                    message: '提示',
                    description: '可以执行同步',
                    btn: <ButtonGroup>
                        <Button onClick={this.asyncData(res.SqlList)} size='small'>同步</Button>
                        <Button onClick={() => { notification.close() }} size='small'>取消</Button>
                    </ButtonGroup>
                })
            } else {
                notification.warning({
                    message: '提示',
                    description: res.ShortText
                })
            }
        })
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
                >
                    <Panel header='表单' key="1" showArrow={true}>
                        <Tables
                            Data={Data}
                            columns={columns}
                            TableEmitData={this.TableEmitData.bind(this)}
                            clearTable={clearTable}
                        ></Tables>
                    </Panel>
                    <Panel header='基本信息' key='2' showArrow={true}>
                        <SimpleAction
                            key={Math.random()}
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
                    key={Math.random()}
                >
                    <SimpleEdit
                        Collapse={this.Collapse}
                        TableValue={TableValue}
                        isOK={this.isOK.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                    ></SimpleEdit>
                </Modal>
            </div>
        );
    }
}

export default Simple;

