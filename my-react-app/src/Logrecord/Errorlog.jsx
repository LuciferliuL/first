import React, { Component } from 'react';
import { Row, Col, Card, Spin, notification, Input } from 'antd'
import CascaderError from './Cascader/CascaderError'
import DataPick from '../Math/DataPick'
import { getTimeFetch, Time, postFetch } from '../Math/Math'
import './PV.css'
import { ErrorLog } from '../Math/APIconfig';
import TableServer from './TableServer/TableServer'
import RenderModal from './Modal/RenderModal'
const Search = Input.Search
const API = {
    first: 'GetComList',
    secend: 'GetComServer',
    third: 'GetComServiceName'
}
class Errorlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            URLData: {
                startDate: Time('-'),
                endDate: Time('-'),
                serverIp: ' ',
                controllerName: ' ',
                port: ' '
            },
            Data: [],//图标数据
            TableURL: [],//发送到Table的链接地址
            SQLmessage: '',
            disableds: true,
            loading: false,
            pagination: {},
            data: []
        }
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
        this.columns = [{
            dataIndex: '_source.Timestamp',
            title: 'Timestamp',
            key: '_id',
            width: 100
        }, {
            dataIndex: '_source.Origin.ServiceName',
            title: 'ServiceName',
            width: 150
        }, {
            dataIndex: '_source.Origin.CallingApplication',
            title: 'CallingApplication',
            width: 300
        }, {
            dataIndex: '_source.Origin.Application',
            title: 'Application',
            width: 100
        }, {
            dataIndex: '_source.Origin.Component',
            title: "Details",
            width: 150
        }, {
            dataIndex: '_source.Customer.UserId',
            title: "UserId",
            width: 80
        }, {
            dataIndex: '_source.Customer.CustomerCode',
            title: "Code",
            width: 80
        }, {
            dataIndex: '_source.Details',
            title: "action",
            width: 80,
            render: (text, value) => {
                let Message = text.Message
                let StackTrace = text.StackTrace
                let Timestamp = value._source.Timestamp
                let UserId = value._source.Customer.UserId
                let arr = [Message, StackTrace, Timestamp, UserId]
                return (<RenderModal arr={arr}></RenderModal>)

            }
        }]

    }
    componentWillMount() {
        getTimeFetch(ErrorLog().firstAPI, (res) => {
            console.log(res)
        })
    }
    //点击查询
    PVchecked = (value) => {
        //value就是USERID得值
        if (this.state.URLData.serverIp === ' ') {
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
            URL.Userid = value
            this.fetch({ offset: 1, limit: 100 }, URL)
        }
    }
    //获取选择框的数组
    handleChangeState = (value) => {
        console.log(value)
        this.setState({
            URLData: {
                serverIp: value[0],
                controllerName: value[2],
                port: value[1],
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
                port: this.state.URLData.port,
                controllerName: this.state.URLData.controllerName,
                serverIp: this.state.URLData.serverIp,
                startDate: DateStrings[0],
                endDate: DateStrings[1],
            }
        })
    }
    //渲染表格
    fetch = (params = {}, URLData) => {
        // console.log(URLData)
        // console.log('params:', params);
        let FormData = { ...URLData, ...params }
        // console.log(JSON.stringify(FormData))
        this.setState({ loading: true });
        postFetch(ErrorLog().GetError, FormData, (data) => {
            // console.log(data)
            let paramdata = JSON.parse(data.Result)
            console.log(paramdata)
            let total = paramdata.hits.total//数据量
            const pagination = { ...this.state.pagination };
            pagination.total = total;
            pagination.pageSize = 100
            let datas = paramdata.hits.hits
            datas.forEach(element => {
                let arr = element._source.Timestamp.split('.')
                element._source.Timestamp = arr[0]
            });
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
        const { URLData, pagination, loading, data } = this.state
        // console.log(Data)
        return (
            <div>
                <Spin tip="Loading..." spinning={this.state.loading}>
                    <Row gutter={2}>
                        <Card>
                            <Row gutter={3}>
                                <Col span={8}>
                                    <CascaderError handleChangeState={this.handleChangeState} API={API}></CascaderError>
                                </Col>
                                <Col span={8}>
                                    <DataPick handleChangeDate={this.handleChangeDate}></DataPick>
                                </Col>
                                <Col span={8} className="btnGroup">
                                    <Search
                                        placeholder='请输入USERID'
                                        enterButton='查询'
                                        onSearch={this.PVchecked}
                                    ></Search>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="详细表格" className='MarginTop'>
                            <TableServer
                                columns={this.columns}
                                key='table2'
                                URLData={URLData}
                                loading={loading}
                                pagination={pagination}
                                data={data}
                                handleTableChange={this.handleTableChange}
                            ></TableServer>
                        </Card>
                    </Row>
                </Spin>
            </div>
        );
    }
}

export default Errorlog;