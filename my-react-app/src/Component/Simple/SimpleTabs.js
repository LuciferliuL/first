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
            return panes.push(
                {
                    title:
                        `${v.DQueryCaption}`,
                    content: <SimpleFlag QueryExtend={v} key={index} disableds={true}></SimpleFlag>,
                    key: `${index}`
                }
            )
        })
        // console.log(panes)
        if (QueryExtend[0].DQueryCaption === '') {
            this.state = {
                Addkey: true,
                activeKey: '',
                panes,
            };
        } else {
            this.state = {
                Addkey: false,
                activeKey: panes[0].key,
                panes,
            };
        }
    }
    componentWillReceiveProps(next) {
        let panes = []
        next.QueryExtend.map((v, index) => {
            return panes.push(
                {
                    title:
                        `${v.DQueryCaption}`,
                    content: <SimpleFlag
                        QueryExtend={v}
                        key={index}
                        disableds={true}
                    ></SimpleFlag>,
                    key: `${index}`
                }
            )
        })
        this.setState({
            panes
        })
    }
    onChange = (activeKey) => {//切换面板的回调
        this.setState({ activeKey });
    }
    // onEdit = (targetKey, action) => {//新增删除的回调
    //     this[action](targetKey);
    // }
    // add = () => {//添加
    //     const panes = this.state.panes;
    //     const activeKey = `newTab${this.newTabIndex++}`;
    //     panes.push({
    //         title: `${activeKey}`,
    //         content: <SimpleFlag
    //             QueryExtend={this.state.QueryExtend_}
    //             key={panes.length}
    //             disableds={false}
    //         ></SimpleFlag>,
    //         key: `${activeKey}`,
    //         closable: true
    //     });
    //     this.setState({ panes, activeKey });
    // }
    // remove = (targetKey) => {//移除
    //     let activeKey = this.state.activeKey;
    //     let lastIndex;
    //     this.state.panes.forEach((pane, i) => {
    //         if (pane.key === targetKey) {
    //             lastIndex = i - 1;
    //         }
    //     });
    //     const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    //     if (lastIndex >= 0 && activeKey === targetKey) {
    //         activeKey = panes[lastIndex].key;
    //     }
    //     this.setState({ panes, activeKey });
    // }
    render() {
        return (
            <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="card"
                onEdit={this.onEdit}
            >
                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        );
    }
}

export default SimpleTabs