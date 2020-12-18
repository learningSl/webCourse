const mysql=require('mysql')


function select(sql,arr,callback){
    
    let db = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'test'
    })
    // let sql = "select * from userlogin where 登录名=? and 登陆密码=?";
    db.connect()
    db.query(sql, arr, (err, data) => {
        // console.log(data)
        // res.send(data[0]['真实姓名'] + ', 登陆成功')
        callback(data)
    })
    db.end()
}
function insert(sql,arr, callback){
    let db = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'test'
    })
    db.connect()
    db.query(sql, arr, (err, data) => {
        callback(data)
    })
    db.end()
}
module.exports={
    select,insert
}