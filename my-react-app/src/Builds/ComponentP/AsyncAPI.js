const API = () => (
    {
        getlist: 'http://10.3.2.22:50001/api/SyncSql/GetDataBaseServerList',
        getdata: 'http://10.3.2.22:50001/api/SyncSql/GetSqlDataByServer',
        Sync: 'http://10.3.2.22:50001/api/SyncSql/SyncSqlDataByServer',
    }
)

export { API }