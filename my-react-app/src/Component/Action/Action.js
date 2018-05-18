import React, { Component } from 'react';
import Trees from './Trees'
import { Row, Col, Card, Button } from 'antd'
import Forms from './Forms'
import { getFetch } from '../../Math/Math'
import { ActionAPI } from '../../Math/APIconfig'

const ButtonGroup = Button.Group
class Action extends Component {
    state = {
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
            SoftSystemCode: null,
            Tag: null,
            Version: 1,
            WorkFlowGuid: null,
            WorkFlowState: null,
            // ParentLevelString: 0
        },
    }
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
    Selected(keys) {
        this.setState({
            selectedKeys: keys
        })
        let ActionURL = ActionAPI(keys).Action
        getFetch(ActionURL, (res) => {
            this.setState({
                selectedObj: res
            })
        })
    }
    Add(key){
        if(key === 'addRoot'){

        }else if(key === 'addLevel'){

        }else if(key === 'Edit'){

        }else if(key === 'Delete'){

        }else if(key === 'Refresh'){
            
        }
    }
    render() {
        const fields = this.state.fields;
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <ButtonGroup>
                            <Button onClick={this.Add.bind(this,'addRoot')}>添加根</Button>
                            <Button onClick={this.Add.bind(this,'addLevel')}>添加下级</Button>
                            <Button onClick={this.Add.bind(this,'Edit')}>编辑</Button>
                            <Button onClick={this.Add.bind(this,'Delete')}>删除</Button>
                            <Button onClick={this.Add.bind(this,'Refresh')}>刷新</Button>
                        </ButtonGroup>
                        <Trees Selected={this.Selected.bind(this)} selectedKeys={this.state.selectedKeys}></Trees>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Forms selectedObj={this.state.selectedObj} onChange={this.handleFormChange}></Forms>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}


export default Action;