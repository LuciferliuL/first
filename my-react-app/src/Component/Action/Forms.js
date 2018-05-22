import React from 'react';
import { Form, Input} from 'antd'
// import { formsData } from './FormsData'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

const Forms = (props) => {
    const { selectedObj } = props
    return (
        <Form layout='horizontal'>
            <FormItem label="Action" {...formItemLayout}>
                <Input value={selectedObj.Action} disabled/>
            </FormItem>
            <FormItem label="Author" {...formItemLayout}>
                <Input value={selectedObj.Author} disabled/>
            </FormItem>
            <FormItem label="Caption" {...formItemLayout}>
                <Input value={selectedObj.Caption} disabled/>
            </FormItem>
            <FormItem label="Param1" {...formItemLayout}>
                <Input value={selectedObj.Param1} disabled/>
            </FormItem>
            <FormItem label="Param2" {...formItemLayout}>
                <Input value={selectedObj.Param2} disabled/>
            </FormItem>
            <FormItem label="Note" {...formItemLayout}>
                <Input value={selectedObj.Note} disabled/>
            </FormItem>
        </Form>
    );
}
export default Forms;