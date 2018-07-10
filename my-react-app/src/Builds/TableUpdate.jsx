import React, { Component } from 'react';
import Tables from './ComponentP/TableUpdateT'
import { table, APIconfig } from './ComponentP/AsyncAPI'
import moment from 'moment'
import { getTime, getTimeFetch, postFetch } from '../Math/Math'
import { Collapse, notification, Card, Select, Input, Form, DatePicker, Row, Col, Button, Popover, Tag } from 'antd'
import TableUpdateAction from './ComponentP/TableUpdateAction'
const Panel = Collapse.Panel
const { Option } = Select
const ButtonGroup = Button.Group
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY/MM/DD';
class TimeRelatedForm extends Component {
    constructor(props) {
        super(props)
        this.PKlist = []
        this.clear = {}
        this.state = {
            //表格数据
            Data: [],
            //表格列
            columns: [{
                title: '作者',
                dataIndex: 'AUTHOR',
                key: 'PK',
            }, {
                title: 'BUGID',
                dataIndex: 'BUGID',
            }, {
                title: 'REMARK',
                dataIndex: 'REMARK',
                render: (text) => {
                    return (
                        <Popover content={text}>
                            <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                        </Popover>
                    )
                }
            }, {
                title: 'SQLSCRIPE',
                dataIndex: 'SQLSCRIPE',
                render: (text) => {
                    return (
                        <Popover content={text}>
                            <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                        </Popover>
                    )
                }
            }, {
                title: '标题',
                dataIndex: 'TITLE',
                render: (text) => {
                    return (
                        <Popover content={text}>
                            <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                        </Popover>
                    )
                }
            }, {
                title: 'NOTE',
                dataIndex: 'NOTE',
                render: (text) => {
                    return (
                        <Popover content={text}>
                            <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                        </Popover>
                    )
                }
            }, {
                title: 'SQL类型',
                dataIndex: 'SQLTYPE',
                render: (text) => {
                    return (
                        text === 0 ? <p>新增表</p> :
                            text === 1 ? <p>修改表</p> :
                                text === 2 ? <p>创建视图</p> : <p>过程函数脚本</p>
                    )
                }
            }, {
                title: 'BugTYPE',
                dataIndex: 'BugTYPE',
                render: (text) => {
                    return (
                        text === 0 ? <p>需求</p> : <p>BUG</p>
                    )
                }
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
                SQLTYPE: -1,
                STATE: 1,
                TITLE: "",
                Tag: null,
                Version: 3,
                WorkFlowGuid: "",
                WorkFlowState: "",
            },
            show: false
        }
    }
    componentWillMount() {

    }
    //初始加载数据
    componentDidMount() {
        let values = this.props.match.params.id
        console.log(values)
        // if (values === undefined) {
        //   this.props.history.push('/')
        // }
        if (values === 'xxx') {
            this.setState({
                columns: [{
                    title: '作者',
                    dataIndex: 'AUTHOR',
                    key: 'PK',
                }, {
                    title: 'BUGID',
                    dataIndex: 'BUGID',
                }, {
                    title: 'REMARK',
                    dataIndex: 'REMARK',
                    render: (text) => {
                        return (
                            <Popover content={text}>
                                <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                            </Popover>
                        )
                    }
                }, {
                    title: 'SQLSCRIPE',
                    dataIndex: 'SQLSCRIPE',
                    render: (text) => {
                        return (
                            <Popover content={text}>
                                <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                            </Popover>
                        )
                    }
                }, {
                    title: '标题',
                    dataIndex: 'TITLE',
                    render: (text) => {
                        return (
                            <Popover content={text}>
                                <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                            </Popover>
                        )
                    }
                }, {
                    title: 'NOTE',
                    dataIndex: 'NOTE',
                    render: (text) => {
                        return (
                            <Popover content={text}>
                                <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                            </Popover>
                        )
                    }
                }, {
                    title: 'SQL类型',
                    dataIndex: 'SQLTYPE',
                    render: (text) => {
                        return (
                            text === 0 ? <p>新增表</p> :
                                text === 1 ? <p>修改表</p> :
                                    text === 2 ? <p>创建视图</p> : <p>过程函数脚本</p>
                        )
                    }
                }, {
                    title: 'BugTYPE',
                    dataIndex: 'BugTYPE',
                    render: (text) => {
                        return (
                            text === 0 ? <p>需求</p> : <p>BUG</p>
                        )
                    }
                }, {
                    title: '是否发布',
                    dataIndex: 'ISPUBLIC',
                    render: (text) => {
                        return (
                            text === 1 ? <p>发布</p> : <p>未发布</p>
                        )
                    }
                }, {
                    title: '下载',
                    dataIndex: 'PATH',
                    render: (text) => {
                        // console.log(text)
                        let API = JSON.stringify(APIconfig.Server).replace(/\"/g, '')
                        return (
                            <a href={API + '/' + text} download>下载</a>
                        )
                    }
                }],
                show: true
            })
        }
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
    TableEmitData = (PK) => {
        console.log(PK)
        getTimeFetch(table(PK).click, (res) => {
            console.log(res)
            this.setState({
                TableValue: JSON.parse(JSON.stringify(res)),
                disabled: true
            })
        })
    }
    //批量下载监听选中PK
    downPK = (PKlist) => {
        this.PKlist = PKlist
    }
    //批量发布
    ext = () => {
        console.log(this.PKlist)
        postFetch(table().execute, this.PKlist, (res) => {
            if (res.IsSuccess === 'True') {
                notification.success({
                    message: '提示',
                    description: '批量发布成功'
                })
            } else {
                notification.warning({
                    message: '提示',
                    description: res.ErrMessage
                })
            }
        })
    }
    //批量下载
    download = () => {
        console.log('download')
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
                // console.log(values)
                const rangeValue = values['rangepicker']
                let BUGID = ' '
                if (values['BugIDList']) {
                    BUGID = values['BugIDList'].split(',')
                }
                const value = {
                    'State': values['State'],
                    'SQLTYPE': values['SQLTYPE'],
                    'BugType': values['BugType'],
                    'BugIDList': BUGID,
                    'Author': 'xxx',
                    'StarTime': rangeValue[0].format('YYYY-MM-DD'),
                    'EndTime': rangeValue[1].format('YYYY-MM-DD')
                }
                // console.log('Received values of form: ', value);

                postFetch(table().postCheck, value, (res) => {
                    // console.log(res)
                    if (res.length === 0) {
                        notification.warning({
                            message: '提示',
                            description: '没有数据，请重新选择查询条件'
                        })
                    }
                    this.setState({
                        Data: res
                    })
                })
            }
        });
    }
    disabledDate = (current) => {//禁止选择的时间
        return current > moment().endOf('day');
    }

    ActiveKey = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values)
                const rangeValue = values['rangepicker']
                let BUGID = ' '
                if (values['BugIDList']) {
                    BUGID = values['BugIDList'].split(',')
                }
                const value = {
                    'State': values['State'],
                    'SQLTYPE': values['SQLTYPE'],
                    'BugType': values['BugType'],
                    'BugIDList': BUGID,
                    'Author': 'xxx',
                    'StarTime': rangeValue[0].format('YYYY-MM-DD'),
                    'EndTime': rangeValue[1].format('YYYY-MM-DD')
                }
                // console.log('Received values of form: ', value);

                postFetch(table().postCheck, value, (res) => {
                    this.clear = JSON.parse(JSON.stringify(this.state.clearObj))
                    // console.log(res)
                    this.setState({
                        Data: res,
                        ActiveKey: ['1'],
                        disabled: true,
                        TableValue: this.clear,
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
                                    {getFieldDecorator('State', {
                                        initialValue: '0',
                                    })(
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
                                    {getFieldDecorator('SQLTYPE', {
                                        initialValue: '-1',
                                    })(
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
                                    {getFieldDecorator('BugType', {
                                        initialValue: '0',
                                    })(
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
                                        rules: [{ type: 'array', required: true, message: 'Please select time!' }], initialValue: [moment(getTime(), dateFormat), moment(getTime(), dateFormat)]
                                    })(
                                        <RangePicker
                                            format={dateFormat}
                                            disabledDate={this.disabledDate}
                                            onChange={this.DatePicker}

                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="BugIDList"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BugIDList')(
                                        <Input autoComplete="off" />
                                    )}

                                </FormItem>
                            </Col>
                        </Row>
                        <ButtonGroup>
                            <Button htmlType="submit" type='primary'>查询</Button>
                            <Button htmlType='button' onClick={this.AddAction.bind(this, 'Add')}>新增</Button>
                            <Button htmlType='button' onClick={this.AddAction.bind(this, 'Edit')}>修改</Button>
                            <Button htmlType='button' type='danger' onClick={this.AddAction.bind(this, 'Delete')}>删除</Button>
                            <Button htmlType='button' type='primary' style={{ display: this.state.show ? 'inline-block' : 'none' }} onClick={this.ext.bind(this)}>发布</Button>
                            <Button htmlType='button' type='primary' style={{ display: this.state.show ? 'inline-block' : 'none' }} onClick={this.download.bind(this)}>批量下载</Button>
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
                            downPK={this.downPK.bind(this)}
                            Data={Data}
                            columns={columns}
                            TableEmitData={this.TableEmitData.bind(this)}
                            clearTable={clearTable}
                            type={'checkbox'}
                        ></Tables>
                    </Panel>
                    <Panel key='2' showArrow={true} header='详细信息'>
                        <TableUpdateAction
                            clear={this.clear}
                            TableValue={TableValue}
                            disabled={disabled}
                            ActiveKey={this.ActiveKey}
                        ></TableUpdateAction>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

const TableUpdate = Form.create()(TimeRelatedForm);
export default TableUpdate;

