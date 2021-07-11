const fs = require('fs')

// 按照指定模板生成指定条数的数据
function generateData(template, number){
    const tempArray = []

    for (let index = 0; index < number; index++) {
        tempArray[index] = {}
        for (const key in template) {
            tempArray[index][key] = randomData(template[key])
        }
    }
    
    const bf = new Uint8Array(Buffer.from(JSON.stringify(tempArray)))
    // 写入json文件
    fs.writeFileSync('./index.json', bf)
}

// 根据数据类型生成对应的mock数据
function randomData(data){
    const tempCNStringArray = "深蓝的天空中挂着一轮金黄的圆月下面是海边的沙地都种着一望无际的碧绿的西瓜其间有一个十一二岁的少年项带银圈手捏一柄钢叉向一匹猹尽力地刺去那猹却将身一扭反从他的胯下逃走了".split('')
    const tempENStringArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
    switch (typeof data) {
        case 'string':
            return data.toLowerCase() === data.toUpperCase()
             ? tempCNStringArray[Math.ceil(Math.random() * 79 - 1)]
             : tempENStringArray[Math.ceil(Math.random() * 25 - 1)]
        case 'number':
            return Math.round(Math.random() * 100)
        case 'boolean':
            return Math.random() >= 0.5
        default:
            break;
    }
}


// 生成5w条数据
generateData({
    "name": "张三",
    "age": 13,
    "boy": false,
    "letter": "A"
}, 50000)