import React, { Component } from 'react';
import { Row, Col, Card, Button, Spin, notification, Select, Progress } from 'antd'
import Cascaders from './Cascader/Cascaders'
import DataPick from '../Math/DataPick'
import { getTimeFetch, Time } from '../Math/Math'
import './PV.css'
import { GetPV } from '../Math/APIconfig';
import Piecharts from './charts/Piecharts'
import TableServer from './TableServer/TableServer'
const ButtonGroup = Button.Group
const Option = Select.Option
const columns = [{
    dataIndex: '_source.clientip',
    title: 'clientip',
    key: '_id',
    width: 120
}, {
    dataIndex: '_source.iislogdate',
    title: 'iislogdate',
    width: 200
}, {
    dataIndex: '_source.request',
    title: 'request',
    width: 400
}, {
    dataIndex: '_source.timetaken',
    title: 'timetaken/s',
    width: 100,
    render: (text) => {
        let s = text / 1000
        return (
            <span>{s}</span>
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
class AverageComponent extends Component {
    constructor(props) {
        super(props)
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
            SQLmessage: '',//获取得SQL
            disableds: true,
            loading: false,
            chartsTatol: "详细图表",
            pagination: {},
            data: [],
            AvgPercent: 0,
            sTime: []
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
        if (this.state.URLData.value === null) {
            notification.warning({
                message: '警告',
                description: '请选择一个服务器',
            })
        } else {
            this.setState({
                loading: true
            })
            let URL = this.state.URLData
            const GetAverage = new Promise((resolve, reject) => {
                //获取单个平均值
                getTimeFetch(GetPV(URL.value, URL.controller, URL.name, URL.startDate, URL.endDate).GetAverage, (res) => {
                    if (res === 'timeout') {
                        reject(res)
                    } else {
                        // console.log(res)
                        let extMessage = res.ExtMessage
                        let Result = JSON.parse(res.Result)
                        // console.log(Result)
                        let AvgValue = Result.aggregations.avg_timetaken.value
                        // console.log(AvgValue)
                        let Avg = [extMessage, AvgValue]
                        //返回获取得值
                        resolve(Avg)
                    }
                })
            });
            const GetAverageChart = new Promise((resolve, reject) => {
                //饼状图得数据
                getTimeFetch(GetPV(URL.value, URL.controller, URL.name, URL.startDate, URL.endDate).GetAverageChart, (res) => {
                    console.log(res)
                    if (res === 'timeout') {
                        reject(res)
                    } else {
                        let Result = JSON.parse(res.Result)
                        let AvgArr = []
                        Result.map((v) => {
                            let a = JSON.parse(v)
                            a = a.hits.total
                            AvgArr.push(a)
                            return true
                        })
                        // console.log(AvgArr)
                        resolve(AvgArr)
                    }
                })
            });
            Promise.all([GetAverage, GetAverageChart]).then((result) => {
                // console.log(result)
                this.setState({
                    Data: result[1],
                    SQLmessage: result[0][0],
                    AvgPercent: (result[0][1] / 1000).toFixed(2),
                    loading: false,
                    disableds: false,
                    chartsTatol: `详细图表:${this.state.URLData.startDate}---${this.state.URLData.endDate}`
                })
            }).catch((error) => {
                notification.open({
                    message: '提示信息',
                    description: '请求超时' + error,
                })
                this.setState({
                    loading: false
                })
            })
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
            // TableURL: value//存入数组第一位为地址，二位 ， 三位
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
    //获取升序降序
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
    //弹出的sql语句
    SQLchecked = () => {
        notification.success({
            message: 'SQL语句',
            description: this.state.SQLmessage,
        })
    }
    //获取图标的点击 并发送请求渲染表格
    getBarChartsName = (v) => {
        let sTime = [v.data.max, v.data.min]
        this.setState({
            sTime: sTime
        }, () => {
            if (this.state.URLData.value !== ' ') {
                this.fetch({ offset: 1, limit: 100 }, this.state.URLData, this.state.sTime);
            }
        })
        // console.log(sTime)
        //判断是不是今天  
    }
    //渲染表格
    fetch = (params = {}, URLData, sTime) => {
        // console.log(URLData)
        // console.log('params:', params);
        console.log(sTime)
        this.setState({ loading: true });
        getTimeFetch(GetPV(URLData.value, URLData.controller, URLData.name, URLData.startDate, URLData.endDate, params.offset, params.limit, URLData.KeyName, sTime[1], sTime[0]).GetPieTable, (data) => {
            // console.log(data)
            let paramdata = JSON.parse(data.Result)
            let ExtMessage = data.ExtMessage
            console.log(paramdata)
            let total = paramdata.hits.total//数据量
            const pagination = { ...this.state.pagination };
            pagination.total = total;
            pagination.pageSize = 100
            this.setState({
                loading: false,
                data: paramdata.hits.hits,
                pagination,
                SQLmessage: ExtMessage
            });
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
        }, this.state.URLData, this.state.sTime);
    }

    render() {
        const { Data, URLData, pagination, loading, data } = this.state
        const table = []
        // console.log(Data)
        if (Data.length === 0) {
            table.push(<p key='table1'>暂时没有数据，请选择另一个节点</p>)
        } else {
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
                        {/* <Carousel afterChange={this.onChange} dots={false} ref="CarouselRef">
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
                            <Card title="详细表格" className='MarginTop'
                                extra={<Button onClick={this.handlePre}>切换详细图标</Button>}
                            >
                                {table}
                            </Card>
                        </Carousel> */}
                        <Col span={10}>
                            <Card title={this.state.chartsTatol} className='MarginTop'
                                extra={
                                    <div>
                                        <Select defaultValue="2" onChange={this.desc}>
                                            <Option value="1">升序排列</Option>
                                            <Option value="2">降序排列</Option>
                                        </Select>
                                    </div>
                                }>
                                <p>平均延迟：{this.state.AvgPercent} 秒</p>
                                <Progress percent={(100 - this.state.AvgPercent)} />
                                <Piecharts
                                    Data={Data}
                                    key='charts3'
                                    getBarChartsName={this.getBarChartsName}
                                ></Piecharts>
                            </Card>
                        </Col>
                        <Col span={14}>
                            <Card title="详细表格" className='MarginTop'>
                                {table}
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

export default AverageComponent;
