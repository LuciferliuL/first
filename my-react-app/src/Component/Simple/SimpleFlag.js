import React, { Component } from 'react';
import { Form, Input, Select, Col, Button, Row } from 'antd'
import Switchs from '../Tables/Switchs'
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;
const InputGroup = Input.Group
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const Widths = {width:100+'%'}
class SimpleFlag extends Component {
    ChangeSelect = (value) => {
        console.log(value)
    }
    render() {
        return (
            <div>
                <FormItem label="显示名称" {...formItemLayout}>
                    <Input value={1} disabled></Input>
                </FormItem>
                <FormItem label="显示名称" {...formItemLayout}>
                    <InputGroup>
                        <Row>
                            <Col span={14}>
                                <Input defaultValue="0571" />
                            </Col>
                            <Col span={10}>
                                <Button>123</Button>
                            </Col>
                        </Row>
                    </InputGroup>
                </FormItem>
                <FormItem label="显示名称" {...formItemLayout}>
                    <InputGroup>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Select value={1} onChange={this.ChangeSelect.bind(this)} style={Widths}>
                                    <Option value='1'>1</Option>
                                    <Option value='1'>2</Option>
                                    <Option value='1'>3</Option>
                                </Select>
                            </Col>
                            <Col span={12}>
                            是否分页<Switchs></Switchs>
                            是否使用缓存服务器<Switchs></Switchs>
                            </Col>
                        </Row>

                    </InputGroup>
                </FormItem>
                <FormItem label="显示名称" {...formItemLayout}>
                    <TextArea rows={4}></TextArea>
                </FormItem>
            </div>
        );
    }
}

export default SimpleFlag;