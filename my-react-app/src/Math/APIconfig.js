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

const GetPV = (value, controller, name, startDate, endDate, offset, limit) => (
    {
        GetOrgList: APIconfig.liujun + '/api/lasticSearch/GetOrgList',
        GetOrgListServer: APIconfig.liujun + '/api/lasticSearch/GetServiceList?serverIp=' + value,
        GetControllerList: APIconfig.liujun + '/api/lasticSearch/GetControllerList?serverIp=' + value + '&port=' + controller,
        //点击量查询
        GetPVSearch: APIconfig.liujun + '/api/lasticSearch/GetPvAggsIisLogs?startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
        //点击量详情
        GetPVparticular: APIconfig.liujun + '/api/lasticSearch/GetPvAggsIisLogDetails?limit=' + limit + '&offset=' + offset + '&startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
    }
)
export { API, LoginAPI, ActionAPI, Searchs, GetPV }