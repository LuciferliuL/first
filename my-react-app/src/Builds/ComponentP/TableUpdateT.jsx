import React, { Component } from 'react';
import { Table } from 'antd'


/**
 * @param {接受参数} Data
 * @param {接受columns} Columns
 * @param {接受选择条目的信息} TableEmitData
 */
class Tables extends Component {
    state = {
        selectedRowKeys: []
    }
    onSelectChange = (selectedRowKeys, selectedRowValue) => {
        // console.log(selectedRowValue);
        // console.log(selectedRowKeys)
        //获取选中的path
        let pathArr = []
        selectedRowValue.map((e) => {
            pathArr.push(e.PATH)
            return true
        })


        this.setState({ selectedRowKeys });
        this.props.TableEmitData(selectedRowKeys[selectedRowKeys.length - 1])
        this.props.downPK(selectedRowKeys,pathArr)
    }
    componentWillReceiveProps(next) {
        // console.log(next)
        if (next.clearTable) {
            this.setState({
                selectedRowKeys: []
            })
        }
    }
    render() {
        const { selectedRowKeys } = this.state;
        const { Data, columns, type } = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            type: type,
            // hideDefaultSelections:true
        };

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={Data}
                    rowKey='PK'
                    rowSelection={rowSelection}
                    bordered
                ></Table>
            </div>
        );
    }
}

export default Tables;