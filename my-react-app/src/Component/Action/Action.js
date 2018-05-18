import React, { Component } from 'react';
import Trees from './Trees'
import { Row, Col, Card, Button } from 'antd'
import Forms from './Forms'
import { getFetch, Alert } from '../../Math/Math'
import { ActionAPI } from '../../Math/APIconfig'
import Dialog from '../Dialog/Dialog'
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
        },//用来清空对象
        selectedKeys: [],//PK
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
        keyChange: 0,//传入key区分
        ParentLevelString: 0,
        PK: 0
    }
    //监控修改
    handleFormChange = (changedFields) => {
        let key = null, value = null
        for (var k in changedFields) {
            key = changedFields[k].name
            value = changedFields[k].value
        }
        this.setState({
            selectedObj: Object.assign(this.state.selectedObj, { [key]: value })
        });
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
            this.setState({
                visible: true,
                selectedObj: this.state.clearObj,
                keyChange: 1
            });
        } else if (key === 'addLevel') {//parentLevelString 为父的 LevelString
            Alert(this.state.PK, () => {
                console.log(this.state.selectedObj)
                let clear = this.state.clearObj;
                clear.OriginalGuidString = this.state.PK
                clear.ParentLevelString = this.state.ParentLevelString
                this.setState({
                    visible: true,
                    selectedObj: clear,
                    keyChange: 1
                }, () => {
                    console.log(this.state.selectedObj)
                });
            })
        } else if (key === 'Edit') {
            Alert(this.state.PK, () => {
                this.setState({
                    visible: true,
                    keyChange: 1
                });
            })

        } else if (key === 'Delete') {
            Alert(this.state.selectedKeys, () => {
                console.log(1)
            })
        } else if (key === 'Refresh') {

        }
    }
    //显示隐藏弹出页
    hideModal = () => {
        this.setState({
            visible: false,
            PK: 0,
            selectedObj: this.state.clearObj
        },()=>{
            console.log(this.state.selectedObj)
        });
    }
    render() {
        const { selectedObj, selectedKeys, visible, keyChange } = this.state;
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
                        <Trees Selected={this.Selected.bind(this)} selectedKeys={selectedKeys}></Trees>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Forms selectedObj={selectedObj} onChange={this.handleFormChange}></Forms>
                        </Card>
                    </Col>
                    <Dialog selectedObj={selectedObj} visible={visible} keyChange={keyChange} hideModal={this.hideModal.bind(this)}></Dialog>
                </Row>

            </div>
        );
    }
}


export default Action;