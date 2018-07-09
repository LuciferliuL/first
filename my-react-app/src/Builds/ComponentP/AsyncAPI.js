const APIconfig = {
    Server: 'http://10.3.2.22:50002',
    XX: 'http://10.2.128.94:9016',
    liujun: 'http://10.2.129.182:9013'
    // liujun:'http://10.3.2.22:50002'
}
const API = () => (
    {
        getlist: 'http://10.3.2.22:50001/api/SyncSql/GetDataBaseServerList',
        getdata: 'http://10.3.2.22:50001/api/SyncSql/GetSqlDataByServer',
        Sync: 'http://10.3.2.22:50001/api/SyncSql/SyncSqlDataByServer',
    }
)

const table = (PK) => ({
    del: APIconfig.Server + '/api/TableUpdate/DeleteTableUpdateInfo?PK=' + PK,//删除
    postCheck: APIconfig.Server + '/api/TableUpdate/GetTableInfoListForAuthor',//查询
    click: APIconfig.Server + '/api/TableUpdate/GetTableInfoForPK?PK=' + PK,//点击表格条目查询
    execute: APIconfig.Server + '/api/TableUpdate/ChangePublicState',//批量执行
    add: APIconfig.Server + '/api/TableUpdate/AddTableUpdateInfo'//新增
})
export { API, table, APIconfig }