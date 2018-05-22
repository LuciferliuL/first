import React from 'react';
import { Tree, Spin } from 'antd';
import { TreeMathFloat } from './TreesMath'
import { API } from '../../Math/APIconfig'

const TreeNode = Tree.TreeNode;

class Trees extends React.Component {
    state = {
        expandedKeys: [],
        autoExpandParent: true,
        treeData: [],
        loading: true
    }
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onSelect = (selectedKeys, info) => {
        this.props.Selected(selectedKeys)
    }
    componentDidMount() {
        fetch(API.Trees, { method: "GET" })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    treeData: TreeMathFloat(res, 4),
                    fullscreen: false,
                    loading: false
                })
            })
            .catch((resolve) => {
                console.log(resolve)
                this.setState({
                    loading: false
                })
            })
    }
    componentWillReceiveProps(next,pre){
        // console.log(next)
        if(next.Refresh){
            fetch(API.Trees, { method: "GET" })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    treeData: TreeMathFloat(res, 4),
                    fullscreen: false,
                    loading: false
                })
                this.props.RefreshChange()
            })
            .catch((resolve) => {
                console.log(resolve)
                this.setState({
                    loading: false
                })
            })
        }
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.label} key={item.PK} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    render() {
        const { expandedKeys, autoExpandParent, treeData } = this.state;
        const { selectedKeys } = this.props
        return (
            <div>
                <Spin spinning={this.state.loading} delay={500}>
                    <Tree
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onSelect={this.onSelect}
                        selectedKeys={selectedKeys}
                    >
                        {this.renderTreeNodes(treeData)}
                    </Tree>
                </Spin>
            </div>
        );
    }
}

export default Trees;