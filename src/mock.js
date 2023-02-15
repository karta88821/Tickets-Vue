/**
 * mockjs用來模擬server的資料，在沒有後端時可利用他來模擬server
 */


const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: 'OK',
    data: null
}

Mock.mock('/capImg', 'get', () => {
    Result.data = {
        token: Random.string(32),
        capImg: Random.dataImage('100x40', 'p7n5w')
    }
    return Result;
})

Mock.mock('/login', 'post', () => {
    //Result.code = 401
    //Result.msg = "驗證碼錯誤"
    return Result;
})

Mock.mock('/system/userInfo', 'get', () => {
    Result.data = {
        id: "1",
        username: "test",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
    }
    return Result;
})

Mock.mock('/logout', 'post', () => {
    return Result;
})