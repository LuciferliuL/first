import React, { Component } from 'react';
import { Row, Col, Card, Button, Spin, notification, Carousel, Select} from 'antd'
import Cascaders from './Cascader/Cascaders'
import DataPick from '../Math/DataPick'
import { getTimeFetch, Time } from '../Math/Math'
import './PV.css'
import { GetPV } from '../Math/APIconfig';
import Barcharts from './charts/Barcharts'
import TableServer from './TableServer/TableServer'
const Option = Select.Option
const ButtonGroup = Button.Group
const columns = [{
    dataIndex: '_source.clientip',
    title: '_source.clientip',
    key: '_id'
}, {
    dataIndex: '_source.iislogdate',
    title: 'iislogdate',
}, {
    dataIndex: '_source.request',
    title: 'request'
}, {
    dataIndex: '_source.timetaken',
    title: 'timetaken(ms)'
}, {
    dataIndex: '_source.urlparam',
    title: "urlparam"
}, {
    dataIndex: '_source.port',
    title: "port"
}]
class PV extends Component {
    constructor(props) {
        super(props)
        this.state = {
            URLData: {
                startDate: Time(),
                endDate: Time(),
                value: ' ',
                controller: ' ',
                name: ' '
            },
            Data: [],//图标数据
            TableURL: [],//发送到Table的链接地址
            SQLmessage: '',
            disableds: true,
            loading: false,
            chartsTatol: "详细图表",
            pagination: {},
            loading: false,
            data: []
        }
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
    }
    //点击查询
    PVchecked = () => {
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
            getTimeFetch(GetPV(URL.value, URL.controller, URL.name, URL.startDate, URL.endDate).GetPVSearch, (res) => {
                console.log(res)
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
    //获取选择框的数组
    handleChangeState = (value) => {
        // console.log(value)
        this.setState({
            URLData: {
                value: value[0],
                controller: value[1],
                name: value[2],
                startDate: this.state.URLData.startDate,
                endDate: this.state.URLData.endDate
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
    }
    //下一个图
    handleNext = () => {
        console.log(this.state.data)
        let nextTableValue = this.state.data
        if (nextTableValue.length < 1) {
            notification.warning({
                message: '警告',
                description: '请求点击一个图标，以确保显示其具体内容',
            })
        } else {
            const CarouselRef = this.refs.CarouselRef
            CarouselRef.next()
        }
    }
    //上一个图
    handlePre = () => {
        const CarouselRef = this.refs.CarouselRef
        CarouselRef.prev()
    }
    //获取图标的点击 并发送请求渲染表格
    getBarChartsName = (v) => {
        let TableURL = this.state.TableURL//数组长度决定了选择了几个
        if (TableURL.length > 1) {
            TableURL.pop()
        }
        TableURL.push(v)
        console.log(TableURL)
        this.setState({
            URLData: {
                value: TableURL[0],
                controller: TableURL[1],
                name: TableURL[2],
                startDate: this.state.URLData.startDate,
                endDate: this.state.URLData.endDate
            },
            TableURL: TableURL
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
        getTimeFetch(GetPV(URLData.value, URLData.controller, URLData.name, URLData.startDate, URLData.endDate, params.offset, params.limit).GetPVparticular, (data) => {
            let paramdata = JSON.parse(data.Result)
            console.log(paramdata)
            let total = paramdata.hits.total//数据量
            const pagination = { ...this.state.pagination };
            pagination.total = total;
            pagination.pageSize = 100
            this.setState({
                loading: false,
                data: paramdata.hits.hits,
                pagination,
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
        }, this.state.URLData);
    }
    render() {
        const { Data, URLData, pagination, loading, data } = this.state
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
                                    <Cascaders handleChangeState={this.handleChangeState}></Cascaders>
                                </Col>
                                <Col span={6}>
                                    <DataPick handleChangeDate={this.handleChangeDate}></DataPick>
                                </Col>
                                <Col span={3} className='btnGroup'>
                                        <Select defaultValue="Option2">
                                            <Option value="Option1">升序排列</Option>
                                            <Option value="Option2">降序排列</Option>
                                        </Select>
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
                                extra={<Button onClick={this.handleNext}>切换详细表格</Button>}
                            >
                                {charts}
                            </Card>
                            <Card title="详细表格" className='MarginTop'
                                extra={<Button onClick={this.handlePre}>切换详细图标</Button>}
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

export default PV;