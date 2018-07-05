function strToArr(str) {
    var arr
    arr = str.trim().split('\n')
    // console.log(arr)
    return arr
}

export { strToArr }

/**
 * 
 * @param {原数据} ori 
 * @param {目标数据} obj1 
 * @param {目标数据} obj2 
 * @param {目标添加名称} name1 
 * @param {目标添加名称} name2 
 */
function pq(ori, obj1, obj2, name1, name2) {
    const key = [
        'AUTHOR', 'BRANCHID', 'MODULE', 'NOTE', 'SQLNAME', 'SQLSCRIPE',
    ]


    ori.forEach(element => {
        element.children = []
        key.forEach(value => {
            element[value] = { F: true, V: element[value]}
        });
    });
    obj1.forEach(element => {
        key.forEach(value => {
            element[value] = { V: element[value] }
        });
    });
    obj2.forEach(element => {
        key.forEach(value => {
            element[value] = { V: element[value] }
        });
    });
    //会有三个 开发一个 测试二个 
    for (let i = obj1.length - 1; i > 0; i--) {
        ori.map(element => {
            if (obj1[i].PK === element.PK) {
                key.forEach(v => {
                    if (obj1[i][v].V !== element[v].V) {
                        obj1[i][v].F = true
                        element[v].F = true
                    } else {
                        obj1[i][v].F = false
                        element[v].F = false
                    }
                })
                obj1[i].PK += name1
                element.children.push(obj1[i])
            }
            return element
        });
    }
    for (let i = obj2.length - 1; i > 0; i--) {
        ori.forEach(element => {
            if (obj2[i].PK === element.PK) {
                key.forEach(v => {
                    if (obj2[i][v].V !== element[v].V) {
                        obj2[i][v].F = true
                        element[v].F = true
                    } else {
                        obj2[i][v].F = false
                        element[v].F = false
                    }
                })
                obj2[i].PK += name2

                element.children.push(obj2[i])
            }
            return element
        });
    }
    console.log(ori)
    ori.forEach(element => {
        if(element.children.length === 0){
            element.children.push({PK:'测试库没有该行数据'+(Math.random()*100).toFixed(1)})
        }
    });
    return ori
}

export { pq }