import React from 'react'
import { Tabs } from 'antd';
import SimpleFlag from './SimpleFlag'
import { getTime } from '../../Math/Math'
const TabPane = Tabs.TabPane;

class SimpleTabs extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const { QueryExtend } = this.props
        const panes = []
        QueryExtend.map((v, index) => {
            if (v.DQueryCaption === '') {
                return true
            } else {
                return panes.push(
                    {
                        title:
                            `${v.DQueryCaption}`,
                        content: <SimpleFlag QueryExtend={v} key={index} disableds={true}></SimpleFlag>,
                        key: `${index}`,
                        closable: false
                    }
                )
            }
        })
        console.log(panes)
        if (QueryExtend[0].DQueryCaption === '') {
            this.state = {
                Addkey: true,
                activeKey: '',
                panes,
                Data: [{
                    BillTypeCode: '',
                    BranchID: "STD",
                    CreateTime: getTime(),
                    DQueryCaption: '',
                    DQueryName: '',
                    DQuerySql: [{
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
                    }],
                    DataSource: 1,
                    DeleteFlag: 0,
                    FK: 0,
                    GuidString: null,
                    IsPaging: 0,
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
                QueryExtend_: {
                    BillTypeCode: '',
                    BranchID: "STD",
                    CreateTime: getTime(),
                    DQueryCaption: '',
                    DQueryName: '',
                    DQuerySql: [{
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
                    }],
                    DataSource: 1,
                    DeleteFlag: 0,
                    FK: 0,
                    GuidString: null,
                    IsPaging: 0,
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
                }
            };
        } else {
            let D = JSON.parse(JSON.stringify(QueryExtend))
            D.push({
                BillTypeCode: '',
                BranchID: "STD",
                CreateTime: getTime(),
                DQueryCaption: '',
                DQueryName: '',
                DQuerySql: [{
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
                }],
                DataSource: 1,
                DeleteFlag: 0,
                FK: 0,
                GuidString: null,
                IsPaging: 0,
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
            })
            this.state = {
                Addkey: false,
                activeKey: panes[0].key,
                panes,
                Data: D,
                QueryExtend_: {
                    BillTypeCode: '',
                    BranchID: "STD",
                    CreateTime: getTime(),
                    DQueryCaption: '',
                    DQueryName: '',
                    DQuerySql: [{
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
                    }],
                    DataSource: 1,
                    DeleteFlag: 0,
                    FK: 0,
                    GuidString: null,
                    IsPaging: 0,
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
                }
            };
        }
    }
    handleChange = (key, e, dataSource) => {
        console.log(key + '-----' + e + '----' + dataSource)
        // this.props.handleChange(key, e)
        let Data = this.state.Data
        Data[dataSource - 1][key] = e
        this.setState({
            Data: Data
        })
    }
    onChange = (activeKey) => {//切换面板的回调
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {//新增删除的回调
        this[action](targetKey);
    }
    add = () => {//添加
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            title: `${activeKey}`,
            content: <SimpleFlag
                QueryExtend={this.state.Data[this.newTabIndex - 1]}
                key={panes.length}
                disableds={false}
                datasource={this.newTabIndex}
                handleChange={this.handleChange.bind(this)}
            ></SimpleFlag>,
            key: `${activeKey}`,
            closable: true
        });
        let oldData = JSON.parse(JSON.stringify(this.state.Data))
        oldData.push(this.state.QueryExtend_)
        console.log(oldData)
        this.setState({ panes, activeKey, Data: oldData });
    }
    remove = (targetKey) => {//移除
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return (
            <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        );
    }
}

export default SimpleTabs