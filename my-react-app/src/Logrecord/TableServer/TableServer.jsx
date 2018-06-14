import React from 'react'
import { Table } from 'antd';
// import reqwest from 'reqwest';
import { getTimeFetch } from '../../Math/Math'

export default class TableServer extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
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

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        getTimeFetch('http://10.2.129.182:9013/api/lasticSearch/GetPvAggsIisLogDetails?limit=100&offset=0&startDate=2018/5/22&endDate=2018/5/23&serverIp=10.3.4.233&port=20336', (data) => {
            
            let paramdata = JSON.parse(data.Result)
            console.log(paramdata)
            let total = paramdata.hits.hits.length//数据量
            const pagination = { ...this.state.pagination };
            pagination.total = total;
            this.setState({
                loading: false,
                data: paramdata.hits.hits,
                pagination,
            });
        })
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        const { columns } = this.props
        return (
            <Table columns={columns}
                rowKey='_id'
                dataSource={this.state.data}
                pagination={this.state.pagination}//分页器
                loading={this.state.loading}//页面加载中
                onChange={this.handleTableChange}//分页排序，筛选变化时触发
                // scroll={{ y: 450 }}
                style={{padding:'10px'}}
            />
        );
    }
}