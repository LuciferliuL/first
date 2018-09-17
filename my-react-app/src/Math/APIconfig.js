const APIconfig = {
    Server: 'http://10.3.2.22:50002',
    XX: 'http://10.2.128.94:9016',
    // liujun: 'http://10.2.129.182:9013'
    liujun:'http://10.3.4.233:50005'
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
        Simple: APIconfig.Server + '/api/QueryExtend/GetInfoForPk?PK=' + PK,
        Bill: APIconfig.Server + '/api/BillDefine/GetBillDefineInfo?pk=' + PK,
        Pop: APIconfig.Server + '/api/SearchFlow/SearchFlowControlInfo?pk=' + PK,
        SQL: APIconfig.Server + '/api/SQLScript/GetSqlForPk?PK=' + PK

    }
)
//配置里面得所有搜索
const Searchs = (Search = '') => (
    {
        WindowsAPI: APIconfig.Server + '/api/ActionInitial/GetListActionList?BranchId=STD&strQuery=' + Search,
        SimpleAPI: APIconfig.Server + '/api/QueryExtend/GetQuerySimpleList?branchID=STD&strQuery=' + Search,
        SimpleTableAPI: APIconfig.Server + '/api/SQLScript/GetSqlInfoList?BranchId=STD&strQuery=' + Search,
        BillAPI: APIconfig.Server + '/api/BillDefine/GetBillDefineList?branchid=STD&strQuery=' + Search,
        Pop: APIconfig.Server + '/api/SearchFlow/GetSearchFlowList?branchID=FDG&strQuery=' + Search,
        SQLManage: APIconfig.Server + '/api/SQLScript/GetSqlInfoList?BranchId=STD&strQuery=' + Search
    }
)
//保存增加或修改
const Save = () => (
    {
        Root: APIconfig.Server + '/api/Menu/SaveMenuInfo',
        Windows: APIconfig.Server + '/api/ActionInitial/SaveActionMapInfo',
        Simple: APIconfig.Server + '/api/QueryExtend/SaveQuerySimpleInfo',
        BillAPI: APIconfig.Server + '/api/BillDefine/SaveBillDefine',
        Pop: APIconfig.Server + '/api/SearchFlow/SaveAndUpdateSearchFlow',
        SQL: APIconfig.Server + '/api/SQLScript/SaveSqlInfo'
    }
)
//与分公司同步请求
const Copy = (PK) => (
    {
        BillDefine: APIconfig.Server + '/api/BillDefine/CopyBillDefineForBranch?PK=' + PK
    }
)
//删除
const Del = (PK) => (
    {
        Root: APIconfig.Server + '/api/Menu/DeleteMenu?PK=' + PK,
        Windows: APIconfig.Server + '/api/ActionInitial/DeleteActionInfo?pk=' + PK,
        Simple: APIconfig.Server + '/api/QueryExtend/DeleteQuerySimple?PK=' + PK,
        BillDefine: APIconfig.Server + '/api/BillDefine/DelBillDefine?PK=' + PK,
        Pop: APIconfig.Server + '/api/SearchFlow/DeleteSearchFlow?PK=' + PK,
        SQL: APIconfig.Server + '/api/SQLScript/DeleteSqlScripe?PK=' + PK
    }
)

//firstAPI 用来更新每个页面请求API服务启动 keyName 升序降序  asc desc
const GetPV = (value, controller, name, startDate, endDate, offset, limit, keyName, minTimetaken, maxTimetaken, method) => (
    {
        firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erpiislog&esType=erpiislog_table',
        //获取服务器地址
        GetOrgList: APIconfig.liujun + '/api/lasticSearch/GetOrgList',
        GetOrgListServer: APIconfig.liujun + '/api/lasticSearch/GetServiceList?serverIp=' + value,
        GetControllerList: APIconfig.liujun + '/api/lasticSearch/GetControllerList?serverIp=' + value + '&port=' + controller,
        //错误日志获取地址
        GetComList: APIconfig.liujun + '/api/lasticSearch/GetErrorBranchList',
        GetComServer: APIconfig.liujun + '/api/lasticSearch/GetServiceList?serverIp=' + value + '&aggsField=Origin.Application&loggerType=Error',
        GetComServiceName: APIconfig.liujun + '/api/lasticSearch/GetControllerList?serverIp=' + value + "&port=" + controller + '&aggsField=Origin.CallingApplication&loggerType=Error',
        //平均量查询

        GetAverage: APIconfig.liujun + '/api/lasticSearch/GetAvgTakenIisLogs?startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
        GetAverageChart: APIconfig.liujun + '/api/lasticSearch/GetTimetakenIisLogs?startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
        GetPieTable: APIconfig.liujun + '/api/lasticSearch/GetTimetakenIisLogDetails?keyName=' + keyName + '&limit=' + limit + '&offset=' + offset + '&startDate=' + startDate + '&endDate=' + endDate + '&minTimetaken=' + minTimetaken + '&maxTimetaken=' + maxTimetaken + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
        //点击量查询
        GetPVSearch: APIconfig.liujun + '/api/lasticSearch/GetPvAggsIisLogs?startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
        //点击柱子显示详情  有升降序
        GetPVparticular: APIconfig.liujun + '/api/lasticSearch/GetPvAggsIisLogDetails?keyName=' + keyName + '&limit=' + limit + '&offset=' + offset + '&startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name + '&methodName=' + method,
        //点击获取延时查询
        GetInterval: APIconfig.liujun + '/api/lasticSearch/GetIntervalPvIisLogs?startDate=' + startDate + '&endDate=' + endDate + '&serverIp=' + value + '&port=' + controller + '&controllerName=' + name,
    }
)

//错误日志
const ErrorLog = () => ({
    firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erperrorlog&esType=erperrorlog_table',
    GetError: APIconfig.liujun + '/api/lasticSearch/GetErrorErpLogs'
    //获取公司列表
})

const saleLog = () => ({
    firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erpbusilog&esType=erpbusilog_table'
})

const currentLog = () => ({
    firstAPI: APIconfig.liujun + '/api/lasticSearch/InitDbLink?esIndex=erpiislog&esType=erpiislog_table'
})
export { API, LoginAPI, ActionAPI, Searchs, GetPV, ErrorLog, saleLog, currentLog, Copy, Del, Save }