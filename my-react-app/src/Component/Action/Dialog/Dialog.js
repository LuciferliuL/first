import React from 'react'
import { Modal, Form, Input } from 'antd';
import {Errors} from '../../../Math/Math'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
/**
 * 弹框
 * @param {接受的对象} selectedObj
 * @param {隐藏和显示} visible
 * @param {点击隐藏的函数} hideModal
 * @param {接受判断增删改查} key
 */
const E = ['Author','Action','Caption']
class Dialog extends React.Component {
    state = {
        DialogData: {}
    }
    componentWillReceiveProps(next, pre) {
        // console.log(next)
        this.setState({
            DialogData: JSON.parse(JSON.stringify(next.selectedObj))
        })
    }
    //发送请求即可
    handleOk = () => {
        let D = this.state.DialogData
        let counts = 0
        E.map((v)=>(
            D[v]===''?Errors(v):counts++
        ))
        if(counts === E.length){
            D.MenuName = D.Caption + D.Action
            this.setState({
                DialogData:D
            })
            this.props.DialogSubmit(this.state.DialogData)
            this.props.hideModal()
        }     
    }
    //关闭
    handleCancel = () => {
        this.props.hideModal()
    }
    //监听修改
    InputChange = (v, e) => {
        let value = e.target.value
        this.setState({
            DialogData: Object.assign(this.state.DialogData, { [v]: value })
        })
    }
    render() {
        const { visible } = this.props
        const { DialogData } = this.state
        return (
            <div>
                <Modal
                    destroyOnClose
                    visible={visible}
                    title="Title"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                >
                    <Form layout='horizontal'>
                        <FormItem label="Action" {...formItemLayout}
                            validateStatus='error'
                            help="必填项">
                            <Input value={DialogData.Action}
                                onChange={this.InputChange.bind(this, 'Action')} />
                        </FormItem>
                        <FormItem label="Author" {...formItemLayout}
                            validateStatus='error'
                            help="必填项">
                            <Input value={DialogData.Author}
                                onChange={this.InputChange.bind(this, 'Author')} />
                        </FormItem>
                        <FormItem label="Caption" {...formItemLayout}
                            validateStatus='error'
                            help="必填项">
                            <Input value={DialogData.Caption}
                                onChange={this.InputChange.bind(this, 'Caption')} />
                        </FormItem>
                        <FormItem label="Param1" {...formItemLayout}>
                            <Input value={DialogData.Param1}
                                onChange={this.InputChange.bind(this, 'Param1')} />
                        </FormItem>
                        <FormItem label="Param2" {...formItemLayout}>
                            <Input value={DialogData.Param2}
                                onChange={this.InputChange.bind(this, 'Param2')} />
                        </FormItem>
                        <FormItem label="Note" {...formItemLayout}>
                            <Input value={DialogData.Note}
                                onChange={this.InputChange.bind(this, 'Note')} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Dialog

