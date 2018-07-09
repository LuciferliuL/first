import React from 'react'
import { Form, Input, Select, Row, Col, Button, notification, Spin, Card } from 'antd';
import {  postFetch } from '../../Math/Math'
import { Save } from '../../Math/APIconfig'
import CheckBox from '../checkbox/CheckBox';
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group
const FormList = ['Author', 'Action', 'Text', 'Notes', 'IsSingle', 'ParamString', 'Initial', 'InitialAssemblyRef', 'Module', 'LastModifyTime', 'ActionType']
const OptionValue = ['财务模块', '采购模块', '价格模块', '结算模块', '库存模块', '其他模块', '销售模块', '资金模块', '系统设置模块']
const OptionActionType = ['自定义的InitialAction', '编辑单据EditBill', '简单通用查询']
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
                postFetch(Save().Windows, sub, (res) => {
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
                            description: '保存失败' + res.ErrMessage
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
    ActionType = (value) => {
        console.log(value)
        this.props.form.setFieldsValue({
            InitialAssemblyRef: `${value === '自定义的InitialAction' ? 'JZT.GOS.Equipment.Win' :
                value === '编辑单据EditBill' ? 'JZT.UI' : 'JZT.UI'}`,
            Initial: `${value === '自定义的InitialAction' ? 'JZT.GOS.Equipment.Win.WorkFlow.LendingGoodsAuditForm' :
                value === '编辑单据EditBill' ? 'JZT.GOS.Win.InitAction.EditBillFormByBillCodeInitial' : 'JZT.UI.Query.QueryExtendForm'}`
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(getFieldDecorator)
        const { disabled, loading } = this.state
        // console.log(TableValue)
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        // console.log(submitData)
        const Options = []
        OptionValue.forEach((element) => {
            Options.push(
                <Option key={element} value={element}>{element}</Option>
            )
        });
        const ActionType = []
        OptionActionType.forEach((element) => {
            ActionType.push(
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
                        <Row gutter={24}>
                            <Col span={12}>
                                <FormItem
                                    label="显示名称"
                                    {...formItemLayout}>
                                    {getFieldDecorator('Text', {
                                        rules: [{ required: true, message: 'Please input 显示名称!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
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
                                <FormItem label="行为类型" {...formItemLayout}>
                                    {getFieldDecorator('ActionType', {
                                        rules: [{ required: true, message: 'Please input 行为类型!' }],
                                    })(
                                        <Select disabled={disabled} onChange={this.ActionType}>
                                            {ActionType}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="ACTION名称" {...formItemLayout}>
                                    {getFieldDecorator('Action', {
                                        rules: [{ required: true, message: 'Please input ACTION名称!' }],
                                    })(
                                        <Input disabled={disabled} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem label="修改日期" {...formItemLayout}>
                                    {getFieldDecorator('LastModifyTime')(
                                        <Input disabled={true} autoComplete="off" />
                                    )}
                                </FormItem>
                                <FormItem label="所属模块" {...formItemLayout}>
                                    {getFieldDecorator('Module', {
                                        rules: [{ required: true, message: 'Please input 所属模块!' }],
                                    })(
                                        <Select disabled={disabled}>
                                            {Options}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="程序集" {...formItemLayout}>
                            {getFieldDecorator('InitialAssemblyRef', {
                                rules: [{ required: true, message: 'Please input 程序集!' }],
                            })(
                                <Input disabled={disabled} autoComplete="off" />
                            )}
                        </FormItem>
                        <FormItem label="命名空间" {...formItemLayout}>
                            {getFieldDecorator('Initial', {
                                rules: [{ required: true, message: 'Please input 命名空间!' }],
                            })(
                                <Input disabled={disabled} autoComplete="off" />
                            )}
                        </FormItem>
                        <FormItem label="参数" {...formItemLayout}>
                            {getFieldDecorator('ParamString')(
                                <Input disabled={disabled} autoComplete="off" />
                            )}
                        </FormItem>
                        <FormItem label="窗体是否唯一" {...formItemLayout}>
                            {getFieldDecorator('IsSingle')(
                                <CheckBox disabled={disabled} />
                            )}
                        </FormItem>
                        <FormItem label="备注" {...formItemLayout}>
                            {getFieldDecorator('Notes')(
                                <Input disabled={disabled} autoComplete="off" />
                            )}
                        </FormItem>
                    </Card>
                </Spin>
            </Form>
        );
    }
}

const WindowsAction = Form.create({
    mapPropsToFields(props) {
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

export default WindowsAction
