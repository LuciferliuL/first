import React, { Component } from 'react';
import { Modal, Button, Icon, Input } from 'antd'
import { Searchs } from '../../Math/APIconfig'
import { getFetch } from '../../Math/Math'
import Tables from '../Tables/Tables'
const InputSearch = Input.Search
class SimpleBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            TableData: [],
            columns: [{
                title: 'PK',
                dataIndex: 'PK',
                key: 'PK',
            }, {
                title: 'DQueryCaption',
                dataIndex: 'DQueryCaption',
                // key: 'PK',
            }, {
                title: 'BillTypeCode',
                dataIndex: 'BillTypeCode',
                // key: 'PK',
            }, {
                title: 'Author',
                dataIndex: 'Author',
                // key: 'PK',
            }, {
                title: 'BranchID',
                dataIndex: 'BranchID',
                // key: 'PK',
            }],
        }
    }
    componentWillMount() {
        getFetch(Searchs().SimpleTableAPI, (res) => {
            this.setState({
                TableData: res
            })
        })
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOK = (e) => {
        this.setState({
            visible: false
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }
    TableEmitData = (TableValue) => {
        // console.log(TableValue)
        //传出去的参数
        this.props.handleBook(TableValue)
    }
    handleTable = (value) => {
        getFetch(Searchs(value).SimpleTableAPI, (res) => {
            this.setState({
                TableData: res
            })
        })
    }
    render() {
        const { TableData, columns } = this.state
        return (
            <div>
                <Button onClick={this.showModal} type="primary"><Icon type="book"></Icon></Button>
                <Modal
                    title="表格"
                    visible={this.state.visible}
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <InputSearch
                        placeholder="input search text"
                        onSearch={this.handleTable.bind(this)}
                        enterButton
                        style={{ width: 200 }}
                    />
                    <Tables
                        Data={TableData}
                        columns={columns}
                        TableEmitData={this.TableEmitData.bind(this)}
                    ></Tables>
                </Modal>
            </div>
        );
    }
}

export default SimpleBtn;