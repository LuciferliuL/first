const APIconfig = {
    XX: '10.3.2.22:50002',
    Server: '10.2.128.94:9016'
}

const API = {
    //树结构
    Trees: 'http://' + APIconfig.Server + '/api/Menu/GetMenuByCatalog?catalog=GOS',
}

const LoginAPI = (name, pass) => (
    //登入页面
    {
        Login: 'http:/\/' + APIconfig.Server + '/api/UserLogin/UserLogin?UserName=' + name + '&' + 'PassWord=' + pass,
    }
)

const ActionAPI = (PK) => (
    //菜单 点击获取数据
    {
        Action: 'http:/\/' + APIconfig.Server + '/api/Menu/GetMenuInfoForPK?pk=' + PK
    }
    /* {
     Action: '',
     ActionInfo: null,
     Author: null,
     BillDefineInfo: null,
     BranchID: "FD3",
     Caption: "",
     Catalog: "GOS",
     CreateTime: "",
     DeleteFlag: 0,
     DisplayMode: null,
     FK: null,
     FilePath: null,
     FrameType: 0,
     GuidString: null,
     ImageKey: null,
     LastModifyTime: "",
     LastUpdater: null,
     LevelString: "",
     LineID: -1,
     MenuName: "",
     Note: "",
     OrderIndex: 0,
     OriginalGuidString: "",
     PK: -1,
     Param1: null,
     Param2: null,
     ParentLevelString: null,
     QuerySimpleInfo: null,
     SoftSystemCode: "GOS",
     Tag: null,
     Version: 2,
     WorkFlowGuid: "",
     WorkFlowState: "",
 }*/
)


const WindowsAPI = (Search='') => (
    {
        Searchs:'http:/\/'+ APIconfig.Server +'/api/ActionInitial/GetListActionList?BranchId=STD&strQuery='+Search
    }
)


export { API, LoginAPI, ActionAPI, WindowsAPI }