import React, { Component } from 'react';
import { Form, Input, Select, Col, Button, Row, Switch } from 'antd'
import SimpleBtn from './SimpleBtn'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;
const InputGroup = Input.Group
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const Widths = { width: 100 + '%' }

class SimpleFlag extends Component {
    state = {
        IsPaging: true,
        IsUseCacheServer: true,
        QueryExtendstate: {},
        DQuerySql: {}
    }
    componentWillMount() {
        const { QueryExtend } = this.props
        let QueryExtends = JSON.parse(JSON.stringify(QueryExtend))
        // console.log(QueryExtend)
        if (QueryExtend.IsPaging !== 1) {
            this.setState({
                IsPaging: false
            })
        }
        if (QueryExtend.IsUseCacheServer !== 1) {
            this.setState({
                IsUseCacheServer: false
            })
        }
        this.setState({
            QueryExtendstate: QueryExtends,
            DQuerySql: QueryExtends.DQuerySql
        })
    }
    componentWillUnmount() {
        // console.log(this.state.QueryExtendstate)
        if (this.props.disableds) {
            return
        } else {
            this.props.handleDate(this.state.QueryExtendstate)
        }
    }
    onChange(key, value) {
        if (key === 'IsPaging' || key === 'IsUseCacheServer') {
            if (value) {
                value = 1
            } else {
                value = 0
            }
        }
        this.setState({
            QueryExtendstate: Object.assign(this.state.QueryExtendstate, { [key]: value })
        })
    }
    handleChange = (key, e) => {
        let value = e.target.value
        // this.props.handleChange(key, value, this.props.datasource)
        this.setState({
            QueryExtendstate: Object.assign(this.state.QueryExtendstate, { [key]: value })
        })
    }
    handleSql = (key, e) => {
        
        let value = e.target.value
        // console.log(key + '----' + value)
        if (key === 'SqlName') {
            this.setState({
                DQuerySql: Object.assign(this.state.DQuerySql, { [key]: value }),
                QueryExtendstate: Object.assign(this.state.QueryExtendstate, { ['DQueryName']: value })
            })
        } else {
            this.setState({
                DQuerySql: Object.assign(this.state.DQuerySql, { [key]: value })
            })
        }

    }
    handleBook = (value) => {
        // console.log(value)
        let QueryExtendstate = this.state.QueryExtendstate
        QueryExtendstate.DQueryName = value.SqlName
        QueryExtendstate.DQuerySql = value
        this.setState({
            DQuerySql: value,
            QueryExtendstate: QueryExtendstate
        })
    }
    render() {
        const { disableds, QueryExtend } = this.props
        // console.log(disableds)
        if (!disableds) {
            const { QueryExtendstate, DQuerySql } = this.state
            // console.log(QueryExtendstate)
            return (
                <div>
                    <FormItem label="页签名称" {...formItemLayout}>
                        <Input value={QueryExtendstate.DQueryCaption} disabled={disableds} onChange={this.handleChange.bind(this, 'DQueryCaption')}></Input>
                    </FormItem>
                    <FormItem label="SQL名" {...formItemLayout}>
                        <InputGroup>
                            <Row>
                                <Col span={14}>
                                    <Input value={DQuerySql.SqlName} disabled={disableds} onChange={this.handleSql.bind(this, 'SqlName')} />
                                </Col>
                                <Col span={10}>
                                    <SimpleBtn handleBook={this.handleBook.bind(this)}></SimpleBtn>
                                </Col>
                            </Row>
                        </InputGroup>
                    </FormItem>
                    <FormItem label="数据来源" {...formItemLayout}>
                        <InputGroup>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Select
                                        value={QueryExtendstate.DataSource}
                                        onChange={this.onChange.bind(this, 'DataSource')}
                                        style={Widths}
                                        disabled={disableds}>
                                        <Option value={0}>集中服务器</Option>
                                        <Option value={1}>分公司服务器</Option>
                                        <Option value={2}>SOLR</Option>
                                    </Select>
                                </Col>
                                <Col span={12}>
                                    是否分页 <Switch
                                        defaultChecked={this.state.IsPaging}
                                        onChange={this.onChange.bind(this, 'IsPaging')}
                                        checkedChildren='true'
                                        uncheckedchildren='false'
                                        disabled={disableds}
                                    />
                                    是否使用缓存服务器 <Switch
                                        defaultChecked={this.state.IsUseCacheServer}
                                        onChange={this.onChange.bind(this, 'IsUseCacheServer')}
                                        checkedChildren='true'
                                        uncheckedchildren='false'
                                        disabled={disableds}
                                    />
                                </Col>
                            </Row>
                        </InputGroup>
                    </FormItem>
                    <FormItem label="SQL内容" {...formItemLayout}>
                        <TextArea
                            rows={10}
                            disabled={disableds}
                            value={DQuerySql.SqlScripe}
                            onChange={this.handleSql.bind(this, 'SqlScripe')}></TextArea>
                    </FormItem>
                </div>
            );
        } else {
            return (
                <div>
                    <FormItem label="页签名称" {...formItemLayout}>
                        <Input value={QueryExtend.DQueryCaption} disabled={disableds}></Input>
                    </FormItem>
                    <FormItem label="SQL名" {...formItemLayout}>
                        <InputGroup>
                            <Row>
                                <Col span={14}>
                                    <Input value={QueryExtend.DQueryName} disabled={disableds} />
                                </Col>
                                <Col span={10}>
                                    <Button type='primary' disabled={disableds}>123</Button>
                                </Col>
                            </Row>
                        </InputGroup>
                    </FormItem>
                    <FormItem label="数据来源" {...formItemLayout}>
                        <InputGroup>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Select
                                        value={QueryExtend.DataSource}
                                        style={Widths}
                                        disabled={disableds}>
                                        <Option value={0}>集中服务器</Option>
                                        <Option value={1}>分公司服务器</Option>
                                        <Option value={2}>SOLR</Option>
                                    </Select>
                                </Col>
                                <Col span={12}>
                                    是否分页 <Switch
                                        defaultChecked={this.state.IsPaging}
                                        checkedChildren='true'
                                        uncheckedchildren='false'
                                        disabled={true}
                                    />
                                    是否使用缓存服务器 <Switch
                                        defaultChecked={this.state.IsUseCacheServer}
                                        checkedChildren='true'
                                        uncheckedchildren='false'
                                        disabled={true}
                                    />
                                </Col>
                            </Row>
                        </InputGroup>
                    </FormItem>
                    <FormItem label="SQL内容" {...formItemLayout}>
                        <TextArea
                            rows={10}
                            disabled={disableds}
                            value={QueryExtend.DQuerySql.SqlScripe}
                        ></TextArea>
                    </FormItem>
                </div>
            );
        }
    }
}

export default SimpleFlag;