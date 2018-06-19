import React from 'react'
import { Table } from 'antd';
// import reqwest from 'reqwest';
// import { getTimeFetch} from '../../Math/Math'
// import { GetPV } from '../../Math/APIconfig';

export default class TableServer extends React.Component {
    // state = {
    //     data: [],
    //     pagination: {},
    //     loading: false,
    //     URLData:{}
    // };
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination)
        this.props.handleTableChange(pagination, filters, sorter)
        // const pager = { ...this.state.pagination };
        // pager.current = pagination.current;
        // this.setState({
        //     pagination: pager,
        // });
        // this.fetch({
        //     limit: 100,
        //     offset: pagination.current,
        //     sortField: sorter.field,
        //     sortOrder: sorter.order,
        //     ...filters,
        // },this.state.URLData);
    }
    //   fetch = (params = {}) => {
    //     console.log('params:', params);
    //     this.setState({ loading: true });
    //     reqwest({
    //       url: 'https://randomuser.me/api',
    //       method: 'get',
    //       data: {
    //         results: 10,
    //         ...params,
    //       },
    //       type: 'json',
    //     }).then((data) => {
    //       const pagination = { ...this.state.pagination };
    //       // Read total count from server
    //       // pagination.total = data.totalCount;
    //       pagination.total = 200;
    //       this.setState({
    //         loading: false,
    //         data: data.results,
    //         pagination,
    //       });
    //     });
    //   }

    // fetch = (params = {},URLData) => {
    //     // console.log(URLData)
    //     // console.log('params:', params);
    //     this.setState({ loading: true });
    //     getTimeFetch(GetPV(URLData.value, URLData.controller, URLData.name, URLData.startDate, URLData.endDate, params.offset, params.limit).GetPVparticular, (data) => {
    //         let paramdata = JSON.parse(data.Result)
    //         console.log(paramdata)
    //         let total = paramdata.hits.total//数据量
    //         const pagination = { ...this.state.pagination };
    //         pagination.total = total;
    //         pagination.pageSize=100
    //         this.setState({
    //             loading: false,
    //             data: paramdata.hits.hits,
    //             pagination,
    //         });
    //     })
    // }
    // componentWillReceiveProps(pre) {
    //     console.log(pre)
    //     if (pre.URLData.value !== ' ') {
    //         this.fetch({ offset: 1, limit: 100 },pre.URLData);
    //         this.setState({
    //             URLData:pre.URLData
    //         })
    //     }
    // }
    render() {
        const { columns, loading, data, pagination } = this.props
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
                scroll={{ x:1200 ,y: 550 }}
                // style={{ padding: '10px' }}
            />
        );
    }
}