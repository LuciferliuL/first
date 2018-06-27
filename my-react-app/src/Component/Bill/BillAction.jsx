import React from 'react'
import { Form, Input, Select, Row, Col, Button, Card, Radio, Checkbox, notification, Spin } from 'antd';
import { getTimeFetch, postFetchForm } from '../../Math/Math'
import { Copy, Save } from '../../Math/APIconfig'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group
const ButtonGroup = Button.Group
const FormList = [
    'BillTypeCode', 'BillTypeName', 'BillCatalog', 'Author', 'Module', 'BillScripe', 'ClassName', 'ClassAssembly'
    , 'HpClassNameSpace', 'IncludeChild', 'IsOpen', 'IsBpm', 'ClassNameSpace', 'MasterTableName', 'SloveTableName',
    'EditWinAssembly', 'EditWinNameSpace', 'EditControlAssembly', 'EditControlNameSpace', 'DisplayBillFormAssembly'
    , 'DisplayBillFormNameSpace', 'DataSource', 'URL'
]
const OptionValue = ['财务模块', '采购模块', '价格模块', '结算模块', '库存模块', '其他模块', '销售模块', '资金模块', '系统设置模块']

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitData: {},
            disabledCopy: true,
            disabled: true,
            loading: false
        }
    }
    componentWillReceiveProps(pre) {
        this.setState({
            submitData: pre.clear,
            disabled: pre.disabled
        }, () => {
            console.log(this.state.submitData)
            console.log(this.state.disabled)
        })
    }
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            this.setState({
                loading:true
            })
            if (!err) {
                Object.assign(this.state.submitData, values)
                console.log('Received values of form: ', this.state.submitData);
                postFetchForm(Save().BillAPI, this.state.submitData, (res) => {
                    if (res.IsSuccess === 'True') {
                        this.setState({
                            disabledCopy: false,
                            disabled: true,
                            loading:false
                        }, () => {
                            notification.success({
                                message: '提示',
                                description: '可以进行分公司复制或执行同步',
                                btn: <ButtonGroup>
                                    <Button onClick={this.asyncData(res.SqlList)} size='small'>同步</Button>
                                    <Button onClick={() => { notification.close() }} size='small'>取消</Button>
                                </ButtonGroup>
                            })
                        })
                    } else {
                        this.setState({
                            loading:false
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
    Copy = () => {
        let currentPK = this.state.submitData.PK
        this.setState({
            loading: true
        })
        getTimeFetch(Copy(currentPK).BillDefine, (res) => {
            if (res.IsSuccess === 'True') {
                this.setState({
                    loading: false
                }, () => {
                    notification.success({
                        message: '提示',
                        description: '分公司复制成功，可以执行同步',
                        btn: <ButtonGroup>
                            <Button onClick={this.asyncData(res.SqlList)} size='small'>同步</Button>
                            <Button onClick={() => { notification.close() }} size='small'>取消</Button>
                        </ButtonGroup>
                    })
                })

            } else {
                this.setState({
                    loading: false
                }, () => {
                    notification.warning({
                        message: '警告',
                        description: '分公司复制失败'
                    })
                })
            }
        })
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
        // console.log(this.props)
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
        const Options = []
        OptionValue.forEach((element) => {
            Options.push(
                <Option key={element} value={element}>{element}</Option>
            )
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                <Spin spinning={loading}>
                    <Row gutter={1}>
                        <Card title='基本信息与展现' extra={
                            <ButtonGroup>
                                <Button type="primary" htmlType="submit" disabled={disabled}>确定</Button>
                                <Button type='danger' htmlType='button' disabled={disabled} onClick={this.handleReset}>重置</Button>
                                <Button type='ghost' htmlType='button' disabled={this.state.disabledCopy} onClick={this.Copy}>复制到所有分公司</Button>
                            </ButtonGroup>
                        }>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="单据类型标识"
                                >
                                    {getFieldDecorator('BillTypeCode')(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="单据类型名称"
                                >
                                    {getFieldDecorator('BillTypeName', {
                                        rules: [{ required: true, message: 'Please input 单据类型名称!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="业务分类"
                                >
                                    {getFieldDecorator('BillCatalog', {
                                        rules: [{ required: true, message: 'Please input 业务分类!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="作者"
                                >
                                    {getFieldDecorator('Author', {
                                        rules: [{ required: true, message: 'Please input 作者!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="所属模块"
                                >
                                    {getFieldDecorator('Module', {
                                        rules: [{ required: true, message: 'Please select your habitual Module!' }],
                                    })(
                                        <Select disabled={disabled}>
                                            {Options}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="单据描述"
                                >
                                    {getFieldDecorator('BillScripe', {
                                        rules: [{ required: true, message: 'Please input 单据描述!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类"
                                >
                                    {getFieldDecorator('ClassName', {
                                        rules: [{ required: true, message: 'Please input 实体类!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类程序集"
                                >
                                    {getFieldDecorator('ClassAssembly', {
                                        rules: [{ required: true, message: 'Please input 实体类程序集!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem
                                    {...formItemLayout}
                                    label="HP实体类主对象"
                                >
                                    {getFieldDecorator('HpClassNameSpace', {
                                        rules: [{ required: true, message: 'Please input HP实体类主对象!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="HP实体类子对象"
                                >
                                    {getFieldDecorator('IncludeChild', {
                                        rules: [{ required: true, message: 'Please input HP实体类子对象!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="是否启用HP"
                                >
                                    {getFieldDecorator('IsOpen', {
                                        rules: [{ required: true, message: '是否启用HP!' }],
                                    })(
                                        <RadioGroup disabled={disabled}>
                                            <Radio value={1}>是</Radio>
                                            <Radio value={0}>否</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="IsBpm"
                                >
                                    {getFieldDecorator('IsBpm')(
                                        <Checkbox disabled={disabled}>是</Checkbox>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="全类名"
                                >
                                    {getFieldDecorator('ClassNameSpace', {
                                        rules: [{ required: true, message: 'Please input 全类名!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="主表名"
                                >
                                    {getFieldDecorator('MasterTableName', {
                                        rules: [{ required: true, message: 'Please input 主表名!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="子表名"
                                >
                                    {getFieldDecorator('SloveTableName', {
                                        rules: [{ required: true, message: 'Please input 子表名!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={10}>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类窗口程序集"
                                >
                                    {getFieldDecorator('EditWinAssembly', {
                                        rules: [{ required: true, message: '实体类窗口程序集!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类窗口命名空间"
                                >
                                    {getFieldDecorator('EditWinNameSpace', {
                                        rules: [{ required: true, message: '实体类窗口命名空间!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类控件程序集"
                                >
                                    {getFieldDecorator('EditControlAssembly', {
                                        rules: [{ required: true, message: '实体类控件程序集!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类控件命名空间"
                                >
                                    {getFieldDecorator('EditControlNameSpace', {
                                        rules: [{ required: true, message: '实体类控件命名空间!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="单据再现窗口程序集"
                                >
                                    {getFieldDecorator('DisplayBillFormAssembly', {

                                        rules: [{ required: true, message: '单据再现窗口程序集!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="单据再现窗口命名空间"
                                >
                                    {getFieldDecorator('DisplayBillFormNameSpace', {
                                        rules: [{ required: true, message: '单据再现窗口命名空间!' }],
                                    })(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="来源数据"
                                >
                                    {getFieldDecorator('DataSource', {
                                        rules: [{ required: true, message: 'Please input website!' }],
                                    })(
                                        <RadioGroup disabled={disabled}>
                                            <Radio value={1}>集中服务器</Radio>
                                            <Radio value={0}>分公司服务器</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="URL"
                                >
                                    {getFieldDecorator('URL')(
                                        <Input disabled={disabled} autocomplete="off"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Card>
                    </Row>
                </Spin>
            </Form>
        );
    }
}

const BillAction = Form.create({
    mapPropsToFields(props) {
        // console.log(1)
        const { TableValue } = props
        // console.log(TableValue)
        let Field = {}
        FormList.forEach(element => {
            if (TableValue[element]) {
                Field[element] = Form.createFormField({ value: TableValue[element] })
            }
        });
        // Field.TableValue = TableValue
        return Field
    }
})(RegistrationForm);

export default BillAction
