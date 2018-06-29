import React from 'react'
import { Form, Input, Select, Row, Col, Button, Radio, notification, Spin, Tabs } from 'antd';
import { postFetchForm } from '../../Math/Math'
import { Save } from '../../Math/APIconfig'
import CheckboxGroup from 'antd/lib/checkbox/Group';
import CheckBox from '../checkbox/CheckBox';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group
const ButtonGroup = Button.Group
const { TextArea } = Input
const { TabPane } = Tabs
const FormList = [
    'Author', 'ConditionControlAssembly', 'ConditionControlNameSpace', 'DataSource', 'DisplayAssembly', 'DisplayNamespace',
    'DisplayToolbar', 'FormAction', 'FormName', 'ImmediatelyQuery', 'IsDisplayConditionControl', 'IsUseCacheServer',
    'Module', 'MultiSelect', 'OneRowAutoPopForm', 'SQLScripeGUID', 'SearchFormAssembly', 'SearchFormHeight', 'SearchFormNameSpace',
    'SearchFormShowPosition', 'SearchFormWide', 'SqlCode', 'UseClientCache'
]
const FormLisrSqlScript = ['Author', 'Module', 'Note', 'ScriptType',
    'SqlName', 'SqlScripe']
const OptionValue = ['财务模块', '采购模块', '价格模块', '结算模块', '库存模块', '其他模块', '销售模块', '资金模块', '系统设置模块']
const CheckboxOption = [
    { label: '多选', value: 'MultiSelect' },
    { label: '只有一行结果时,直接回写结果', value: 'OneRowAutoPopForm' },
    { label: '立即查询', value: 'ImmediatelyQuery' }
]
const dataCheckbox = [
    { label: '优先使用缓存服', value: 'IsUseCacheServer' },
    { label: '客户端缓存', value: 'UseClientCache' }
]
const toolBar = [
    { label: '显示工具栏', value: 'DisplayToolbar' },
    { label: '条件控件', value: 'IsDisplayConditionControl' }
]
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitData: {},
            disabledCopy: true,
            disabled: true,
            loading: false,
            windwosRadio: true,//窗体
            dataShow: 1,//数据展现
            Control: 1,//工具
        }
    }
    componentWillMount() {
        const { TableValue, disabled } = this.props
        let SearchFormNameSpace, DisplayNamespace, ConditionControlNameSpace
        if (TableValue.SearchFormNameSpace === 'JZT.UI.Forms.BaseSearchForm') {
            SearchFormNameSpace = true
        } else {
            SearchFormNameSpace = false
        }
        if (TableValue.DisplayNamespace === 'JZT.UI.Controls.BrowseTableUseGridControl') {
            DisplayNamespace = 1
        } else if (TableValue.DisplayNamespace === 'JZT.UI.Controls.BrowseTableUseTreeview') {
            DisplayNamespace = 2
        } else if (TableValue.DisplayNamespace === 'JZT.UI.Controls.BrowseTableUseListview') {
            DisplayNamespace = 4
        } else {
            DisplayNamespace = 3
        }
        if (TableValue.ConditionControlNameSpace === 'JZT.UI.FlowControl.ConditionTemplate') {
            ConditionControlNameSpace = 1
        } else if (TableValue.ConditionControlNameSpace === 'JZT.UI.Query.Designer.ConfigurableQueryControl') {
            ConditionControlNameSpace = 3
        } else {
            ConditionControlNameSpace = 2
        }
        this.setState({
            submitData: TableValue,
            disabled: disabled,
            windwosRadio: SearchFormNameSpace,
            dataShow: DisplayNamespace,
            Control: ConditionControlNameSpace
        }, () => {
            // console.log(this.state.submitData)
            // console.log(this.state.disabled)
        })
    }
    componentWillReceiveProps(pre) {
        // console.log(pre)
        const TableValue = pre.TableValue
        const disabled = pre.disabled
        let SearchFormNameSpace, DisplayNamespace, ConditionControlNameSpace
        if (TableValue.SearchFormNameSpace === 'JZT.UI.Forms.BaseSearchForm') {
            SearchFormNameSpace = true
        } else {
            SearchFormNameSpace = false
        }
        if (TableValue.DisplayNamespace === 'JZT.UI.Controls.BrowseTableUseGridControl') {
            DisplayNamespace = 1
        } else if (TableValue.DisplayNamespace === 'JZT.UI.Controls.BrowseTableUseTreeview') {
            DisplayNamespace = 2
        } else if (TableValue.DisplayNamespace === 'JZT.UI.Controls.BrowseTableUseListview') {
            DisplayNamespace = 4
        } else {
            DisplayNamespace = 3
        }
        if (TableValue.ConditionControlNameSpace === 'JZT.UI.FlowControl.ConditionTemplate') {
            ConditionControlNameSpace = 1
        } else if (TableValue.ConditionControlNameSpace === 'JZT.UI.Query.Designer.ConfigurableQueryControl') {
            ConditionControlNameSpace = 3
        } else {
            ConditionControlNameSpace = 2
        }
        this.setState({
            submitData: TableValue,
            disabled: disabled,
            windwosRadio: SearchFormNameSpace,
            dataShow: DisplayNamespace,
            Control: ConditionControlNameSpace
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
                let SqlScripe = JSON.parse(JSON.stringify(this.props.clear.SqlScripe))
                let sub = JSON.parse(JSON.stringify(this.props.clear))
                Object.assign(sub, values)
                Object.assign(SqlScripe, values.SqlScripe)
                sub.SqlScripe = SqlScripe
                console.log('Received values of form: ', sub);
                postFetchForm(Save().Pop, sub, (res) => {
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
    CheckboxOnchange = (valueArr) => {
        console.log(valueArr)
        this.setState({
            submitData: Object.assign(this.state.submitData, { [valueArr[valueArr.length - 1]]: !this.state.submitData[valueArr[valueArr.length - 1]] })
        })
    }
    dataCheckbox = (valueArr) => {
        console.log(valueArr)
        this.setState({
            submitData: Object.assign(this.state.submitData, { [valueArr[valueArr.length - 1]]: !this.state.submitData[valueArr[valueArr.length - 1]] })
        })
    }
    //主窗口缺省
    windows = (value) => {
        //缺省
        // console.log(value.target.value)
        this.setState({
            windwosRadio: value.target.value
        })
        this.props.form.setFieldsValue({
            SearchFormAssembly: `${value.target.value ? 'JZT.UI' : ''}`,
            SearchFormNameSpace: `${value.target.value ? 'JZT.UI.Forms.BaseSearchForm' : ''}`
        });
    }
    toolBar = (valueArr) => {
        console.log(valueArr)
        this.setState({
            submitData: Object.assign(this.state.submitData, { [valueArr[valueArr.length - 1]]: !this.state.submitData[valueArr[valueArr.length - 1]] })
        })
    }
    Control = (value) => {
        // console.log(value.target.value)
        let values = value.target.value
        this.setState({
            Control: values
        })
        this.props.form.setFieldsValue({
            ConditionControlAssembly: `${values === 1 ? 'JZT.UI' :
                values === 2 ? '' : 'JZT.UI'}`,
            ConditionControlNameSpace: `${values === 1 ? 'JZT.UI.FlowControl.ConditionTemplate' :
                values === 2 ? '' : 'JZT.UI.Query.Designer.ConfigurableQueryControl'}`
        });
    }
    Display = (e) => {
        // console.log(e.target.value)
        let values = e.target.value
        this.setState({
            dataShow: values
        })
        this.props.form.setFieldsValue({
            DisplayAssembly: `${values === 1 ? 'JZT.UI' :
                values === 2 ? 'JZT.UI' :
                    values === 3 ? '' : 'JZT.UI'}`,
            DisplayNamespace: `${values === 1 ? 'JZT.UI.Controls.BrowseTableUseGridControl' :
                values === 2 ? 'JZT.UI.Controls.BrowseTableUseTreeview' :
                    values === 3 ? '' : 'JZT.UI.Controls.BrowseTableUseListview'}`
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
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const checkboxItem = {
            labelCol: {
                span: 15,
                offset: 3
            },
            wrapperCol: {
                span: 2,
                offset: 1
            }
        }
        const checkboxItems = {
            labelCol: {
                span: 12,
                offset: 1
            },
            wrapperCol: {
                span: 2,
                offset: 1
            }
        }
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
                    <Tabs defaultActiveKey='1' tabBarExtraContent={
                        <ButtonGroup>
                            <Button type="primary" htmlType="submit" disabled={disabled}>确定</Button>
                            <Button type='danger' htmlType='button' disabled={disabled} onClick={this.handleReset}>重置</Button>
                        </ButtonGroup>}>
                        <TabPane tab='基本信息' key='1'>
                            <Row gutter={2}>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label="窗体Action">
                                        {getFieldDecorator('FormAction', {
                                            rules: [{ required: true, message: 'Please input 窗体Action!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="窗体名称"
                                    >
                                        {getFieldDecorator('FormName', {
                                            rules: [{ required: true, message: 'Please input 窗体名称!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="作者"
                                    >
                                        {getFieldDecorator('Author', {
                                            rules: [{ required: true, message: 'Please input 作者!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="所属模块"
                                    >
                                        {getFieldDecorator('Module', {
                                            rules: [{ required: true, message: 'Please select your habitual Module!' }],
                                        })(
                                            <Select disabled={disabled}>
                                                {Options}
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="实体类"
                                    >
                                        {getFieldDecorator('entity')(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <Row>
                                        <Col span={12}>
                                            <FormItem {...checkboxItem} label="多选"
                                            >
                                                {getFieldDecorator('MultiSelect')(
                                                    <CheckBox disabled={disabled} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem {...checkboxItem} label="立即查询"
                                            >
                                                {getFieldDecorator('ImmediatelyQuery')(
                                                    <CheckBox disabled={disabled} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={24}>
                                            <FormItem {...checkboxItems} label="只有一行结果，直接回写结果"
                                            >
                                                {getFieldDecorator('OneRowAutoPopForm')(
                                                    <CheckBox disabled={disabled} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem {...checkboxItem} label="优先使用缓存服务"
                                            >
                                                {getFieldDecorator('IsUseCacheServer')(
                                                    <CheckBox disabled={disabled} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem {...checkboxItem} label="客户端缓存"
                                            >
                                                {getFieldDecorator('UseClientCache')(
                                                    <CheckBox disabled={disabled} />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>

                                    <FormItem
                                        {...formItemLayout}
                                        label="数据来源"
                                    >
                                        {getFieldDecorator('DataSource', {
                                            rules: [{ required: true, message: '数据来源!' }],
                                        })(
                                            <RadioGroup disabled={disabled}>
                                                <Radio value={0}>集中服务器</Radio>
                                                <Radio value={1}>分公司服务器</Radio>
                                                <Radio value={2}>solr集中服务器</Radio>
                                                <Radio value={3}>solr分公司</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="窗口"
                                    >
                                        <RadioGroup disabled={disabled} onChange={this.windows} value={this.state.windwosRadio}>
                                            <Radio value={true}>缺省主窗口</Radio>
                                            <Radio value={false}>自定义</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="查询窗体程序集"
                                    >
                                        {getFieldDecorator('SearchFormAssembly', {
                                            rules: [{ required: true, message: 'Please input 查询窗体程序集!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="查询窗体命名空间"
                                    >
                                        {getFieldDecorator('SearchFormNameSpace', {
                                            rules: [{ required: true, message: 'Please input 查询窗体命名空间!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="弹出窗口停靠位置"
                                    >
                                        {getFieldDecorator('SearchFormShowPosition', {
                                            rules: [{ required: true, message: 'Please input 窗口高!' }],
                                        })(
                                            <RadioGroup disabled={disabled}>
                                                <Radio value='01'>屏幕中间</Radio>
                                                <Radio value='02'>停靠控件</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="窗口高"
                                    >
                                        {getFieldDecorator('SearchFormHeight', {
                                            rules: [{ required: true, message: 'Please input 窗口高!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="窗口宽"
                                    >
                                        {getFieldDecorator('SearchFormWide', {
                                            rules: [{ required: true, message: 'Please input 窗口宽!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={12}>
                                            <FormItem {...checkboxItem} label="显示工具栏"
                                            >
                                                {getFieldDecorator('DisplayToolbar')(
                                                    <CheckBox disabled={disabled} />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem {...checkboxItem} label="条件控件"
                                            >
                                                {getFieldDecorator('IsDisplayConditionControl')(
                                                    <CheckBox disabled={disabled} />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <FormItem
                                        {...formItemLayout}
                                        label="条件控件"
                                    >
                                        <RadioGroup disabled={disabled} onChange={this.Control} value={this.state.Control}>
                                            <Radio value={1}>条件模板</Radio>
                                            <Radio value={2}>自定义</Radio>
                                            <Radio value={3}>设计</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="条件控制程序集"
                                    >
                                        {getFieldDecorator('ConditionControlAssembly', {
                                            rules: [{ required: true, message: 'Please input 条件控制程序集!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="条件控制命名空间"
                                    >
                                        {getFieldDecorator('ConditionControlNameSpace', {
                                            rules: [{ required: true, message: 'Please input 条件控制命名空间!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="数据展现"
                                    >
                                        <RadioGroup disabled={disabled} onChange={this.Display} value={this.state.dataShow}>
                                            <Radio value={1}>表格展现</Radio>
                                            <Radio value={2}>树形展现</Radio>
                                            <Radio value={3}>自定义</Radio>
                                            <Radio value={4}>ListView展现</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="呈现程序集"
                                    >
                                        {getFieldDecorator('DisplayAssembly', {
                                            rules: [{ required: true, message: 'Please input 呈现程序集!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="呈现命名空间"
                                    >
                                        {getFieldDecorator('DisplayNamespace', {
                                            rules: [{ required: true, message: 'Please input 呈现命名空间!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab='数据定义' key='2'>
                            <Row gutter={1}>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="作者"
                                    >
                                        {getFieldDecorator('SqlScripe.Author', {
                                            rules: [{ required: true, message: '作者!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="GUID"
                                    >
                                        {getFieldDecorator('SQLScripeGUID')(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="所属模块"
                                    >
                                        {getFieldDecorator('SqlScripe.Module', {
                                            rules: [{ required: true, message: 'Please select your habitual Module!' }],
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
                                        {getFieldDecorator('SqlScripe.SqlName', {
                                            rules: [{ required: true, message: 'SQL语句标识!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="脚本类型"
                                    >
                                        {getFieldDecorator('SqlScripe.ScriptType')(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="描述"
                                    >
                                        {getFieldDecorator('SqlScripe.Note')(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="SQL执行语句"
                                    >
                                        {getFieldDecorator('SqlScripe.SqlScripe', {
                                            rules: [{ required: true, message: 'SQL执行语句!' }],
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
                        </TabPane>
                    </Tabs>
                </Spin>
            </Form>
        );
    }
}

const PopWindowsAction = Form.create({
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
        // Field.SqlScripe = {}
        FormLisrSqlScript.forEach(element => {
            Field['SqlScripe.' + element] = Form.createFormField({ value: TableValue.SqlScripe[element] })
        })
        // Field.TableValue = TableValue
        console.log(Field)
        return Field
    }
})(RegistrationForm);

export default PopWindowsAction
