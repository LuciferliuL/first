import React, { Component } from 'react';
import { Modal, Icon, Input, Spin } from 'antd'
import { Searchs } from '../../Math/APIconfig'
import { getFetch, getTime } from '../../Math/Math'
import Tables from '../Tables/Tables'
const InputSearch = Input.Search
class SimpleBtn extends Component {
    constructor(props) {
        super(props)
        this.DquerySqlReset = {
            Author: '',
            BranchID: "STD",
            CreateTime: getTime(),
            DeleteFlag: 0,
            FK: -1,
            GuidString: null,
            LastModifyTime: getTime(),
            LastUpdater: null,
            LineID: -1,
            Module: null,
            Note: null,
            OriginalGuidString: null,
            PK: -1,
            QueryDataRightCode: null,
            ScriptType: null,
            SoftSystemCode: "GOS",
            SqlName: '',
            SqlScripe: '',
            TableDisplayerGuid: null,
            Tag: null,
            Version: 5,
            VersionNum: 4,
            WorkFlowGuid: "",
            WorkFlowState: "",
        }
        this.state = {
            visible: false,
            TableData: [],
            loading:false,
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
    //内存泄漏 在组建处于componentWillUnmonut的时候
    // componentWillMount() {
    //     getFetch(Searchs().SimpleTableAPI, (res) => {
    //         this.setState({
    //             TableData: res
    //         })
    //     })
    // }

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
        this.props.handleBook(this.DquerySqlReset)
    }
    TableEmitData = (TableValue) => {
        // console.log(TableValue)
        //传出去的参数
        this.props.handleBook(TableValue)
    }
    handleTable = (value) => {
        this.setState({
            loading:true
        })
        getFetch(Searchs(value).SimpleTableAPI, (res) => {
            this.setState({
                TableData: res,
                loading:false
            })
        })
    }
    render() {
        const { TableData, columns, loading } = this.state
        return (
            <div>
                <Icon onClick={this.showModal} type="book" style={{ cursor: 'pointer' }}></Icon>
                <Modal
                    title="表格"
                    visible={this.state.visible}
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <Spin spinning={loading}>
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
                    </Spin>
                </Modal>
            </div>
        );
    }
}

export default SimpleBtn;