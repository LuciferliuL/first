import React from 'react'
import { Tabs } from 'antd';
import SimpleFlag from './SimpleFlag'
const TabPane = Tabs.TabPane;

class SimpleTabs extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const { QueryExtend } = this.props
        const panes = []
        QueryExtend.map((v, index) => {
            panes.push(
                {
                    title:
                        `${v.DQueryCaption}`,
                    content: <SimpleFlag QueryExtend={v} key={index} disableds={true}></SimpleFlag>,
                    key: `${index}`,
                    closable:false
                }
            )
        })
        console.log(panes)
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
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
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
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