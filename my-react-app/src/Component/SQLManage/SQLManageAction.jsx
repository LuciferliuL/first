import React from 'react'
import { Form, Input, Select, Row, Col, Button, notification, Spin, Card } from 'antd';
import { postFetchForm } from '../../Math/Math'
import { Save } from '../../Math/APIconfig'
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group
const { TextArea } = Input
const FormList = ['Author', 'GuidString', 'Module', 'Note', 'ScriptType', 'SqlName', 'SqlScripe']
const OptionValue = ['财务模块', '采购模块', '价格模块', '结算模块', '库存模块', '其他模块', '销售模块', '资金模块', '系统设置模块']
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
            this.setState({
                loading: true
            })
            if (!err) {
                let sub = JSON.parse(JSON.stringify(this.props.clear))
                Object.assign(sub, values)
                console.log('Received values of form: ', sub);
                postFetchForm(Save().SQL, sub, (res) => {
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
                                    <Button onClick={this.asyncData(res.SqlList)} size='small'>同步</Button>
                                    <Button onClick={() => { notification.close() }} size='small'>取消</Button>
                                </ButtonGroup>
                            })
                        })
                    } else {
                        this.setState({
                            loading: false
                        })
                        notification.warning({
                            message: '警告',
                            description: '保存失败'
                        })
                    }
                })
            }
        });
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
        const Options = []
        OptionValue.forEach((element) => {
            Options.push(
                <Option key={element} value={element}>{element}</Option>
            )
        });

        return (
            <Form onSubmit={this.handleSubmit}>
                <Spin spinning={loading}>
                    <Card extra={
                        <ButtonGroup>
                            <Button type="primary" htmlType="submit" disabled={disabled}>确定</Button>
                            <Button type='danger' htmlType='button' disabled={disabled} onClick={this.handleReset}>重置</Button>
                        </ButtonGroup>}>
                        <Row gutter={2}>
                            <Col span={12}>

                                <FormItem
                                    {...formItemLayout}
                                    label="作者"
                                >
                                    {getFieldDecorator('Author', {
                                        rules: [{ required: true, message: 'Please input 作者!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Guid"
                                >
                                    {getFieldDecorator('GuidString')(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="所属模块"
                                >
                                    {getFieldDecorator('Module', {
                                        rules: [{ required: true, message: 'Please input 所属模块!' }],
                                    })(
                                        <Select disabled={disabled}>
                                            {Options}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="SQL语句标识"
                                >
                                    {getFieldDecorator('SqlName', {
                                        rules: [{ required: true, message: 'Please input SQL语句标识!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="脚本类型"
                                >
                                    {getFieldDecorator('ScriptType', {
                                        rules: [{ required: true, message: 'Please input 脚本类型!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="描述"
                                >
                                    {getFieldDecorator('Note')(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>

                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="SQL执行语句"
                                >
                                    {getFieldDecorator('SqlScripe', {
                                        rules: [{ required: true, message: 'Please input SQL执行语句!' }],
                                    })(
                                        <TextArea disabled={disabled}
                                            autoComplete="off"
                                            style={{ resize: 'none' }}
                                            cols='15'
                                            rows='20' />
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

const SQLManageAction = Form.create({
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
        console.log(Field)
        return Field
    }
})(RegistrationForm);

export default SQLManageAction
