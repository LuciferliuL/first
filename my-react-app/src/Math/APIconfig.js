const APIconfig = {
    Server: '10.3.2.22:50002',
    XX: '10.2.128.94:9016'
}

const API = {
    //树结构
    Trees: 'http://' + APIconfig.Server + '/api/Menu/GetMenuByCatalog?catalog=GOS',
}

const LoginAPI = (name, pass) => (
     //登入页面
    {
        Login: 'http:\/\/' + APIconfig.Server + '/api/UserLogin/UserLogin?UserName=' + name + '&' + 'PassWord=' + pass,
    }
)

const ActionAPI = (PK)=>(
    //菜单 点击获取数据
    {
        Action: 'http:\/\/' + APIconfig.Server + '/api/Menu/GetMenuInfoForPK?pk=' + PK
    }
)


export {API,LoginAPI,ActionAPI}