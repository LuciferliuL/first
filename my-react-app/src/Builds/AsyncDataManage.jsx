import React, { Component } from 'react';
import Tables from './ComponentP/TableUpdateT'
import { AsyncManage, APIconfig } from './ComponentP/AsyncAPI'
import moment from 'moment'
import { getTime, getTimeFetch, postFetch } from '../Math/Math'
import { Collapse, notification, Card, Select, Input, Form, DatePicker, Row, Col, Button, Popover, Tag } from 'antd'
import AsyncTableAction from './ComponentP/AsyncTableAction_'

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
        this.path = []
        this.state = {
            //表格数据
            Data: [],
            //表格列
            columns: [{
                title: '作者',
                dataIndex: 'STAFFNAME',
                key: 'PK',
            }, {
                title: 'BUGID',
                dataIndex: 'BUGID',
            }, {
                title: 'CreateTime',
                dataIndex: 'CreateTime'
            }, {
                title: 'NOTE',
                dataIndex: 'NOTE',
            }, {
                title: 'TABLENAME',
                dataIndex: 'TABLENAME',
                render: (text) => {
                    return (
                        <Popover content={text}>
                            <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                        </Popover>
                    )
                }
            }, {
                title: 'SCRIPT',
                dataIndex: 'SCRIPT',
                render: (text) => {
                    return (
                        <Popover content={text}>
                            <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                        </Popover>
                    )
                }
            }, {
                title: 'SYNC',
                dataIndex: 'SYNC',
                render: (text) => {
                    return (
                        text === 0 ? <p>新增表</p> :
                            text === 1 ? <p>修改表</p> :
                                text === 2 ? <p>创建视图</p> : <p>过程函数脚本</p>
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
        // console.log(values)
        // if (values === undefined) {
        //   this.props.history.push('/')
        // }
        if (values === 'xxx') {
            this.setState({
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
        // if (PK !== undefined) {
        //     getTimeFetch(AsyncManage(PK).click, (res) => {
        //         console.log(res)
        //         this.setState({
        //             TableValue: JSON.parse(JSON.stringify(res)),
        //             disabled: true
        //         })
        //     })
        // }
    }
    //点击表单获取具体数据
    EmitValue = (value) => {
        console.log(value)
        this.setState({
            TableValue: JSON.parse(JSON.stringify(value)),
            disabled: true
        })
    }
    //批量下载监听选中PK
    downPK = (PKlist, path) => {
        this.PKlist = PKlist
        this.path = path
    }
    //批量归档
    ext = () => {
        console.log(this.PKlist)
        let data = {}
        data.PKlist = this.PKlist
        postFetch(AsyncManage().doItlist, data, (res) => {
            if (res.IsSuccess === 'True') {
                notification.success({
                    message: '提示',
                    description: '批量归档成功'
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
    downloads = () => {
        console.log(this.PKlist)
        // notification.warn({
        //     message: '提示',
        //     description: '该功能有问题'
        // })
        let data = {}
        data.PKlist = this.PKlist
        postFetch(AsyncManage().downloadlist, data, (res) => {
            console.log(res)
            // const a = document.createElement('a')
            // a.setAttribute('download')
            // a.setAttribute('href', APIconfig.Server + res)
            // a.click()
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
                getTimeFetch(AsyncManage(this.state.TableValue.PK).del, (res) => {
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
    //提交查询的数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values)
                const rangeValue = values['rangepicker']
                let BUGID = ''
                let arr = []
                if (values['BugIDList']) {
                    BUGID = values['BugIDList'].split(',')
                    BUGID.map((v) => {
                        arr.push(values['BugType'] + v)
                        return true
                    })
                }
                const value = {
                    'State': values['State'],
                    'SQLTYPE': '',
                    'BugIDList': BUGID,
                    'Author': 'xxx',
                    'StarTime': rangeValue[0].format('YYYY-MM-DD'),
                    'EndTime': rangeValue[1].format('YYYY-MM-DD')
                }
                console.log('Received values of form: ', value);
                //查询
                postFetch(AsyncManage().Search, value, (res) => {
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
    //点击取消以后的刷新
    ActiveKey = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values)
                const rangeValue = values['rangepicker']
                let BUGID = ''
                let arr = []
                if (values['BugIDList']) {
                    BUGID = values['BugIDList'].split(',')
                    BUGID.map((v) => {
                        arr.push(values['BugType'] + v)
                        return true
                    })
                }
                const value = {
                    'State': values['State'],
                    'SQLTYPE': '',
                    'BugIDList': BUGID,
                    'Author': 'xxx',
                    'StarTime': rangeValue[0].format('YYYY-MM-DD'),
                    'EndTime': rangeValue[1].format('YYYY-MM-DD')
                }
                console.log('Received values of form: ', value);
                // console.log('Received values of form: ', value);
                //再次查询一次
                postFetch(AsyncManage().Search, value, (res) => {
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
                                            <Option value="0">未归档</Option>
                                            <Option value="1">已归档</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem
                                    label="类型选择"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BugType', {
                                        initialValue: '',
                                    })(
                                        <Select>
                                            <Option value="bug_">BUG</Option>
                                            <Option value="xq_">需求</Option>
                                            <Option value="">全部</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="日期"
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
                            <Col span={4}>
                                <FormItem
                                    label="BugID"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('BugIDList')(
                                        <Input autoComplete="off" />
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <ButtonGroup style={{ marginLeft: '10%' }}>
                                    <Button htmlType="submit" type='primary'>查询</Button>
                                    <Button htmlType='button' type='primary' style={{ display: this.state.show ? 'inline-block' : 'none' }} onClick={this.ext.bind(this)}>归档</Button>
                                    <Button htmlType='button' type='primary' style={{ display: this.state.show ? 'inline-block' : 'none' }} onClick={this.downloads.bind(this)}>批量下载</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
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
                            EmitValue={this.EmitValue.bind(this)}
                            TableEmitData={this.TableEmitData.bind(this)}
                            clearTable={clearTable}
                            type={'checkbox'}
                        ></Tables>
                    </Panel>
                    <Panel key='2' showArrow={true} header='详细信息'>
                        <AsyncTableAction
                            clear={this.clear}
                            TableValue={TableValue}
                            disabled={disabled}
                            ActiveKey={this.ActiveKey}
                        ></AsyncTableAction>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

const AsyncDataManage = Form.create()(TimeRelatedForm);
export default AsyncDataManage;

