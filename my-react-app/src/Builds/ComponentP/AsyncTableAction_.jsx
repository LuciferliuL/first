import React from 'react'
import { Form, Input, Select, Row, Col, Button, notification, Spin, Card } from 'antd';
import { postFetch } from '../../Math/Math'
import { table } from './AsyncAPI'
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group
const { TextArea } = Input
const FormList = ['PK', 'BUGID', 'STAFFNAME', 'SYNC', 'TABLENAME', "SCRIPT", 'NOTE']
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitData: {},
            disabledCopy: true,
            disabled: true,
            loading: false,
        }
    }
    componentWillMount() {
        const { TableValue, disabled } = this.props
        this.setState({
            submitData: TableValue,
            disabled: disabled,
        }, () => {
            // console.log(this.state.submitData)
            // console.log(this.state.disabled)
        })
    }
    componentWillReceiveProps(pre) {
        // console.log(pre)
        const TableValue = pre.TableValue
        const disabled = pre.disabled
        this.setState({
            submitData: TableValue,
            disabled: disabled,
        }, () => {
            // console.log(this.state.submitData)
            // console.log(this.state.disabled)
        })
    }
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            // console.log(values)
            // this.setState({
            //     loading: true
            // })
            if (!err) {
                let sub = JSON.parse(JSON.stringify(this.props.clear))
                Object.assign(sub, values)
                console.log('Received values of form: ', sub);
                postFetch(table().add, sub, (res) => {
                    if (res.IsSuccess === 'True') {
                        this.setState({
                            disabledCopy: false,
                            disabled: true,
                            loading: false
                        }, () => {
                            notification.success({
                                message: '提示',
                                description: '可以执行同步',
                                btn: <ButtonGroup>
                                    <Button onClick={() => { this.asyncData(res.SqlList) }} size='small'>同步</Button>
                                    <Button onClick={this.ActiveTable.bind(this)} size='small'>取消</Button>
                                </ButtonGroup>
                            })
                        })
                    } else {
                        this.setState({
                            loading: false
                        })
                        notification.warning({
                            message: '警告',
                            description: '保存失败' + res.ErrMessage
                        })
                    }
                })
            }
        });
    }
    ActiveTable = () => {
        this.props.ActiveKey()
        notification.close('1')
    }
    //刷新
    handleReset = () => {
        this.props.form.resetFields();
    }

    asyncData = (value) => {
        let path = {
            pathname: '/Home/AsyncData',
            state: value
        }
        notification.close('1')
        this.props.history.push(path)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(getFieldDecorator)
        const { disabled, loading } = this.state
        // console.log(TableValue)
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
        // console.log(submitData)


        return (
            <Form onSubmit={this.handleSubmit}>
                <Spin spinning={loading}>
                    <Card extra={
                        <ButtonGroup>
                            <Button type="primary" htmlType="submit" disabled={disabled}>确定</Button>
                            <Button type='danger' htmlType='button' disabled={disabled} onClick={this.handleReset}>重置</Button>
                        </ButtonGroup>}>
                        <Row gutter={2}>
                            <Col span={8}>

                                <FormItem
                                    {...formItemLayout}
                                    label="作者"
                                >
                                    {getFieldDecorator('STAFFNAME', {
                                        rules: [{ required: true, message: 'Please input 作者!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="对应禅道编号"
                                >
                                    {getFieldDecorator('BUGID')(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="PK"
                                >
                                    {getFieldDecorator('PK', {
                                        rules: [{ required: true, message: 'Please input 标题!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="TABLENAME"
                                >
                                    {getFieldDecorator('TABLENAME', {
                                        rules: [{ required: true, message: 'Please input TABLENAME!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                        
                                <FormItem
                                    {...formItemLayout}
                                    label="归档状态"
                                >
                                    {getFieldDecorator('SYNC')(
                                        <Select disabled={disabled}>
                                            <Option value={0}>未归档</Option>
                                            <Option value={1}>已归档</Option>
                                        </Select>
                                    )}
                                </FormItem>

                            </Col>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label="脚本"
                                >
                                    {getFieldDecorator('SCRIPT', {
                                        rules: [{ required: true, message: 'Please input 脚本!' }],
                                    })(
                                        <TextArea disabled={disabled}
                                            autoComplete="off"
                                            style={{ resize: 'none' }}
                                            cols='15'
                                            rows='15' />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    {...formItemLayout}
                                    label='日志'
                                >
                                    {getFieldDecorator('NOTE', {
                                        rules: [{ required: true, message: 'Please input 日志!' }],
                                    })(
                                        <TextArea disabled={disabled}
                                            autoComplete="off"
                                            style={{ resize: 'none' }}
                                            cols='15'
                                            rows='15' />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                </Spin>
            </Form>
        );
    }
}

const AsyncTableAction = Form.create({
    mapPropsToFields(props) {
        // console.log(1)
        const { TableValue } = props
        // console.log(TableValue)
        let Field = {}
        FormList.forEach(element => {
            // if (TableValue[element]) {
            Field[element] = Form.createFormField({ value: TableValue[element] })
            // }
        });
        // Field.TableValue = TableValue
        // console.log(Field)
        return Field
    }
})(RegistrationForm);

export default AsyncTableAction
