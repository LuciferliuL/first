import React, { Component } from 'react';
import Tables from '../Component/Tables/Tables'
import { table } from './ComponentP/AsyncAPI'
import { getTime, getTimeFetch, postFetch, postFetchForm } from '../Math/Math'
import { Collapse, notification, Card, Select, Input, Form, DatePicker, Row, Col, Button } from 'antd'
import TableUpdateAction from './ComponentP/TableUpdateAction'
const Panel = Collapse.Panel
const { Option } = Select
const ButtonGroup = Button.Group
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker;

class TimeRelatedForm extends Component {
    constructor(props) {
        super(props)
        this.clear = {}
        this.state = {
            //表格数据
            Data: [],
            //表格列
            columns: [{
                title: 'AUTHOR',
                dataIndex: 'AUTHOR',
                key: 'PK',
            }, {
                title: 'BUGID',
                dataIndex: 'BUGID',
            }, {
                title: 'REMARK',
                dataIndex: 'REMARK',
            }, {
                title: 'SQLSCRIPE',
                dataIndex: 'SQLSCRIPE',
            }, {
                title: 'TITLE',
                dataIndex: 'TITLE'
            }, {
                title: 'NOTE',
                dataIndex: 'NOTE'
            }, {
                title: 'SQLTYPE',
                dataIndex: 'SQLTYPE'
            }, {
                title: 'BugTYPE',
                dataIndex: 'BugTYPE'
            }],
            ActiveKey: ['1'],
            //表单数据
            TableValue: {},
            clearTable: false,
            disabled: true,
            clearObj: {
                AUTHOR: "",
                BILLTYPECODE: "",
                BUGID: "",
                BugTYPE: 0,
                CreateTime: "",
                DELETEFLAG: 0,
                DEVMESSAGE: null,
                DEVSTATE: 2,
                EXECUTEDATE: "",
                EXECUTEDATEDEV: "",
                EXECUTEMAN: "",
                EXECUTEMANDEV: "",
                FK: -1,
                ISPUBLIC: 1,
                LastModifyTime: "",
                NOTE: "",
                PATH: "",
                PK: -1,
                QAMESSAGE: "",
                REMARK: "",
                SQLSCRIPE: "",
                SQLTYPE: 1,
                STATE: 1,
                TITLE: "",
                Tag: null,
                Version: 3,
                WorkFlowGuid: "",
                WorkFlowState: "",
            }
        }
    }

    //初始加载数据
    componentDidMount() {
        //  
    }

    RowSelected = (e) => {
        // console.log(e)
        return {
            onClick: (e) => {
                console.log(e)
            }
        }
    }
    //激活得Collapse
    callback = (key) => {
        if (key === 1) {
            this.setState({
                ActiveKey: key === undefined ? ['2'] : ['1'],
                disabled: true
            })
        } else {
            this.setState({
                ActiveKey: key === undefined ? ['2'] : ['1'],
            })
        }

    }
    //点击表单获取得数据
    TableEmitData = (TableValue) => {
        // console.log(TableValue)
        getTimeFetch(table(TableValue.PK).click, (res) => {
            console.log(res)
            this.setState({
                TableValue: JSON.parse(JSON.stringify(res)),
                disabled: true
            })
        })
    }
    AddAction = (name) => {
        if (name === 'Add') {
            this.clear = JSON.parse(JSON.stringify(this.state.clearObj))
            this.clear.CreateTime = getTime()
            this.clear.LastModifyTime = getTime()
            this.setState({
                TableValue: this.clear,
                ActiveKey: ['2'],
                disabled: false,
            })
        } else if (name === 'Edit') {
            if (this.state.TableValue.PK === undefined) {
                notification.warning({
                    message: '错误提示',
                    description: '请选择一个节点',
                });
            } else {
                this.clear = this.state.TableValue
                this.clear.LastModifyTime = getTime()
                this.setState({
                    ActiveKey: ['2'],
                    disabled: false
                })
                return
            }
        } else {
            if (this.state.TableValue.PK === undefined) {
                notification.warning({
                    message: '错误提示',
                    description: '请选择一个节点',
                });
            } else {
                //TODO 删除
                getTimeFetch(table(this.state.TableValue.PK).del, (res) => {
                    if (res === 'True') {
                        notification.success({
                            message: '提示',
                            description: '删除成功'
                        })
                        this.GetData()
                    } else {
                        notification.warning({
                            message: '提示',
                            description: res
                        })
                    }
                })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const rangeValue = values['rangepicker']
                const BUGID = values['BugIDList'].split(',')

                const value = {
                    'State': values['State'],
                    'SQLTYPE': values['SQLTYPE'],
                    'BugType': values['BugType'],
                    'BugIDList': BUGID,
                    'Author': 'xxx',
                    'StarTime': rangeValue[0].format('YYYY-MM-DD'),
                    'EndTime': rangeValue[1].format('YYYY-MM-DD')
                }
                console.log('Received values of form: ', value);

                postFetchForm(table().postCheck, value, (res) => {
                    console.log(res)
                    this.setState({
                        Data: res
                    })
                })
            }
        });
    }
    render() {
        const { Data, columns, ActiveKey, TableValue, clearTable, disabled } = this.state
        const { getFieldDecorator } = this.props.form;
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
        return (
            <div>

                <Form onSubmit={this.handleSubmit}>
                    <Card >
                        <Row gutter={1}>
                            <Col span={3}>
                                <FormItem
                                    label="状态"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('State')(
                                        <Select>
                                            <Option value="0">未发布</Option>
                                            <Option value="1">已发布</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={3}>
                                <FormItem
                                    label="类型"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('SQLTYPE')(
                                        <Select>
                                            <Option value="-1">全部类型</Option>
                                            <Option value="0">新增表</Option>
                                            <Option value="1">修改表</Option>
                                            <Option value="2">创建视图</Option>
                                            <Option value="3">过程函数脚本</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem
                                    label="禅道状态"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BugType')(
                                        <Select>
                                            <Option value="0">需求</Option>
                                            <Option value="1">BUG</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem

                                    label="RangePicker"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('rangepicker', {
                                        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                                    })(
                                        <RangePicker onChange={this.DatePicker} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="BugIDList"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BugIDList', {
                                        rules: [{ required: true, message: 'Please select time!' }],
                                    })(
                                        <Input autoComplete="off" />
                                    )}

                                </FormItem>
                            </Col>
                        </Row>
                        <ButtonGroup>
                            <Button htmlType="submit" type='primary'>查询</Button>
                            <Button htmlType='button' >新增</Button>
                            <Button htmlType='button' >修改</Button>
                            <Button htmlType='button' type='danger'>删除</Button>
                        </ButtonGroup>
                    </Card>
                </Form>

                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    onChange={this.callback.bind(this)}
                    accordion
                    activeKey={ActiveKey}
                >
                    <Panel header='表单' key="1" showArrow={true}>
                        <Tables
                            Data={Data}
                            columns={columns}
                            TableEmitData={this.TableEmitData.bind(this)}
                            clearTable={clearTable}
                        ></Tables>
                    </Panel>
                    <Panel key='2' showArrow={true} header='详细信息'>
                        <TableUpdateAction
                            clear={this.clear}
                            TableValue={TableValue}
                            disabled={disabled}
                        ></TableUpdateAction>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

const TableUpdate = Form.create()(TimeRelatedForm);
export default TableUpdate;

