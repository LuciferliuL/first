import React from 'react'
import { Table } from 'antd';
// import reqwest from 'reqwest';
// import { getTimeFetch} from '../../Math/Math'
// import { GetPV } from '../../Math/APIconfig';

export default class TableServer extends React.Component {
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination)
        this.props.handleTableChange(pagination, filters, sorter)
    }
    render() {
        const { columns, loading, data, pagination, scroll } = this.props
        return (
            <Table
                // title={this.titleFun}
                bordered
                columns={columns}
                rowKey='_id'
                dataSource={data}
                pagination={pagination}//分页器
                loading={loading}//页面加载中
                onChange={this.handleTableChange}//分页排序，筛选变化时触发
                scroll={scroll}
            />
        );
    }
}