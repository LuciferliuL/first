import React, { Component } from 'react';
import { Table} from 'antd'


/**
 * @param {接受参数} Data
 * @param {接受columns} Columns
 * @param {接受选择条目的信息} TableEmitData
 */
class Tables extends Component {
    state = {
        selectedRowKeys: []
    }
    onSelectChange = (selectedRowKeys,selectedRowValue) => {
        // console.log(selectedRowValue);
        this.setState({ selectedRowKeys });
        this.props.TableEmitData(selectedRowValue[0])
    }
    componentWillReceiveProps(next){
        // console.log(next)
        if(next.clearTable){
            this.setState({
                selectedRowKeys:[]
            })
        }
    }
    render() {
        const {selectedRowKeys } = this.state;
        const { Data, columns, scroll, type} = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            type:type,
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