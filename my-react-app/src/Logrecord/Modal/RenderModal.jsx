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
    render() {
        const {arr} = this.props
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
                    <span  >{arr[3]}</span>
                    <br/>
                    <Badge status="processing" text="Timestamp:"  style={{ backgroundColor: '#52c41a' }}/>
                    <br/>
                    <span >{arr[2]}</span>
                    <br/>
                    <Badge status="processing" text="Message:"  style={{ backgroundColor: '#52c41a' }}/>
                    <br/>
                    <span>{arr[0].replace(/\r\n/,'<br />')}</span>
                    <br/>
                    <Badge status="processing" text="StackTrace:"  style={{ backgroundColor: '#52c41a' }}/>
                    <br/>
                    <span >{arr[1]}</span>
                </Modal>
            </div>
        );
    }
}

export default RenderModal;