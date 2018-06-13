import React, { Component } from 'react';
import { Row, Col, Card, Button, Spin, notification } from 'antd'
import Cascaders from './Cascader/Cascaders'
import DataPick from '../Math/DataPick'
import { getTimeFetch, Time } from '../Math/Math'
import './PV.css'
import { GetPV } from '../Math/APIconfig';
import PVcharts from './charts/PVcharts'
const ButtonGroup = Button.Group

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
            loading: false
        }
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
    }

    PVchecked = () => {
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
                let extMessage = JSON.parse(res.ExtMessage)
                let Result = JSON.parse(res.Result[0])
                console.log(Result)
                console.log(extMessage)
                this.setState({
                    loading: false
                })
            }
        })
    }
    handleChangeState = (value) => {
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
    render() {
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
                                        <Button>切换</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                        </Card>
                        <Col span={10}>
                            <Card title="详细表格" className='MarginTop'>
                                <PVcharts></PVcharts>
                            </Card>
                        </Col>
                        <Col span={14}>
                            <Card title="详细表格" className='MarginTop'>
                                <p>123</p>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

export default PV;