import React, { Component } from 'react';
import Trees from './Trees'
import { Row, Col, Card, Button, notification } from 'antd'
import Forms from './Forms'
import { getFetch, Alert, getTime, postFetchForm, postFetch } from '../../Math/Math'
import { ActionAPI, Save, Del, API } from '../../Math/APIconfig'
import { TreeMathFloat } from './TreesMath'
import Dialog from './Dialog/Dialog'

const ButtonGroup = Button.Group
class Action extends Component {
    state = {
        clearObj: {
            Action: '',
            Author: '',
            BranchID: "STD",
            Caption: '',
            Catalog: "GOS",
            CreateTime: '',
            DeleteFlag: 0,
            DisplayMode: null,
            FK: null,
            FilePath: null,
            FrameType: 0,
            GuidString: null,
            ImageKey: null,
            LastModifyTime: getTime(),
            LastUpdater: null,
            LevelString: null,
            LineID: -1,
            MenuName: '',
            Note: '',
            OrderIndex: null,
            OriginalGuidString: 0,
            PK: -1,
            Param1: '',
            Param2: '',
            SoftSystemCode: "GOS",
            Tag: null,
            Version: 1,
            WorkFlowGuid: '',
            WorkFlowState: '',
            ParentLevelString: 0
        },//用来清空对象
        selectedKeys: [],
        selectedObj: {
            Action: '',
            Author: '',
            BranchID: "STD",
            Caption: '',
            Catalog: "GOS",
            CreateTime: '',
            DeleteFlag: 0,
            DisplayMode: null,
            FK: null,
            FilePath: null,
            FrameType: 0,
            GuidString: null,
            ImageKey: null,
            LastModifyTime: '',
            LastUpdater: null,
            LevelString: null,
            LineID: -1,
            MenuName: '',
            Note: '',
            OrderIndex: null,
            OriginalGuidString: 0,
            PK: -1,
            Param1: '',
            Param2: '',
            SoftSystemCode: "GOS",
            Tag: null,
            Version: 1,
            WorkFlowGuid: '',
            WorkFlowState: '',
            ParentLevelString: 0
        },
        visible: false,
        ParentLevelString: 0,
        PK: 0,//PK
        Refresh: false,
        treeData: []
    }
    //选择以后渲染
    Selected(keys) {
        this.setState({
            selectedKeys: keys,
            PK: Number(keys[0])
        })
        let ActionURL = ActionAPI(keys).Action
        getFetch(ActionURL, (res) => {
            this.setState({
                selectedObj: res,
                ParentLevelString: res.LevelString
            },()=>{
                console.log(this.state.selectedObj)
            })
        })
    }
    //增删改查
    //为引用实例   增加与编辑  删除是好的
    Add(key) {
        if (key === 'addRoot') {//parentLevelString 为0
            let clear = this.state.clearObj;
            clear.CreateTime = getTime()
            this.setState({
                visible: true,
                selectedObj: this.state.clearObj,
                PK: 0
            });
        } else if (key === 'addLevel') {//parentLevelString 为父的 LevelString
            Alert(this.state.PK, () => {
                // console.log(this.state.selectedObj)
                let clear = this.state.clearObj;
                clear.OriginalGuidString = this.state.PK
                clear.ParentLevelString = this.state.ParentLevelString
                clear.CreateTime = getTime()
                this.setState({
                    visible: true,
                    selectedObj: clear,
                });
            })
        } else if (key === 'Edit') {
            let clear = this.state.selectedObj;
            clear.LastModifyTime = getTime()
            clear.ParentLevelString = 0
            Alert(this.state.PK, () => {
                this.setState({
                    visible: true,
                    selectedObj: clear
                });
            })
        } else if (key === 'Delete') {
            Alert(this.state.selectedKeys, () => {
                console.log(this.state.selectedKeys)
                let PK = this.state.selectedKeys[0]
                getFetch(Del(PK).Root, (res) => {
                    if (res === 'True') {
                        notification.success({
                            message: '提示',
                            description: '删除成功'
                        })
                        this.RefreshChange()
                    } else {
                        notification.warning({
                            message: '提示',
                            description: res
                        })
                    }
                })
            })
        } else if (key === 'Refresh') {
            this.RefreshChange()
        }
    }
    RefreshChange = () => {
        fetch(API.Trees, { method: "GET" })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    treeData: TreeMathFloat(res, 4),
                })
                notification.success({
                    message: '刷新成功',
                    description: '树结构已刷新'
                })
            })
            .catch((resolve) => {
                console.log(resolve)
                notification.warning({
                    message: '错误',
                    description: '刷新错误'
                })
            })
    }
    //显示隐藏弹出页
    hideModal = () => {
        this.setState({
            selectedObj: this.state.clearObj,
            visible: false
        });
    }
    DialogSubmit = (e) => {
        console.log(e)
        postFetchForm(Save().Root, e, (res) => {
            if (res.IsSuccess === 'True') {
                this.RefreshChange()
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
        const { selectedObj, selectedKeys, visible, treeData } = this.state;
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <ButtonGroup>
                            <Button onClick={this.Add.bind(this, 'addRoot')}>添加根</Button>
                            <Button onClick={this.Add.bind(this, 'addLevel')}>添加下级</Button>
                            <Button onClick={this.Add.bind(this, 'Edit')}>编辑</Button>
                            <Button onClick={this.Add.bind(this, 'Delete')}>删除</Button>
                            <Button onClick={this.Add.bind(this, 'Refresh')}>刷新</Button>
                        </ButtonGroup>
                        <Trees
                            Selected={this.Selected.bind(this)}
                            selectedKeys={selectedKeys}
                            treeData={treeData}
                            RefreshChange={this.RefreshChange.bind(this)}
                        ></Trees>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Forms selectedObj={selectedObj}></Forms>
                        </Card>
                    </Col>
                    <Dialog
                        selectedObj={selectedObj}
                        visible={visible}
                        hideModal={this.hideModal.bind(this)}
                        DialogSubmit={this.DialogSubmit.bind(this)}
                    ></Dialog>
                </Row>
            </div>
        );
    }
}


export default Action;