import React from 'react'
import { Form, Input, Select, Row, Col, Button, Card, Radio, Checkbox} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group
const FormList = [
    'BillTypeCode', 'BillTypeName', 'BillCatalog', 'Author', 'Module', 'BillScripe', 'ClassName', 'ClassAssembly'
    , 'HpClassNameSpace', 'IncludeChild', 'IsOpen', 'IsBpm', 'ClassNameSpace', 'MasterTableName', 'SloveTableName',
    'EditWinAssembly', 'EditWinNameSpace', 'EditControlAssembly', 'EditControlNameSpace', 'DisplayBillFormAssembly'
    , 'DisplayBillFormNameSpace', 'DataSource', 'URL'
]
const OptionValue = ['财务模块', '采购模块', '价格模块', '结算模块', '库存模块', '其他模块', '销售模块', '资金模块', '系统设置模块']

class RegistrationForm extends React.Component {
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    //刷新
    handleReset = () => {
        this.props.form.resetFields();
    }
    handleSelectChange = (value)=>{
        console.log(value)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props)
        const {disabled} = this.props
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
                <Row gutter={1}>
                    <Col span={14}>
                        <Card title='基本信息'>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="单据类型标识"
                                >
                                    {getFieldDecorator('BillTypeCode')(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="单据类型名称"
                                >
                                    {getFieldDecorator('BillTypeName', {
                                        rules: [{ required: true, message: 'Please input 单据类型名称!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="业务分类"
                                >
                                    {getFieldDecorator('BillCatalog', {
                                        rules: [{ required: true, message: 'Please input 业务分类!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="作者"
                                >
                                    {getFieldDecorator('Author', {
                                        rules: [{ required: true, message: 'Please input 作者!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="所属模块"
                                >
                                    {getFieldDecorator('Module', {
                                        rules: [{required: true, message: 'Please select your habitual Module!' }],
                                    })(
                                        <Select onChange={this.handleSelectChange} disabled={disabled}>
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
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类"
                                >
                                    {getFieldDecorator('ClassName', {
                                        rules: [{ required: true, message: 'Please input 实体类!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="实体类程序集"
                                >
                                    {getFieldDecorator('ClassAssembly', {
                                        rules: [{ required: true, message: 'Please input 实体类程序集!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="HP实体类主对象"
                                >
                                    {getFieldDecorator('HpClassNameSpace', {
                                        rules: [{ required: true, message: 'Please input HP实体类主对象!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="HP实体类子对象"
                                >
                                    {getFieldDecorator('IncludeChild', {
                                        rules: [{ required: true, message: 'Please input HP实体类子对象!' }],
                                    })(
                                        <Input disabled={disabled}/>
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
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="主表名"
                                >
                                    {getFieldDecorator('MasterTableName', {
                                        rules: [{ required: true, message: 'Please input 主表名!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="子表名"
                                >
                                    {getFieldDecorator('SloveTableName', {
                                        rules: [{ required: true, message: 'Please input 子表名!' }],
                                    })(
                                        <Input disabled={disabled}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card title='展现'>
                            <FormItem
                                {...formItemLayout}
                                label="实体类窗口程序集"
                            >
                                {getFieldDecorator('EditWinAssembly', {
                                    rules: [{ required: true, message: '实体类窗口程序集!' }],
                                })(
                                    <Input disabled={disabled}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="实体类窗口命名空间"
                            >
                                {getFieldDecorator('EditWinNameSpace', {
                                    rules: [{ required: true, message: '实体类窗口命名空间!' }],
                                })(
                                    <Input disabled={disabled}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="实体类控件程序集"
                            >
                                {getFieldDecorator('EditControlAssembly', {
                                    rules: [{ required: true, message: '实体类控件程序集!' }],
                                })(
                                    <Input disabled={disabled}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="实体类控件命名空间"
                            >
                                {getFieldDecorator('EditControlNameSpace', {
                                    rules: [{ required: true, message: '实体类控件命名空间!' }],
                                })(
                                    <Input disabled={disabled}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="单据再现窗口程序集"
                            >
                                {getFieldDecorator('DisplayBillFormAssembly', {
                                    rules: [{ required: true, message: '单据再现窗口程序集!' }],
                                })(
                                    <Input disabled={disabled}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="单据再现窗口命名空间"
                            >
                                {getFieldDecorator('DisplayBillFormNameSpace', {
                                    rules: [{ required: true, message: '单据再现窗口命名空间!' }],
                                })(
                                    <Input disabled={disabled}/>
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
                                    <Input disabled={disabled}/>
                                )}
                            </FormItem>
                        </Card>
                    </Col>
                </Row>
                {/* 确认按钮 */}
                <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const BillAction = Form.create({mapPropsToFields(props){
    // console.log(1)
    const { TableValue } = props
        // console.log(TableValue)
        let Field = {}
        FormList.forEach(element => {
            if (TableValue[element]) {
                Field[element] = Form.createFormField({value:TableValue[element]})
            }
        });
        // Field.TableValue = TableValue
        return Field
}})(RegistrationForm);

export default BillAction
