import React, { Component } from 'react';
import { Row, Col, Card, Button, Spin, notification, Carousel, Select, Icon } from 'antd'
import Cascaders from './Cascader/Cascaders'
import DataPick from '../Math/DataPick'
import { getTimeFetch, Time } from '../Math/Math'
import './PV.css'
import { GetPV } from '../Math/APIconfig';
import Barcharts from './charts/Barcharts'
import TableServer from './TableServer/TableServer'
import downloadExl from '../Math/xlsx'
const ButtonGroup = Button.Group
const { Option } = Select
const columns = [{
    dataIndex: '_source.clientip',
    title: 'clientip',
    key: '_id',
    width: 120
}, {
    dataIndex: '_source.iislogdate',
    title: 'iislogdate',
    width: 200,
    render: (text) => {
        text = text.substring(0, text.length - 1)
        let time = new Date(text)//自动加8小时
        time.setTime(time.setHours(time.getHours() + 16))
        let t = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}T${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        return (
            <span>{t}</span>
        )
    }
}, {
    dataIndex: '_source.request',
    title: 'request',
    width: 400
}, {
    dataIndex: '_source.timetaken',
    title: 'timetaken(s)',
    width: 120,
    render: (text) => {
        let texts = text / 1000
        return (<span style={{ color: 'red' }}>{texts}</span>)
    }
}, {
    dataIndex: '_source.urlparam',
    title: "urlparam"
}, {
    dataIndex: '_source.port',
    title: "port",
    width: 80
}]
const API = {
    ID: 'Time',
    first: 'GetOrgList',
    secend: 'GetOrgListServer',
    third: 'GetControllerList'
}
class PVComponent extends Component {
    constructor(props) {
        super(props)
        this.count = 0//控制是否跳转到table
        this.btn = 0//控制查询返回图标 0在图表面 1在table面
        this.downData = []
        this.state = {
            URLData: {
                startDate: Time(),
                endDate: Time(),
                value: ' ',
                controller: ' ',
                name: ' ',
                KeyName: 'desc'
            },
            Data: [],//图标数据
            TableURL: [],//发送到Table的链接地址
            SQLmessage: '',
            disableds: true,
            loading: false,
            chartsTatol: "详细图表",
            pagination: {},
            data: [],
            Method: '',
            tableTatol: '详细表格',
            show:true
        }
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
    }
    componentWillMount() {
        getTimeFetch(GetPV().firstAPI, (res) => {
            console.log(res)
        })
    }
    //点击查询
    PVchecked = () => {
        this.count = 0
        if (this.btn === 0) {
            if (this.state.URLData.value === null) {
                notification.warning({
                    message: '警告',
                    description: '请选择一个服务器',
                })
            } else {
                this.setState({
                    loading: true
                })
                // console.log(this.state.URLData)
                let URL = this.state.URLData
                getTimeFetch(GetPV(URL.value, URL.controller, URL.name, URL.startDate, URL.endDate).GetPVSearch, (res) => {
                    // console.log(res)
                    if (res === 'timeout') {
                        notification.open({
                            message: '提示信息',
                            description: '请求超时',
                        })
                        this.setState({
                            loading: false
                        })
                    } else {
                        // let extMessage = JSON.parse(res.ExtMessage)
                        let Result = JSON.parse(res.Result)
                        console.log(Result)
                        // console.log(extMessage)
                        this.setState({
                            Data: Result.aggregations.pv_result.buckets,
                            SQLmessage: res.ExtMessage,
                            loading: false,
                            disableds: false,
                            chartsTatol: `详细图表:${this.state.URLData.startDate}---${this.state.URLData.endDate}`
                        })
                    }
                })
            }
        } else if (this.btn === 1) {
            const CarouselRef = this.refs.CarouselRef
            this.count = 0
            CarouselRef.prev()
            const pager = { ...this.state.pagination };
            pager.current = 1;
            if (this.state.URLData.value === null) {
                notification.warning({
                    message: '警告',
                    description: '请选择一个服务器',
                })
            } else {
                this.setState({
                    loading: true,
                    pagination: pager
                })
                // console.log(this.state.URLData)
                let URL = this.state.URLData
                getTimeFetch(GetPV(URL.value, URL.controller, URL.name, URL.startDate, URL.endDate).GetPVSearch, (res) => {
                    // console.log(res)
                    if (res === 'timeout') {
                        notification.open({
                            message: '提示信息',
                            description: '请求超时',
                        })
                        this.setState({
                            loading: false
                        })
                    } else {
                        // let extMessage = JSON.parse(res.ExtMessage)
                        let Result = JSON.parse(res.Result)
                        console.log(Result)
                        // console.log(extMessage)
                        this.setState({
                            Data: Result.aggregations.pv_result.buckets,
                            SQLmessage: res.ExtMessage,
                            loading: false,
                            disableds: false,
                            chartsTatol: `详细图表:${this.state.URLData.startDate}---${this.state.URLData.endDate}`
                        })
                    }
                })
            }
        }

    }
    //获取选择框的数组
    handleChangeState = (value) => {
        console.log(value)
        this.setState({
            URLData: {
                value: value[0],
                controller: value[1],
                name: value[2],
                startDate: this.state.URLData.startDate,
                endDate: this.state.URLData.endDate,
                KeyName: this.state.URLData.KeyName
            },
            TableURL: value//存入数组第一位为地址，二位 ， 三位
        })
    }
    //获取时间
    handleChangeDate = (DateStrings) => {
        // console.log(DateStrings)
        this.setState({
            URLData: {
                value: this.state.URLData.value,
                controller: this.state.URLData.controller,
                name: this.state.URLData.name,
                startDate: DateStrings[0],
                endDate: DateStrings[1],
                KeyName: this.state.URLData.KeyName
            }
        })
    }
    //弹出的sql语句
    SQLchecked = () => {
        notification.success({
            message: 'SQL语句',
            description: this.state.SQLmessage,
        })
    }
    onChange = (a, b, c) => {//carousel改变触发
        console.log(a, b, c);
        this.btn = a
    }
    //下一个图
    handleNext = () => {
        let nextTableValue = this.state.data
        // let nextTableURL = this.state.TableURL
        if (nextTableValue.length < 1) {
            notification.warning({
                message: '警告',
                description: '请点击一个柱状，以确保显示其具体内容',
            })
        } else {
            this.count = 1
            const CarouselRef = this.refs.CarouselRef
            CarouselRef.next()
            this.setState({
                show:false
            })
        }
    }
    //上一个图
    handlePre = () => {
        const CarouselRef = this.refs.CarouselRef
        const pager = { ...this.state.pagination };
        pager.current = 1;
        let TableURL = this.state.TableURL
        TableURL.pop()
        this.setState({
            pagination: pager,
            TableURL: TableURL,
            show:true
        });
        this.count = 0
        CarouselRef.prev()
    }
    //获取图标的点击 并发送请求渲染表格
    getBarChartsName = (v) => {
        console.log(v)
        let TableURL = this.state.TableURL//数组长度决定了选择了几个
        TableURL.push(v)
        this.setState({
            URLData: {
                value: TableURL[0],
                controller: TableURL[1],
                name: TableURL[2],
                startDate: this.state.URLData.startDate,
                endDate: this.state.URLData.endDate,
                KeyName: this.state.URLData.KeyName
            },
            Method: TableURL[3],
            TableURL: TableURL
        })
        if (this.state.URLData.value !== ' ') {
            this.fetch({ offset: 1, limit: 100 }, this.state.URLData, this.state.Method);
        }

    }
    //渲染表格
    fetch = (params = {}, URLData, Method = '') => {
        // console.log(URLData)
        // console.log('params:', params);
        this.setState({ loading: true });
        getTimeFetch(GetPV(URLData.value, URLData.controller, URLData.name, URLData.startDate, URLData.endDate, params.offset, params.limit, URLData.KeyName, '', '', Method).GetPVparticular, (data) => {
            let paramdata = JSON.parse(data.Result)
            console.log(paramdata)
            if (paramdata === null) {
                notification.warning({
                    message: '警告',
                    description: '请重新选择排序方式查看数据。',
                })
                this.setState({
                    loading: false
                })
            } else {
                let total = paramdata.hits.total//数据量
                this.downData = paramdata.hits.hits
                const pagination = { ...this.state.pagination };
                pagination.total = total;
                pagination.pageSize = 100
                this.setState({
                    loading: false,
                    data: paramdata.hits.hits,
                    pagination,
                    SQLmessage: data.ExtMessage,
                    tableTatol: this.state.TableURL[this.state.TableURL.length - 1] + '详细表格'
                }, () => {
                    //count为1  进入表格 为0 进入图表  所以为0跳转
                    if (this.count === 0) { this.handleNext() }
                });
            }
        })
    }
    //分页的回调
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination)
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            limit: 100,
            offset: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        }, this.state.URLData);
    }
    desc = (value) => {
        if (value === '1') {
            this.setState({
                URLData: {
                    value: this.state.URLData.value,
                    controller: this.state.URLData.controller,
                    name: this.state.URLData.name,
                    startDate: this.state.URLData.startDate,
                    endDate: this.state.URLData.endDate,
                    KeyName: 'asc'
                }
            })
        } else {
            this.setState({
                URLData: {
                    value: this.state.URLData.value,
                    controller: this.state.URLData.controller,
                    name: this.state.URLData.name,
                    startDate: this.state.URLData.startDate,
                    endDate: this.state.URLData.endDate,
                    KeyName: 'desc'
                }
            })
        }
    }
    downloadExl = () => {
        if (this.downData.length < 1) {
            notification.error({
                message:'提示',
                description:'请先选择表格数据'
            })
        } else {
            let Exlarr = []
            this.downData.forEach(element => {
                let Exl = {
                    clientip:element._source.clientip,
                    iislogdate:element._source.iislogdate,
                    request:element._source.request,
                    timetaken:(element._source.timetaken/1000),
                    urlparam:element._source.urlparam,
                    port:element._source.port
                }
                Exlarr.push(Exl)
            });
            // console.log(Exlarr)
            downloadExl(Exlarr)
        }
    }
    showhide = () => {
        this.setState({
            show: true
        })
        this.handlePre()
    }
    render() {
        const { Data, URLData, pagination, loading, data, tableTatol, show } = this.state
        const charts = []
        const table = []
        // console.log(Data)
        if (Data.length === 0) {
            charts.push(<p key='charts1'>暂时没有数据，请选择另一个节点</p>)
            table.push(<p key='table1'>暂时没有数据，请选择另一个节点</p>)
        } else {
            charts.push(<Barcharts Data={Data} key='charts2' getBarChartsName={this.getBarChartsName}></Barcharts>)
            table.push(<TableServer
                columns={columns}
                key='table2'
                URLData={URLData}
                loading={loading}
                pagination={pagination}
                data={data}
                handleTableChange={this.handleTableChange}
                scroll={{ x: 1200, y: 500 }}
            ></TableServer>)
        }
        return (
            <div>
                <Button onClick={this.showhide.bind(this)} style={{ display: show ? 'none' : 'block', right: '50%', position: 'fixed', top:'0px', transform:'transionx(-50%)' }} type='primary'>
                显示查询栏
                <Icon type="down-square-o" />
                </Button>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    <Row gutter={2}>
                        <Card style={{ display: !show ? 'none' : 'block' }}>
                            <Row gutter={3}>
                                <Col span={8}>
                                    <Cascaders handleChangeState={this.handleChangeState} API={API}></Cascaders>
                                </Col>
                                <Col span={6}>
                                    <DataPick handleChangeDate={this.handleChangeDate}></DataPick>
                                </Col>
                                <Col span={3} className="btnGroup">

                                </Col>
                                <Col span={3} className='btnGroup'>
                                    <ButtonGroup >
                                        <Button onClick={this.PVchecked}>查询</Button>
                                        <Button onClick={this.SQLchecked} disabled={this.state.disableds}>查看SQL</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                        </Card>
                        {/* 走马灯 */}
                        <Carousel afterChange={this.onChange} dots={false} ref="CarouselRef">
                            <Card title={this.state.chartsTatol} className='MarginTop'
                                extra={
                                    <div>
                                        <Select defaultValue="2" onChange={this.desc}>
                                            <Option value="1">升序排列</Option>
                                            <Option value="2">降序排列</Option>
                                        </Select>
                                        <Button onClick={this.handleNext}>切换详细表格</Button>
                                    </div>
                                }
                            >
                                {charts}
                            </Card>
                            <Card title={tableTatol} className='MarginTop'
                                extra={
                                    <ButtonGroup>
                                        <Button onClick={this.handlePre}>切换详细图表</Button>
                                        <Button onClick={this.downloadExl}>下载表格</Button>
                                        <a href="" download='PVExl.xlsx' id='hf'></a>
                                    </ButtonGroup>}
                            >
                                {table}
                            </Card>
                        </Carousel>
                        {/* <Col span={10}>
                            <Card title={this.state.chartsTatol} className='MarginTop'>
                                {charts}
                            </Card>
                        </Col>
                        <Col span={14}>
                            <Card title="详细表格" className='MarginTop'>
                                {table}
                            </Card>
                        </Col> */}
                    </Row>
                </Spin>
            </div>
        );
    }
}

export default PVComponent;