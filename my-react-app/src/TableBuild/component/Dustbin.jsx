import React, { Component } from 'react';
import { Input, Checkbox, Switch, Form, Icon } from 'antd'
const FormItem = Form.Item;


class Dustbin extends Component {
    onChange = () => {
        console.log(111);

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { item } = this.props
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        switch (item.itemkey) {
            case 'INPUT':
                return (
                    <FormItem
                        {...formItemLayout}
                        label={item.label}
                    >
                        {getFieldDecorator(item.type, {
                            rules: [{
                                required: item.required, message: item.message,
                            }],
                        })(
                            <Input type={item.type}/>
                        )}
                    </FormItem>
                )
            case 'SWITCH':
                return (
                    <Switch></Switch>
                )
            case 'CHECKEDBOX':
                return (
                    <Checkbox onChange={this.onChange}></Checkbox>
                )
            case 'CHECKEDBOXGROUP':
                return (
                    <Input></Input>
                )
            default:
                return (
                    <div>123123</div>
                )
        }
    }
}

export default Dustbin = Form.create()(Dustbin);