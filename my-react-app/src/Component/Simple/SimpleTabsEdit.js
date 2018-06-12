import React from 'react'
import { Tabs, Icon } from 'antd';
import SimpleFlag from './SimpleFlag'
import { getTime } from '../../Math/Math'
const TabPane = Tabs.TabPane;
class SimpleTabs extends React.Component {
    constructor(props) {
        super(props);
        this.cancelTabs = this.cancelTabs.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.newTabIndex = 0;
        this.code = 0
        this.Bill = []
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
        // console.log(panes)
        if (QueryExtend[0].DQueryCaption === '') {
            this.state = {
                Addkey: true,
                activeKey: '',
                panes,
                QueryExtend_: {
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
            this.Bill = QueryExtend
            this.state = {
                Addkey: false,
                activeKey: panes[0].key,
                panes,
                QueryExtend_: {
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
    handleDate = (date) => {
        // console.log(date)
        // console.log(this.code)
        if (this.code !== 0) {
            this.Bill.push(date)
            this.props.TabsChange(this.Bill,this.newTabIndex)
        }
    }

    componentWillUnmount() {
        this.code = 1
        this.setState({})
    }
    onChange = (activeKey) => {//切换面板的回调
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {//新增删除的回调
        // console.log(action)
        // console.log(targetKey)
        this[action](targetKey);
    }
    add = () => {//添加
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            title: `${activeKey}`,
            content: <SimpleFlag
                QueryExtend={this.state.QueryExtend_}
                key={panes.length}
                disableds={false}
                // datasource={this.newTabIndex}
                handleDate={this.handleDate}
            ></SimpleFlag>,
            key: `${activeKey}`,
            closable: false
        });
        this.setState({ panes, activeKey });
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
    cancelTabs = () => {
        // console.log(this.newTabIndex)
        this.onEdit(`newTab${this.newTabIndex - 1}`, 'remove')
        if (this.newTabIndex !== 0) {
            this.newTabIndex--
        }
    }
    render() {
        return (
            <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                tabBarExtraContent={<Icon type='minus-square' className='ant-tabs-new-tab' onClick={this.cancelTabs}></Icon>}
            >
                {this.state.panes.map(pane =>
                    <TabPane
                        tab={pane.title}
                        key={pane.key}
                        closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        );
    }
}

export default SimpleTabs