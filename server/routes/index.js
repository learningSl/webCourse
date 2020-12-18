module.exports=app=>{
    const router=require('express').Router();
    const mysql = require('../database/index');
    router.get('/suggesstion', (req, res) => {
        mysql.select("select * from suggestion1", [], (data) =>{
            res.send(data);
        })
    })
    router.get('/detail', (req, res)=>{
        if(req.query.index==0){
            mysql.select("select * from suggestion1 where image_url=?;",[req.query.image_url],(data)=>{
                let value = Object.values(data[0])
                let obj={name: value[0],price: value[2], count: value[3], author: value[1], image_url:value[4]}
                // console.log(Object.values(data[0]))
                res.send(obj)
            })
        }else{
            mysql.select("select * from books where image_url=?;",[req.query.image_url],(data)=>{
                let value = Object.values(data[0])
                // console.log(value)
                let obj={name: value[0],price: value[2], count: value[3], author: value[1], image_url:value[4]}
                // console.log(Object.values(data[0]))
                res.send(obj)
            })
        }
    })
    router.get('/bookdata/bian', (req, res) => {
        mysql.select("select * from books where sort=?;", ['1'], data=>{
            res.send(data)
        })
    })
    router.get('/bookdata/man', (req, res) => {
        mysql.select("select * from books where sort=?;", ['2'], data=>{
            res.send(data)
        })
    })
    router.get('/bookdata/country', (req, res)=>{
        mysql.select("select * from books where sort=?;", ['3'], data=>{
            res.send(data)
        })
    })
    router.get('/bookdata/middle', (req, res)=>{
        mysql.select("select * from books where sort=?;", ['4'], data=>{
            res.send(data)
        })
    })
    router.get('/bookdata/teach', (req, res)=>{
        mysql.select("select * from books where sort=?;", ['5'], data=>{
            res.send(data)
        })
    })
    router.post('/login', (req, res)=>{
        mysql.select("select * from user where root=? and pwd=?;", [req.body.username, req.body.password], data=>{
            if(data[0]){
                res.send({status: 200,msg:'登陆成功',id:data[0].id})
            }else{
                res.send({status: 400, msg: '登陆失败'})
            }
        })
    })
    router.post('/resi', (req, res) => {  
        mysql.insert("insert into user(root,pwd,phone) values(?,?,?);", [req.body.username,req.body.password,req.body.phone], result=>{
            if(result.affectedRows==1){
                res.send({status: 200,result})
            }else{
                res.send({status: 400, msg: '注册失败'})
            }
            
        })                    
    })
    router.post('/order', (req, res) => {
        mysql.select("select * from orders where uid=?",[req.body.id], data=>{
            let date
            for (let index = 0; index < data.length; index++) {
                let time = new Date(parseInt(data[index].orderid))
                let date=time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日  '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
                data[index].d=date
            }
            res.send(data)
        })
    })
    router.post('/buy', (req, res)=>{
        let orderid=Date.now()
        let result = req.body
        // console.log(result)
        if(req.body.sort == 0){
            mysql.insert("insert into orders values(?,?,?,?,?,?);",[orderid,result.id,result.name,result.count,result.pay,result.image_url],data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '支付失败'})
                }
            })
            mysql.insert("update suggestion1 set 数量=? where image_url=?",[result.all-result.count,result.image_url],data=>{
                // res.send(data)
            })
        }else{
            mysql.insert("insert into orders values(?,?,?,?,?,?);",[orderid,result.id,result.name,result.count,result.pay,result.image_url],data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '支付失败'})
                }
            })
            mysql.insert("update books set 数量=? where image_url=?",[result.all-result.count,result.image_url],data=>{
                // res.send(data)
            })
        }
    })
    const multer=require('multer')
    let storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, __dirname+'/../public/suggestion')
        },
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    })
    const update=multer({storage})
    router.post('/update',update.single('file'),async (req, res)=>{
        res.send({image_url: 'http://localhost:3000/images/suggestion/'+req.file.filename})
    })
    router.post('/addbook', (req, res)=>{
        if(req.body.sort==0){
            mysql.insert("insert into suggestion1 values(?,?,?,?,?);",[req.body.name,req.body.author,req.body.price,req.body.count,req.body.image_url.image_url],data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '添加失败'})
                }
            })
        }else{
            mysql.insert("insert into books values(?,?,?,?,?,?);",[req.body.name,req.body.author,req.body.price,req.body.count,req.body.image_url.image_url,req.body.sort],data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '添加失败'})
                }
            })
        }
    })
    router.post('/rootlogin',(req, res)=>{
        mysql.select("select * from rootlogin where username=? and password=?",[req.body.username, req.body.password],data=>{
            if(data[0]){
                res.send({status: 200,msg:'管理员登陆成功',id:data[0].id})
            }else{
                res.send({status: 400, msg: '管理员登陆失败'})
            }
        })
    })
    router.post('/up', (req, res)=>{
        if(req.body.sort==0){
            mysql.select("update suggestion1 set 书名=?,价格=?,数量=? where image_url=?",[req.body.name,req.body.price,req.body.count,req.body.image_url],data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '添加失败'})
                }
            })
        }else{
            mysql.select("update books set 书名=?,价格=?,数量=? where sort=? and image_url=?",[req.body.name,req.body.price,req.body.count,req.body.sort,req.body.image_url],data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '添加失败'})
                }
            })
        }
    })
    router.post('/del',(req, res)=>{
        if(req.body.sort==0){
            mysql.select("delete from suggestion1 where image_url=?",[req.body.image_url], data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '添加失败'})
                }
            })
        }else{
            mysql.select("delete from books where image_url=?",[req.body.image_url], data=>{
                if(data.affectedRows==1){
                    res.send({status:200, data})
                }else{
                    res.send({status: 400, msg: '添加失败'})
                }
            })
        }
    })
    app.use("/web", router)
}
