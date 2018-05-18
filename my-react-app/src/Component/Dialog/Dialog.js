import React from 'react'
import { Modal, Button } from 'antd';
import Forms from '../Action/Forms'
/**
 * 弹框
 * @param {接受的对象} selectedObj
 * @param {隐藏和显示} visible
 * @param {点击隐藏的函数} hideModal
 * @param {接受判断增删改查} key
 */
class Dialog extends React.Component {
    state={
        DiaLogData:{}
    }
    componentWillReceiveProps(next,pre){
        // console.log(next)
        this.setState({
            DiaLogData:next.selectedObj,
        })
    }
    handleOk = () => {
        console.log(this.state.DiaLogData)
        setTimeout(() => {
            this.props.hideModal()
        }, 3000);
    }
    //关闭
    handleCancel = () => {
        this.props.hideModal()
    }
    handleFormChange = (changedFields) => {
        let key = null, value = null
        for (var k in changedFields) {
            key = changedFields[k].name
            value = changedFields[k].value
        }
        this.setState({
            DiaLogData: Object.assign(this.state.DiaLogData, { [key]: value })
        });
    }
    render() {
        const { selectedObj, visible, keyChange} = this.props
        return (
            <div>
                <Modal
                    destroyOnClose
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>Submit</Button>,
                    ]}
                >
                    <Forms onChange={this.handleFormChange} selectedObj={selectedObj} keyChange={keyChange}></Forms>
                </Modal>
            </div>
        );
    }
}

export default Dialog