const mysql=require('mysql')


function select(sql,arr,callback){
    
    let db = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'test'
    })
    // let sql = "select * from userlogin where ��¼��=? and ��½����=?";
    db.connect()
    db.query(sql, arr, (err, data) => {
        // console.log(data)
        // res.send(data[0]['��ʵ����'] + ', ��½�ɹ�')
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