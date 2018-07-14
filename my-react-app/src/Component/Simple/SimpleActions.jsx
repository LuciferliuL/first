import React from 'react'
import { Form, Input, Select, Row, Col, Button, notification, Spin, Card, Collapse, Switch, Tabs, Icon } from 'antd';
import { postFetch, getTime } from '../../Math/Math'
import { Save } from '../../Math/APIconfig'
import SimpleBtn from './SimpleBtn'
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane
const { TextArea } = Input
const Panel = Collapse.Panel;
let i = 0
const Widths = { width: 100 + '%' }
const FormList = ['BillTypeCode', 'DQueryParamAssembly', 'DQueryMasterAssembly', 'DQuerySlaveAssembly', 'Author', 'DQueryCaption', 'DQueryParamFullName', 'Module',
    'DQueryMasterFullName', 'DQuerySlaveFullName', 'LayoutMode', 'QueryExtend', 'Settings']
const FormListQuery = ['DQueryCaption', 'DataSource', 'IsPaging', 'IsUseCacheServer', 'DQuerySql.SqlScripe', 'DQuerySql.SqlName']
const OptionValue = ['财务模块', '采购模块', '价格模块', '结算模块', '库存模块', '其他模块', '销售模块', '资金模块', '系统设置模块']
const OptionsLayValue = ["fluidLayout", '0']
const SettingsOri = [
    'AllowExport',
    'AllowReverseState',
    'AllowWorkFlowQuery',
    'PrintAll',
    'AllowPrint',
    'AllowReset',
    'AllowDelete',
    'AllowEdit',
    'AllowView',
    'ShowOrgSelect',
    'ParamsCheck',
    'SQLRebuilding',
    'IsLinkOnOrgSelect',
    'AllowOrgMultiSelect',]
const MenuAdmin = [
    { Name: '允许导出数据', Code: 'AllowExport' },
    { Name: '允许状态扭转', Code: 'AllowReverseState' },
    { Name: '允许查看工作流', Code: 'AllowWorkFlowQuery' },
    { Name: '允许打印所有', Code: 'PrintAll' },
    { Name: '允许打印', Code: 'AllowPrint' },
    { Name: '允许重设', Code: 'AllowReset' },
    { Name: '允许删除', Code: 'AllowDelete' },
    { Name: '允许编辑', Code: 'AllowEdit' },
    { Name: '允许查看', Code: 'AllowView' },
    { Name: '允许查分公司数据', Code: 'ShowOrgSelect' }
]
const ServerAdmin = [
    { Name: '查询前参数检查', Code: 'ParamsCheck' },
    { Name: '允许SQL自动重构', Code: 'SQLRebuilding' }
]
const FunAdmin = [
    { Name: '分公司勾选联动', Code: 'IsLinkOnOrgSelect' },
    { Name: '分公司允许多选', Code: 'AllowOrgMultiSelect' }
]
class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitData: {},
            disabledCopy: true,
            disabled: true,
            loading: false,
            counts: 0,//用来记录有几组QueryExtend
            QueryExtend: {
                BillTypeCode: '',
                BranchID: "STD",
                CreateTime: getTime(),
                DQueryCaption: '',
                DQueryName: '',
                DQuerySql: '',
                DataSource: 1,
                DeleteFlag: 0,
                FK: 0,
                GuidString: null,
                IsPaging: 0,
                IsUseCacheServer: 1,
                LastModifyTime: getTime(),
                LineID: 0,
                Note: null,
                OriginalGuidString: null,
                PK: -1,
                QuerySqlGuid: null,
                SoftSystemCode: "GOS",
                SolrBranch: null,
                SolrScript: null,
                SolrScriptGuid: null,
                Tag: null,
                Version: 1,
                WorkFlowGuid: "",
                WorkFlowState: "",
            },
            DQuerySql: {
                Author: '',
                BranchID: "STD",
                CreateTime: '',
                DeleteFlag: 0,
                FK: -1,
                GuidString: null,
                LastModifyTime: getTime(),
                LastUpdater: null,
                LineID: -1,
                Module: null,
                Note: null,
                OriginalGuidString: null,
                PK: -1,
                QueryDataRightCode: null,
                ScriptType: null,
                SoftSystemCode: "GOS",
                SqlName: '',
                SqlScripe: '',
                TableDisplayerGuid: null,
                Tag: null,
                Version: 5,
                VersionNum: 4,
                WorkFlowGuid: "",
                WorkFlowState: "",
            },
            panel: [],
            panel2: []
        }
    }
    componentWillMount() {
        const { TableValue, disabled } = this.props
        i = TableValue.QueryExtend.length
        this.setState({
            submitData: TableValue,
            disabled: disabled,
            counts: TableValue.QueryExtend.length
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
            counts: TableValue.QueryExtend.length
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
                // postFetch(Save().SQL, sub, (res) => {
                //     if (res.IsSuccess === 'True') {
                //         this.setState({
                //             disabledCopy: false,
                //             disabled: true,
                //             loading: false
                //         }, () => {
                //             notification.success({
                //                 message: '提示',
                //                 description: '可以执行同步',
                //                 key: '1',
                //                 btn: <ButtonGroup>
                //                     <Button onClick={() => { this.asyncData(res.SqlList) }} size='small'>同步</Button>
                //                     <Button onClick={this.ActiveTable.bind(this)} size='small'>取消</Button>
                //                 </ButtonGroup>
                //             })
                //         })
                //     } else {
                //         this.setState({
                //             loading: false
                //         })
                //         notification.warning({
                //             message: '警告',
                //             description: '保存失败' + res.ErrMessage
                //         })
                //     }
                // })
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
    callback = (key) => {
        // console.log(key);
    }
    //点击打开表格查询
    handleBook = (value) => {
        console.log(value)
    }
    //添加Tab
    addTabs = () => {
        const { getFieldDecorator, getFieldsValue, setFieldsValue } = this.props.form
        const { panel2, counts } = this.state
        const switchLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const formItemLayoutTab = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const Qu = getFieldsValue(`QueryExtend[${counts}].DQueryCaption`)
        const nextQu = Qu.concat('')
        setFieldsValue({
            Qu: nextQu
        })
        panel2.push(<TabPane key={i + 'QueryExtend'} tab='Tab'>
            <FormItem
                {...formItemLayoutTab}
                label="页签名称"
            >
                {getFieldDecorator(`QueryExtend[${i}].DQueryCaption`, {
                    rules: [{ required: true, message: 'Please input 页签名称!' }],
                })(
                    <Input autoComplete="off" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayoutTab}
                label="SQL名"
            >
                {getFieldDecorator(`QueryExtend[${i}].DQuerySql.SqlName`, {
                    rules: [{ required: true, message: 'Please input SQL名!' }],
                })(
                    <Input autoComplete="off"
                        addonAfter={
                            <SimpleBtn handleBook={this.handleBook.bind(this)}></SimpleBtn>
                        } />
                )}
            </FormItem>
            <Col span={12}>
                <FormItem label='是否分页' {...switchLayout}>
                    {getFieldDecorator(`QueryExtend[${i}].IsPaging`, { valuePropName: 'checked' })(
                        <Switch />
                    )}
                </FormItem>
            </Col>
            <Col span={12}>
                <FormItem label='是否使用缓存服务器' {...switchLayout}>
                    {getFieldDecorator(`QueryExtend[${i}].IsUseCacheServer`, { valuePropName: 'checked' })(
                        <Switch />
                    )}
                </FormItem>
            </Col>
            <FormItem
                {...formItemLayoutTab}
                label="数据来源"
            >
                {getFieldDecorator(`QueryExtend[${i}].DataSource`, {
                    rules: [{ required: true, message: 'Please input 数据来源!' }],
                })(
                    <Select
                        style={Widths}>
                        <Option value={0}>集中服务器</Option>
                        <Option value={1}>分公司服务器</Option>
                        <Option value={2}>SOLR</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayoutTab}
                label="SQL内容"
            >
                {getFieldDecorator(`QueryExtend[${i}].DQuerySql.SqlScripe`, {
                    rules: [{ required: true, message: 'Please input SQL内容!' }],
                })(
                    <TextArea autoComplete="off" rows={10} cols={20}
                        style={{ resize: 'none' }} />
                )}
            </FormItem>
        </TabPane>)
        this.setState({
            panel2: panel2
        }, () => {
            i++
        })
    }
    //删除Tab
    delTabs = () => {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props.form)
        const { disabled, loading, counts, panel, panel2 } = this.state
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
        const switchLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const formItemLayoutTab = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        // console.log(submitData)
        const Options = []
        OptionValue.forEach((element) => {
            Options.push(
                <Option key={element} value={element}>{element}</Option>
            )
        });
        const OptionsLay = []
        OptionsLayValue.forEach((ele) => {
            OptionsLay.push(
                <Option key={ele + 'lay'} value={ele}>{ele}</Option>
            )
        })
        //侧边的
        const Fun = []
        const Servers = []
        const Menu = []
        MenuAdmin.map((v, index) => {
            // console.log(v)
            const n = 'Settings.' + v.Code
            return Menu.push(
                <FormItem label={v.Name} {...switchLayout} key={`${index}Menu`}>
                    {getFieldDecorator(n, { valuePropName: 'checked' })(
                        <Switch disabled={disabled} />
                    )}
                </FormItem>
            )
        })
        ServerAdmin.map((v, index) => {
            const n = 'Settings.' + v.Code
            // console.log(v)
            return Servers.push(
                <FormItem label={v.Name} {...switchLayout} key={`${index}Menu`}>
                    {getFieldDecorator(n, { valuePropName: 'checked' })(
                        <Switch disabled={disabled} />
                    )}
                </FormItem>
            )
        })
        FunAdmin.map((v, index) => {
            const n = 'Settings.' + v.Code
            // console.log(v)
            return Fun.push(
                <FormItem label={v.Name} {...switchLayout} key={`${index}Menu`}>
                    {getFieldDecorator(n, { valuePropName: 'checked' })(
                        <Switch disabled={disabled} />
                    )}
                </FormItem>
            )
        })
        for (let l = 0; l < counts; l++) {
            console.log(counts)
            panel.push(
                <TabPane key={l + 'QueryExtend'} tab='Tab'>
                    <FormItem
                        {...formItemLayoutTab}
                        label="页签名称"
                    >
                        {getFieldDecorator(`QueryExtend[${l}].DQueryCaption`, {
                            rules: [{ required: true, message: 'Please input 页签名称!' }],
                        })(
                            <Input disabled={disabled} autoComplete="off" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayoutTab}
                        label="SQL名"
                    >
                        {getFieldDecorator(`QueryExtend[${l}].DQuerySql.SqlName`, {
                            rules: [{ required: true, message: 'Please input SQL名!' }],
                        })(
                            <Input disabled={disabled} autoComplete="off"
                                addonAfter={
                                    <SimpleBtn handleBook={this.handleBook.bind(this)}></SimpleBtn>
                                } />
                        )}
                    </FormItem>
                    <Col span={12}>
                        <FormItem label='是否分页' {...switchLayout}>
                            {getFieldDecorator(`QueryExtend[${l}].IsPaging`, { valuePropName: 'checked' })(
                                <Switch disabled={disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label='是否使用缓存服务器' {...switchLayout}>
                            {getFieldDecorator(`QueryExtend[${l}].IsUseCacheServer`, { valuePropName: 'checked' })(
                                <Switch disabled={disabled} />
                            )}
                        </FormItem>
                    </Col>
                    <FormItem
                        {...formItemLayoutTab}
                        label="数据来源"
                    >
                        {getFieldDecorator(`QueryExtend[${l}].DataSource`, {
                            rules: [{ required: true, message: 'Please input 数据来源!' }],
                        })(
                            <Select
                                style={Widths}
                                disabled={disabled}>
                                <Option value={0}>集中服务器</Option>
                                <Option value={1}>分公司服务器</Option>
                                <Option value={2}>SOLR</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayoutTab}
                        label="SQL内容"
                    >
                        {getFieldDecorator(`QueryExtend[${l}].DQuerySql.SqlScripe`, {
                            rules: [{ required: true, message: 'Please input SQL内容!' }],
                        })(
                            <TextArea disabled={disabled} autoComplete="off" rows={10} cols={20}
                                style={{ resize: 'none' }} />
                        )}
                    </FormItem>
                </TabPane>
            )
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <Spin spinning={loading}>
                    <Card extra={
                        <ButtonGroup>
                            <Button type="primary" htmlType="submit" disabled={disabled}>确定</Button>
                            <Button type='danger' htmlType='button' disabled={disabled} onClick={this.handleReset}>重置</Button>
                        </ButtonGroup>}>
                        <Row gutter={2}>
                            <Col span={18}>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="查询表示"
                                    >
                                        {getFieldDecorator('BillTypeCode', {
                                            rules: [{ required: true, message: 'Please input 查询表示!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="条件控制程序集"
                                    >
                                        {getFieldDecorator('DQueryParamAssembly', {
                                            rules: [{ required: true, message: 'Please input 条件控制程序集!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="主控件程序集"
                                    >
                                        {getFieldDecorator('DQueryMasterAssembly', {
                                            rules: [{ required: true, message: 'Please input 主控件程序集!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="从控件程序集"
                                    >
                                        {getFieldDecorator('DQuerySlaveAssembly', {
                                            rules: [{ required: true, message: 'Please input 从控件程序集!' }],
                                        })(
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
                                        label="作者"
                                    >
                                        {getFieldDecorator('Author', {
                                            rules: [{ required: true, message: 'Please input 作者!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="窗口名称"
                                    >
                                        {getFieldDecorator('DQueryCaption', {
                                            rules: [{ required: true, message: 'Please input 窗口名称!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="条件控制命名"
                                    >
                                        {getFieldDecorator('DQueryParamFullName', {
                                            rules: [{ required: true, message: 'Please input 条件控制命名!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="主控件命名"
                                    >
                                        {getFieldDecorator('DQueryMasterFullName', {
                                            rules: [{ required: true, message: 'Please input 主控件命名!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="从控件命名"
                                    >
                                        {getFieldDecorator('DQuerySlaveFullName', {
                                            rules: [{ required: true, message: 'Please input 从控件命名!' }],
                                        })(
                                            <Input disabled={disabled} autoComplete="off" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="窗口布局"
                                    >
                                        {getFieldDecorator('LayoutMode', {
                                            rules: [{ required: true, message: 'Please input 窗口布局!' }],
                                        })(
                                            <Select disabled={disabled}>
                                                {OptionsLay}
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem label="打开设计" {...formItemLayout}>
                                        <Select disabled defaultValue={0}>
                                            <Option value={0}>代码设计器</Option>
                                            <Option value={1}>XML设计器</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <Tabs defaultActiveKey='0QueryExtend'
                                        tabBarExtraContent={
                                            <div>
                                                <Button onClick={this.addTabs.bind(this)}>添加</Button>
                                                <Button onClick={this.delTabs.bind(this)}>删除</Button>
                                            </div>
                                        }>
                                        {/* {panel} */}
                                        {panel2}
                                    </Tabs>
                                </Col>
                            </Col>
                            <Col span={6}>
                                <Collapse
                                    defaultActiveKey={['1', '2', '3']}
                                    onChange={this.callback.bind(this)}
                                    bordered={false}>
                                    <Panel header="功能控制" key="1">
                                        {Fun}
                                    </Panel>
                                    <Panel header="系统控制" key="2">
                                        {Servers}
                                    </Panel>
                                    <Panel header="菜单控制" key="3">
                                        {Menu}
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </Card>
                </Spin>
            </Form>
        );
    }
}

const simpleActions = Form.create({
    mapPropsToFields(props) {
        // console.log(1)
        const { TableValue } = props
        // console.log(TableValue)
        let Field = {}
        FormList.forEach(element => {
            switch (element) {
                case 'Settings':
                    let Values = JSON.parse(TableValue.Settings)
                    SettingsOri.forEach(e => {
                        const n = 'Settings.' + e
                        Field[n] = Form.createFormField({ value: Values[e] === 'true' ? true : false })
                    });
                    break;
                case 'QueryExtend':
                    let QueryExtend = TableValue.QueryExtend
                    QueryExtend.forEach((element, index) => {
                        FormListQuery.forEach(value => {
                            switch (value) {
                                case 'DQuerySql.SqlScripe':
                                    Field[`QueryExtend[${index}].${value}`] = Form.createFormField({ value: element['DQuerySql']['SqlScripe'] })
                                    break;
                                case 'DQuerySql.SqlName':
                                    Field[`QueryExtend[${index}].${value}`] = Form.createFormField({ value: element['DQuerySql']['SqlName'] })
                                    break;
                                default:
                                    Field[`QueryExtend[${index}].${value}`] = Form.createFormField({ value: element[value] })
                                    break;
                            }
                        });
                    });
                    break;
                default:
                    Field[element] = Form.createFormField({ value: TableValue[element] })
                    break;
            }
        });
        // Field.TableValue = TableValue
        console.log(Field)
        return Field
    }
})(RegistrationForm);

export default simpleActions