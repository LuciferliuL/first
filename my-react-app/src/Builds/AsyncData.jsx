import React, { Component } from 'react';
import { Card, Row, Col, Input, Button, Select, Radio, Checkbox, Tabs, Spin, notification, Popover, Tag } from 'antd'
import { getTimeFetch, postFetch } from '../Math/Math';
import { API } from './ComponentP/AsyncAPI'
import { strToArr, pq } from './ComponentP/AsyncMath'
import AsynTable from './ComponentP/AsynTable';
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const { TextArea } = Input
const ButtonGroup = Button.Group
const Option = Select.Option
const columns = [
    {
        title: 'PK',
        dataIndex: 'PK',
        key: 'PK',
        width: '12%'
    }, {
        title: 'AUTHOR',
        dataIndex: 'AUTHOR.V',
        width: '8%',
        render: (text) => {
            // console.log(text)
            if (text.F) {
                return (
                    <Popover content={text}>
                        <Tag color={'green'}>{text}</Tag>
                    </Popover>
                )
            } else {
                return (
                    <Popover content={text}>
                        <Tag>{text}</Tag>
                    </Popover>
                )
            }
        }
    }, {
        title: 'BRANCHID',
        dataIndex: 'BRANCHID.V',
        width: '8%',
        render: (text) => {
            // console.log(text)
            if (text.F) {
                return (
                    <Popover content={text}>
                        <Tag color={'green'}>{text.slice(0, 5)}</Tag>
                    </Popover>
                )
            } else {
                return (
                    <Popover content={text}>
                        <Tag>{text.slice(0, 5)}</Tag>
                    </Popover>
                )
            }
        }
    }, {
        title: 'MODULE',
        dataIndex: 'MODULE.V',
        width: '8%',
        render: (text) => {
            // console.log(text)
            if (text) {
                return (
                    <Popover content={text}>
                        <Tag color={text.F ? 'green' : ''}>{text.slice(0, 5)}</Tag>
                    </Popover>
                )
            } else {
                return (
                    <Popover content={text}>
                        <Tag>{text}</Tag>
                    </Popover>
                )
            }
        }
    }, {
        title: 'NOTE',
        dataIndex: 'NOTE.V',
        width: '8%',
        render: (text) => {
            if (text) {
                return (
                    <Popover content={text}>
                        <Tag color={text.F ? 'green' : ''}>{text.slice(0, 5)}</Tag>
                    </Popover>
                )
            } else {
                return (
                    <Popover content={text}>
                        <Tag>{text}</Tag>
                    </Popover>
                )
            }
        }
    }, {
        title: 'SQLNAME',
        dataIndex: 'SQLNAME.V',
        width: '15%',
        render: (text) => {
            // console.log(text)
            if (text.F) {
                return (
                    <Popover content={text}>
                        <Tag color={'green'}>{text.slice(0, 10)}</Tag>
                    </Popover>
                )
            } else {
                return (
                    <Popover content={text}>
                        <Tag>{text.slice(0, 10)}</Tag>
                    </Popover>
                )
            }
        }
    }, {
        title: 'SQLSCRIPE',
        dataIndex: 'SQLSCRIPE.V',
        width: '16%',
        render: (text) => {
            // console.log(text)
            if (text.F) {
                return (
                    <Popover content={text}>
                        <Tag color={'green'}>{text.slice(0, 15)}</Tag>
                    </Popover>
                )
            } else {
                return (
                    <Popover content={text}>
                        <Tag>{text.slice(0, 15)}</Tag>
                    </Popover>
                )
            }

        }
    }, {
        title: 'CREATETIME',
        dataIndex: 'CREATETIME',
        width: '10%'
    }, {
        title: 'LASTMODIFYTIME',
        dataIndex: 'LASTMODIFYTIME',
        width: '10%'
    }]

class AsyncData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Ser: [],
            Obj: [],
            data: [],
            value: 1,
            CheckboxValue: [0, 2],
            Textarea: '',
            name: '',
            selected: 1,
            BUGID: '',
            TabPanes: [],
            postdata: '',
            loading: false
        }
    }
    componentWillMount() {
        let values = this.props.location.state
        getTimeFetch(API().getlist, (res) => {
            // console.log(res)
            let Serres = JSON.parse(JSON.stringify(res))
            let Objres = JSON.parse(JSON.stringify(res))
            Serres.forEach(element => {
                element.SyncDirection = 1
            });
            Objres.forEach(element => {
                element.SyncDirection = 2
            });
            this.setState({
                data: res,
                Ser: Serres,
                Obj: Objres,
                Textarea:values
            })
        })
    }
    RadioChange = (e) => {
        // console.log(e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    CheckboxChange = (e) => {
        // console.log(e)
        this.setState({
            CheckboxValue: e
        })
    }
    selected = (e) => {
        // console.log(e)
        this.setState({
            selected: e
        })
    }
    Textarea = (e) => {
        console.log(e.target.value)
        this.setState({
            Textarea: e.target.value
        })
    }
    checked = () => {
        this.setState({
            loading: true
        })
        const { Textarea, name, BUGID, selected, value, CheckboxValue, Ser, Obj } = this.state
        let sql = strToArr(Textarea)
        // console.log(sql)
        let BugID = BUGID + selected === 1 ? 'bug_' : 'xq_'
        let syncstaffname = name
        let syncnote = ''
        let list = []
        Ser.forEach(element => {
            if (element.ID === value) {
                list.push(element)
            }
        })
        Obj.forEach(v => {
            CheckboxValue.forEach(element => {
                if (v.ID === element) {
                    list.push(v)
                }
            })
        });
        // console.log(list)
        let data = {
            syncstaffname: syncstaffname,
            BugID: BugID,
            syncnote: syncnote,
            ServerList: list
        }
        this.setState({
            postdata: data
        })
        const PromiseSQL = new Promise((resolve, reject) => {
            let TabPanes = []
            let TabPaneSQL = false //接受每一个sql搜素出来的表格
            let count = 0
            sql.forEach((el, index) => {
                data.SqlScripe = el
                postFetch(API().getdata, data, (res) => {
                    console.log(res)
                    let ori = res[0].QueryResult//接受原数据
                    let obj1 = res[1].QueryResult//接受目标数据1
                    let obj2 = res[2].QueryResult//目标数据2
                    let name1 = res[1].ServerName.slice(0, 2)
                    let name2 = res[2].ServerName.slice(0, 2)
                    let ORI = []
                    ORI = pq(ori, obj1, obj2, name1, name2)
                    // console.log(ori)
                    let rankey = Math.random()
                    let tab = 'tab' + (count + 1)
                    TabPanes.push(
                        <TabPane tab={tab} key={index}>
                            <AsynTable
                                columns={columns}
                                Data={ORI}
                                key={rankey}
                                scroll={{ x: 1500, y: 450 }}>
                            
                            </AsynTable>
                        </TabPane>)

                    // console.log(TabPanes)
                    if (count === sql.length - 1) {
                        TabPaneSQL = true
                    }
                    if (TabPaneSQL) {
                        resolve(TabPanes)
                        this.setState({
                            loading: false
                        })
                    }
                    count++
                })
            })

        })
        PromiseSQL.then(Tabpanes => {
            // console.log(Tabpanes)
            this.setState({
                TabPanes: Tabpanes
            }, () => {
                // console.log(this.state.TabPanes)
            })
        })
    }
    asyn = () => {

        if (this.state.postdata === '' || this.state.BUGID === '') {
            notification.warning({
                message: '警告',
                description: '没有数据用于同步，请先查询,BUGID为必填'
            })
        } else {
            this.setState({
                loading: true
            })
            const { Textarea, postdata } = this.state
            let sql = strToArr(Textarea)
            let count = 0
            sql.forEach(element => {
                postdata.SqlScripe = element
                postFetch(API().Sync, postdata, (res) => {
                    res.map((v, i) => {
                        if (!v.Result) {
                            notification.warning({
                                message: '提示',
                                description: '第' + (i + 1) + '条数据错误：' + v.Message
                            })
                        } else {
                            notification.success({
                                message: '提示',
                                description: '同步成功'
                            })
                        }
                        return count++
                    })
                })
            })
            if (count === sql.length - 1) {
                this.setState({
                    loading: false
                })
            }
        }
    }
    render() {
        const { data, Textarea, name, BUGID, TabPanes, loading } = this.state
        // console.log(data)
        // console.log(TabPanes)
        const Ser = [], Obj = []
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px'
        };
        data.forEach(element => {
            Ser.push(<Radio value={element.ID} style={radioStyle} key={element.ID}>{element.ServerName}</Radio>)
            Obj.push({ label: element.ServerName, value: element.ID })
        })

        return (
            <div>
                <Row gutter={1}>
                    <Spin spinning={loading}>
                        <Col span={24}>
                            <Card
                                bodyStyle={{padding:'10px'}}
                                actions={[
                                    <ButtonGroup>
                                        <Button onClick={this.checked}>查询</Button>
                                        <Button onClick={this.asyn}>同步</Button>
                                    </ButtonGroup>,
                                    <Input addonBefore='修改人:' value={name}></Input>,
                                    <Select defaultValue='1' onChange={this.selected}>
                                        <Option value='1'>BUG</Option>
                                        <Option value='2'>需求</Option>
                                    </Select>,
                                    <Input addonBefore='BUGID:' value={BUGID}></Input>
                                ]}>
                                <TextArea placeholder='例:&#13;&#10;select * from XXX&#13;&#10;select * from XXX'
                                    autoComplete="off"
                                    style={{ resize: 'none' }}
                                    cols='15'
                                    rows='5'
                                    value={Textarea}
                                    onChange={this.Textarea}></TextArea>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card title="来源服务器环境列表">
                                <RadioGroup value={this.state.value} onChange={this.RadioChange}>{Ser}</RadioGroup>
                            </Card>
                            <Card title='目标服务器环境列表'>
                                <CheckboxGroup
                                    value={this.state.CheckboxValue}
                                    onChange={this.CheckboxChange}
                                    options={Obj}
                                    style={{ width: '62%' }}></CheckboxGroup>
                            </Card>
                        </Col>
                        <Col span={20}>
                            <Tabs defaultActiveKey="0">
                                {TabPanes}
                            </Tabs>
                        </Col>
                    </Spin>
                </Row>
            </div>
        );
    }
}

export default AsyncData;