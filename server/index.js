const express = require('express')
const cors = require('cors')
const app=express();
app.use(cors());
app.use(express.json())
app.use('/images', express.static(__dirname + '/public'))//静态文件
// console.log(__dirname+ '/public/images');
require('./routes/index')(app)
app.listen(3000,'localhost',() =>{
    console.log("服务器启动成功");
})