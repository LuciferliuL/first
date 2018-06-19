import React, { Component } from 'react';
import {Button, Modal, Icon, Badge} from 'antd'

class RenderModal extends Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
            Message:'',
            StackTrace:'',
            UserId:'',
            Timestamp:''
        });
    }
    handleOK = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    componentWillReceiveProps(pre){
        this.setState({
            Message:pre.arr[0].replace(/\r\n/g,'<br>'),
            Timestamp:pre.arr[2],
            UserId:pre.arr[3],
            StackTrace:pre.arr[1]
        })
    }
    render() {
        const {Message,UserId,Timestamp,StackTrace} = this.state
        return (
            <div>
                <Button type='primary' onClick={this.showModal}><Icon type="solution"></Icon></Button>
                <Modal
                    title='条目详情'
                    visible={this.state.visible}
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    width='100%'
                >
                    <Badge status="processing" text="UserId:"  style={{ backgroundColor: '#52c41a' }}/>
                    <br/>
                    <span  >{UserId}</span>
                    <br/>
                    <Badge status="processing" text="Timestamp:"  style={{ backgroundColor: '#52c41a' }}/>
                    <br/>
                    <span >{Timestamp}</span>
                    <br/>
                    <Badge status="processing" text="Message:"  style={{ backgroundColor: '#52c41a' }}/>
                    <br/>
                    <span>{Message}</span>
                    <br/>
                    <Badge status="processing" text="StackTrace:"  style={{ backgroundColor: '#52c41a' }}/>
                    <br/>
                    <span >{StackTrace}</span>
                </Modal>
            </div>
        );
    }
}

export default RenderModal;