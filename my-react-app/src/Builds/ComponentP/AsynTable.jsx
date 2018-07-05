import React, { Component } from 'react';
import { Table } from 'antd'


/**
 * @param {接受参数} Data
 * @param {接受columns} Columns
 * @param {接受选择条目的信息} TableEmitData
 */
class AsynTable extends Component {
    render() {
        const { Data, columns, scroll, expandedRowRender } = this.props
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={Data}
                    rowKey='PK'
                    size="middle"//表格大小
                    expandedRowRender={expandedRowRender}//表格每条下面的表格
                    bordered
                    scroll={scroll}
                    pagination={false}
                ></Table>
            </div>
        );
    }
}

export default AsynTable;