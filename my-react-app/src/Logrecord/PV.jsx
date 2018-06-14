import React, { Component } from 'react';
import { Row, Col, Card, Button, Spin, notification } from 'antd'
import Cascaders from './Cascader/Cascaders'
import DataPick from '../Math/DataPick'
import { getTimeFetch, Time } from '../Math/Math'
import './PV.css'
import { GetPV } from '../Math/APIconfig';
import Barcharts from './charts/Barcharts'
import TableServer from './TableServer/TableServer'
const ButtonGroup = Button.Group
const columns = [{
    dataIndex: '_id',
    title: '_id',
    key: '_id'
}, {
    dataIndex: 'iislogdate',
    title: 'iislogdate',
    formatter: function (value, row, index) {
        var date = new Date(value);
        date.setHours(date.getHours() + 8);
        console.log(date)
        // console.log(value)
        return date;
    }
}, {
    dataIndex: 'request',
    title: 'request'
}, {
    dataIndex: 'timetaken',
    title: 'timetaken(ms)'
}, {
    dataIndex: 'urlparam',
    title: "urlparam"
}, {
    dataIndex: 'port',
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
            Data: [],
            SQLmessage: '',
            disableds: true,
            loading: false,
            chartsTatol: "详细图表"
        }
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
    }

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
    handleChangeState = (value) => {
        // console.log(value)
        this.setState({
            URLData: {
                value: value[0],
                controller: value[1],
                name: value[2],
                startDate: this.state.URLData.startDate,
                endDate: this.state.URLData.endDate
            }
        })
    }
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
    SQLchecked = () => {
        notification.success({
            message: 'SQL语句',
            description: this.state.SQLmessage,
        })
    }
    render() {
        const { Data } = this.state
        const charts = []
        const table = []
        // console.log(Data)
        if (Data.length === 0) {
            charts.push(<p key='charts1'>暂时没有数据，请选择另一个节点</p>)
            table.push(<p key='table1'>暂时没有数据，请选择另一个节点</p>)
        } else {
            charts.push(<Barcharts Data={Data} key='charts2'></Barcharts>)
            table.push(<TableServer columns={columns} key='table2'></TableServer>)
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
                                <Col span={6} className='btnGroup'>
                                    <ButtonGroup >
                                        <Button onClick={this.PVchecked}>查询</Button>
                                        <Button onClick={this.SQLchecked} disabled={this.state.disableds}>查看SQL</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                        </Card>
                        <Col span={10}>
                            <Card title={this.state.chartsTatol} className='MarginTop'>
                                {charts}
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

export default PV;