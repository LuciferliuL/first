import React, { Component } from 'react';
import { Row, Col, Card, Button, Spin, notification, Carousel, Select } from 'antd'
import Cascaders from './Cascader/Cascaders'
import DataPick from '../Math/DataPick'
import { getTimeFetch, Time, filtArr } from '../Math/Math'
import './PV.css'
import { GetPV } from '../Math/APIconfig';
import Barcharts from './charts/Barcharts'
import TableServer from './TableServer/TableServer'
const Option = Select.Option
const ButtonGroup = Button.Group
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
        text=text.substring(0,text.length-1)
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
    title: 'timetaken/s',
    width: 120,
    render: (text) => {
        let s = text / 1000
        return (
            <span style={{ color: 'red' }}>{s}</span>
        )
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
class TimeComponent extends Component {
    constructor(props) {
        super(props)
        this.count = 0
        this.btn = 0
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
            Start: Time(),
            End: Time(),
            tableTatol: '详细表格',
            TimesStart: Time(),
            TimesEnd: Time()
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
        if (this.btn === 0) {
            if (this.state.URLData.value === null) {
                notification.warning({
                    message: '警告',
                    description: '请求选择一个服务器',
                })
            } else {
                this.setState({
                    loading: true
                })
                // console.log(this.state.URLData)
                let URL = this.state.URLData
                let start = this.state.TimesStart
                let end = this.state.TimesEnd
                getTimeFetch(GetPV(URL.value, URL.controller, URL.name, start, end).GetInterval, (res) => {
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

                        Result.map((v, index) => {
                            Result[index] = JSON.parse(v)
                            return true
                        })
                        // console.log(Result)
                        let buckets = filtArr(Result)
                        // console.log(buckets)
                        // console.log(extMessage)
                        this.setState({
                            Data: buckets,
                            SQLmessage: res.ExtMessage,
                            loading: false,
                            disableds: false,
                            chartsTatol: `详细图表:${this.state.TimesStart}---${this.state.TimesEnd}`
                        })
                    }
                })
            }
        } else if (this.btn === 1) {
            this.handlePre()
            if (this.state.URLData.value === null) {
                notification.warning({
                    message: '警告',
                    description: '请求选择一个服务器',
                })
            } else {
                this.setState({
                    loading: true
                })
                // console.log(this.state.URLData)
                let URL = this.state.URLData
                let start = this.state.TimesStart
                let end = this.state.TimesEnd
                getTimeFetch(GetPV(URL.value, URL.controller, URL.name, start, end).GetInterval, (res) => {
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

                        Result.map((v, index) => {
                            Result[index] = JSON.parse(v)
                            return true
                        })
                        // console.log(Result)
                        let buckets = filtArr(Result)
                        // console.log(buckets)
                        // console.log(extMessage)
                        this.setState({
                            Data: buckets,
                            SQLmessage: res.ExtMessage,
                            loading: false,
                            disableds: false,
                            chartsTatol: `详细图表:${this.state.TimesStart}---${this.state.TimesEnd}`
                        })
                    }
                })
            }
        }

    }
    //获取选择框的数组
    handleChangeState = (value) => {
        // console.log(value)
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
            },
            Start: DateStrings[0],
            End: DateStrings[1],
            TimesStart: DateStrings[0],
            TimesEnd: DateStrings[1]
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
        let nextTableURL = this.state.TableURL
        if (nextTableValue.length < 1 && nextTableURL.length === 1) {
            notification.warning({
                message: '警告',
                description: '请点击一个柱状，以确保显示其具体内容',
            })
        } else if (nextTableValue.length < 1 && (nextTableURL.length === 3 || nextTableURL.length === 2)) {
            notification.warning({
                message: '警告',
                description: '请重新点击一个柱状，上一个没有数据',
            })
        } else {
            this.count = 1
            const CarouselRef = this.refs.CarouselRef
            CarouselRef.next()
        }
    }
    //上一个图
    handlePre = () => {
        this.count = 0
        const CarouselRef = this.refs.CarouselRef
        const pager = { ...this.state.pagination };
        pager.current = 1;
        this.setState({
            pagination: pager,
        });
        CarouselRef.prev()
    }
    //获取图标的点击 并发送请求渲染表格
    getBarChartsName = (v) => {
        //判断是不是今天
        let date = this.state.URLData
        let startDate = this.state.Start
        let endDate = this.state.End
        if (startDate === endDate) {
            //是今天  就是小时
            if (v > 10) {
                console.log(1)
                startDate = String(startDate) + 'T' + (v - 1) + ':00:00'
                endDate = String(endDate) + 'T' + v + ':00:00'
            }
            else if (v === 10) {
                console.log(2)
                startDate = String(startDate) + 'T' + '0' + (v - 1) + ':00:00'
                endDate = String(endDate) + 'T' + v + ':00:00'
            }
            else if (v < 10) {
                console.log(3)
                startDate = String(startDate) + 'T' + '0' + (v - 1) + ':00:00'
                endDate = String(endDate) + 'T' + '0' + v + ':00:00'
            }
            console.log(startDate + '--' + endDate)
        } else {
            //不是今天 按日期算
            let timeV = v - 1//1就是startDate 所以减一
            //分解起始日期
            let timearr = startDate.split('/')
            let Numtime = Number(timearr[2]) + timeV
            Numtime > 9 ?
                timearr[2] = String(Numtime) :
                timearr[2] = '0' + String(Numtime)
            startDate = `${timearr[0]}/${timearr[1]}/${timearr[2]}`
            endDate = `${timearr[0]}/${timearr[1]}/${timearr[2]}`
        }
        // console.log(date)
        this.setState({
            URLData: {
                value: date.value,
                controller: date.controller,
                name: date.name,
                startDate: startDate,
                endDate: endDate,
                KeyName: date.KeyName
            },
            // TableURL: date
        })
        if (this.state.URLData.value !== ' ') {
            this.fetch({ offset: 1, limit: 100 }, this.state.URLData);
        }

    }
    //渲染表格
    fetch = (params = {}, URLData) => {
        // console.log(URLData)
        // console.log('params:', params);
        this.setState({ loading: true });
        getTimeFetch(GetPV(URLData.value, URLData.controller, URLData.name, URLData.startDate, URLData.endDate, params.offset, params.limit, URLData.KeyName).GetPVparticular, (data) => {
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
                const pagination = { ...this.state.pagination };
                pagination.total = total;
                pagination.pageSize = 100
                this.setState({
                    loading: false,
                    data: paramdata.hits.hits,
                    pagination,
                    SQLmessage: data.ExtMessage,
                    tableTatol: this.state.TableURL[this.state.TableURL.length - 1] + '详细表格数据' + URLData.startDate + '至' + URLData.endDate
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
    render() {
        const { Data, URLData, pagination, loading, data, tableTatol } = this.state
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
            ></TableServer>)
        }
        return (
            <div>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    <Row gutter={2}>
                        <Card>
                            <Row gutter={3}>
                                <Col span={8}>
                                    <Cascaders handleChangeState={this.handleChangeState} API={API}></Cascaders>
                                </Col>
                                <Col span={6}>
                                    <DataPick handleChangeDate={this.handleChangeDate}></DataPick>
                                </Col>
                                <Col span={3} className='btnGroup'>

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
                                extra={<Button onClick={this.handlePre}>切换详细图表</Button>}
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

export default TimeComponent;