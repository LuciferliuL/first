import 'isomorphic-fetch'
import { notification } from 'antd'
const NameBook = [
    { Port: "20291", Module: "OAuth" },
    { Port: "20301", Module: "Lookup" },
    { Port: "20296", Module: "Sys" },
    { Port: "20376", Module: "Store" },
    { Port: "20279", Module: "SaleOrder" },
    { Port: "9004", Module: "Query" },
    { Port: "20341", Module: "Quality" },
    { Port: "20336", Module: "Purchase" },
    { Port: "20386", Module: "PreAssign" },
    { Port: "20306", Module: "Basis" },
    { Port: "20321", Module: "Finance" },
    { Port: "20331", Module: "Price" },
    { Port: "20351", Module: "Sale" },
    { Port: "20311", Module: "Business" },
    { Port: "20361", Module: "Interface" },
    { Port: "20326", Module: "WF1" }
]


function getTime() {
    var myDate = new Date()
    var mytime
    myDate.toLocaleDateString()
    myDate.getFullYear()
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    myDate.getDate();        //获取当前日(1-31)
    myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    myDate.getHours();       //获取当前小时数(0-23)
    myDate.getMinutes();     //获取当前分钟数(0-59)
    myDate.getSeconds();     //获取当前秒数(0-59)
    switch (myDate.getDay()) {
        case 0:
            mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}S${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            break;
        case 1:
            mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}M${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            break;
        case 2:
            mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}T${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            break;
        case 3:
            mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}W${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            break
        case 4:
            mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}T${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            break;
        case 5:
            mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}F${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            break;
        case 6:
            mytime = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}S${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
            break;
        default:
            mytime = null
    }
    return mytime
}

export { getTime }

/**
 * 
 * @param {链接} URL 
 * @param {内容} postBody 
 */
function postFetch(URL, postBody, Callback) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let request = new Request(URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postBody),
        headers: myHeaders
    });
    fetch(request)
        .then(response => response.json())
        .then(result => {
            Callback(result)
        })
        .catch(res => {
            console.log(res)
        })
}

export { postFetch }


/**
 * 
 * @param {链接} URL 
 * @param {内容} postBody 
 */
function postFetchForm(URL, postBody, Callback) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', "application/x-www-form-urlencoded");
    let request = new Request(URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postBody),
        headers: myHeaders
    });
    fetch(request)
        .then(response => response.json())
        .then(result => {
            Callback(result)
        })
        .catch(res => {
            console.log(res)
        })
}

export { postFetchForm }

/**
 * 
 * @param {链接} URL 
 *
 */
function getFetch(URL, Callback) {
    fetch(URL, { method: "GET" })
        .then((response) => response.json())
        .then(data => {
            Callback(data)
        })
        .catch(error => {
            console.log(error)
        })
}

export { getFetch }
/**
 * 
 * @param {链接} URL 
 */
function getTimeFetch(URL, Callback) {
    //超时对象  超过5000ms 返回reject
    let time = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('timeout')
        }, 30000);
    })
    //请求对象 resolve返回data reject返回error
    let fetchs = new Promise((resolve, reject) => {
        fetch(URL, { method: "GET" })
            .then((response) => {
                // console.log(response)
                if (response.status === 200) {//成功
                    return response.json()
                } else {
                    return '获取数据失败'
                }
            })
            .then(data => {
                // console.log(data)
                resolve(data)
            })
            .catch(error => reject(error))
    })
    Promise.race([time, fetchs]).then((result) => {
        // console.log(result)
        //5秒以后  返回timeout
        Callback(result)
    }).catch((error) => {
        // console.log(error)
        return error
    })
}

export { getTimeFetch }


/**
 * 
 * @param {检测PK} PK 
 * @param {回调} Callback 
 */
function Alert(PK, Callback) {
    if (PK === 0) {
        notification.open({
            message: '错误提示',
            description: '请选择一个节点',
        });
    } else {
        Callback()
    }

}

export { Alert }

/**
 * 
 * @param {错误名称} v 
 */
function Errors(v) {
    notification.error({
        message: '错误提示',
        description: v + '为必填项'
    })
}

export { Errors }

/**
 * 返回  年/月/日  固定格式
 */
function Time(v = '/') {
    let time = new Date()
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = time.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + v + m + v + d
}

export { Time }

/**
 * 
 * @param {需要字典翻译得数组} data 
 */
function ObjRegister(data) {
    data.map((v) => {
        NameBook.map(value => {
            if (v.key === value.Port) {
                v.Port = value.Module
            } else {
                if (!v.Port) {
                    v.Port = v.key
                }
            }
            return true
        })
        return true
    })
    // console.log(data)
    return data
}

export { ObjRegister }

/**
 * @param{Name}对比字典 找到对应得名字
 */
function findName(Name) {
    // console.log( typeof(Name))
    let num = Name
    // let name = String(Name)
    NameBook.map((v) => {
        if (v.Module === Name) {
            num = v.Port
        }
        return true
    })
    return num
}

export { findName }

/**
 * 
 * @param {转换格式得数组} data 
 * {key：XXX,Port: xxx, doc_count:aaaa}
 */
function filtArr(data) {
    let buckets = []
    data.forEach((v, index) => {
        let P = v.aggregations.pv_result.buckets
        if (P.length > 0) {
            P[0].Port = index + 1
            P[0].key = P[0].key + 'x'
            buckets.push(P[0])
        } else {
            let miniP = { key: 0, doc_count: 0, Port: index + 1 }
            buckets.push(miniP)
        }

    })
    console.log(buckets)
    return buckets
}

export { filtArr }

/**
 * 
 * @param {开始时间，结束时间} 计算时间差 
 */
function timeFn(dbegin, ebegin) {//di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(dbegin.replace(/-/g, "/"));//将-转化为/，使用new Date
    var dateEnd = new Date(ebegin.replace(/-/g, "/"));//获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
    // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
    //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
    return dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
}
export { timeFn }

