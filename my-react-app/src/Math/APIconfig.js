const APIconfig = {
    Server: 'http://10.3.2.22:50002',
    XX: 'http://10.2.128.94:9016',
    liujun: 'http://10.2.129.182:9013'
}

const API = {
    //树结构
    Trees: APIconfig.Server + '/api/Menu/GetMenuByCatalog?catalog=GOS',
}

const LoginAPI = (name, pass) => (
    //登入页面
    {
        Login: APIconfig.Server + '/api/UserLogin/UserLogin?UserName=' + name + '&PassWord=' + pass,
    }
)

const ActionAPI = (PK) => (
    //菜单 点击获取数据
    {
        Action: APIconfig.Server + '/api/Menu/GetMenuInfoForPK?pk=' + PK,
        Simple: APIconfig.Server + '/api/QueryExtend/GetInfoForPk?PK=' + PK
    }
)

const Searchs = (Search = '') => (
    {
        WindowsAPI: APIconfig.Server + '/api/ActionInitial/GetListActionList?BranchId=STD&strQuery=' + Search,
        SimpleAPI: APIconfig.Server + '/api/QueryExtend/GetQuerySimpleList?branchID=STD&strQuery=' + Search,
        SimpleTableAPI: APIconfig.Server + '/api/SQLScript/GetSqlInfoList?BranchId=STD&strQuery=' + Search
    }
)

//firstAPI 用来更新每个页面请求API服务启动 keyName 升序降序  asc desc
const GetPV = (value, controller, name, startDate, endDate, offset, limit, keyName) => (
    {
        firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erpiislog&esType=erpiislog_table',
        //获取服务器地址
        GetOrgList: APIconfig.liujun + '/api/lasticSearch/GetOrgList',
        GetOrgListServer: APIconfig.liujun + '/api/lasticSearch/GetServiceList?serverIp=' + value,
        GetControllerList: APIconfig.liujun + '/api/lasticSearch/GetControllerList?serverIp=' + value + '&port=' + controller,
        //点击量查询
        GetPVSearch: APIconfig.liujun + '/api/lasticSearch/GetPvAggsIisLogs?startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
        //点击柱子显示详情  有升降序
        GetPVparticular: APIconfig.liujun + '/api/lasticSearch/GetPvAggsIisLogDetails?keyName=' + keyName + '&limit=' + limit + '&offset=' + offset + '&startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
        //点击获取延时查询
        GetInterval: APIconfig.liujun + '/api/lasticSearch/GetIntervalPvIisLogs?startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
    }
)

const ErrorLog = () => ({
    firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erperrorlog&esType=erperrorlog_table'
})

const saleLog = () => ({
    firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erpbusilog&esType=erpbusilog_table'
})

const currentLog = () => ({
    firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erpiislog&esType=erpiislog_table'
})
export { API, LoginAPI, ActionAPI, Searchs, GetPV }