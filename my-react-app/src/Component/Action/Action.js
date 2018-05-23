import React, { Component } from 'react';
import Trees from './Trees'
import { Row, Col, Card, Button, notification } from 'antd'
import Forms from './Forms'
import { getFetch, Alert, getTime } from '../../Math/Math'
import { ActionAPI } from '../../Math/APIconfig'
import Dialog from './Dialog/Dialog'

const ButtonGroup = Button.Group
class Action extends Component {
    state = {
        clearObj: {
            Action: '',
            ActionInfo: null,
            Author: '',
            BillDefineInfo: null,
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
            QuerySimpleInfo: null,
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
            ActionInfo: null,
            Author: '',
            BillDefineInfo: null,
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
            QuerySimpleInfo: null,
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
        Refresh: false
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
            })
        })
    }
    //增删改查
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
            Alert(this.state.PK, () => {
                this.setState({
                    visible: true,
                    selectedObj: clear
                });
            })
        } else if (key === 'Delete') {
            Alert(this.state.selectedKeys, () => {
                console.log(this.state.selectedKeys)
            })
        } else if (key === 'Refresh') {
            this.setState({
                Refresh: true
            })
        }
    }
    RefreshChange = () => {
        this.setState({
            Refresh: false
        })
        notification.success({
            message:'刷新成功',
            description:'树结构已刷新'
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
        this.setState({
            Refresh: true
        })
    }
    render() {
        const { selectedObj, selectedKeys, visible, Refresh } = this.state;
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
                            Refresh={Refresh}
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