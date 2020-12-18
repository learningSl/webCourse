<template>
    <div class="detail">
        <div class="up" v-show="active">
            <div class="close" @click="exit">×</div>
            <div class="up_1">
                <div class="top">购买数量:{{total}}</div>
                <div class="middle"><input v-model="password" placeholder="支付密码" type="password" /></div>
                <div class="last">支付金额:￥{{total*res.price}}</div>
                <div class="paybtn"><button @click="pay">支付</button></div> 
            </div>
        </div>
       <div class="left">
           <img style="width:80%;heigth:90%" :src="this.res.image_url" />
       </div>
       <div class="right">
           <div class="name">{{this.res.name}}</div>
           <div class="author">{{this.res.author}}</div>
           <div class="price">{{'销售价: ' + '￥' + this.res.price}}</div>
           <div class="count">{{'书籍剩余数量: ' + this.res.count}}</div>
           <div class="buy">
               <div class="buy_count">数量: </div>
               <div class="wrap">
                   <div :disabled="this.left_flag" @click="sub" class="first">-</div>
                   <div>{{total}}</div>
                   <div :disabled="this.right_flag" @click="add" class="second">+</div>
               </div>
           </div>
           <div class="last">
               <!-- <button class="btn1" @click="addCar">加入购物车</button> -->
               <button @click="buy" class="btn2">立即购买</button>
           </div>
       </div>
    </div>
</template>
<script>
export default {
     async created() {
        this.image_url='http://localhost:3000/images/suggestion/' + this.$route.query.arr
        let data = await this.$http.get('/detail?image_url='+this.image_url+'&index='+this.$route.query.flag) 
        this.res=data.data

    },
    data() {
        return {
            image_url: null,
            res:{},
            total: 1,
            left_flag:false,
            right_flag:false,
            active:false,
            password: ''
            // car:[]
        }
    },
    methods: {
        sub(){
            if(this.total <= 0){
                this.left_flag= !this.left_flag
                return;
            }
            this.total--;
        },
        add(){
            if(this.total>=this.res.count){
                this.right_flag=!this.right_flag
                return;
            }
            this.total++;
        },
        buy(){
            if(this.total<=0){
                alert("当前商品未选中")
                return
            }
            this.active=true
        },
        async pay(){
            let pay=this.total*this.res.price
            let id=sessionStorage.getItem('token').split(' ').pop()
            if(sessionStorage.getItem('token').split(' ')[1] != this.password){
                alert('密码错误')
                return;
            }
            let data = await this.$http.post('/buy', {name:this.res.name,image_url:this.image_url,pay,id,count:this.total,all:this.res.count,sort:this.$route.query.flag})
            if(data.data.status==200){
                alert('支付成功')
                this.active=false
                location.reload()
            }
        },
        exit(){
            this.active=false
        }
    },
}
</script>
<style lang='css' scoped>
.detail{
    margin-top: 10%;
    width: 100%;
    height: 100%;
    text-align: center;
}
.up_1{
    width: 100%;
    height: 70%;
    position: relative;
    top: 10%;
}
.up{
    position: absolute;
    z-index: 99;
    width: 30%;
    height: 60%;
    background-color: white;
    left: 35%;
}
.close{
    position: relative;
    top: 0%;
    right: 0%;
    width: 100%;
    height: 10%;
    font-size: 3.5rem;
    padding-top: 2%;
    color: gray;
    cursor: pointer;
    text-align: right;
}
.close:hover{
    color: red;
}
.paybtn{
    width: 100%;
    height: 20%;
    cursor: pointer;
}
.paybtn button{
    width: 30%;
    height: 70%;
    cursor: pointer;
    background: green;
    font-size: 1.5rem;
}
.top{
    width: 100%;
    height: 15%;
}
.middle{
    width: 100%;
    height: 20%;
}
.middle input{
    /* display: block; */
    width: 50%;
    height: 70%;
}
.last{
    width: 100%;
    height: 20%;
    color: red;
}
.left{
    width: 30%;
    height: 40% ;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
}
.right{
    width: 60%;
    height: 40%;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    /* font-size: 1.5rem; */
}
.right div{
    /* margin-top: 7%; */
    width: 100%;
    height: 15%;
}
.author{
    color: skyblue;
}
.price{
    color: red;
}
.buy{
    /* display: flex; */
    /* justify-content: space-between; */
    width: 100%;
    height: 20%;

}
.buy_count{
    width: 10%;
    height: 100%;
    margin-left: 0  ;
}
.wrap{
    margin-top: -1.5%;
    width: 90%;
    height: 100%;
    display: flex;
    text-align: left;
    justify-content: start;
    margin-left: 8%;
    cursor: pointer;
}
.wrap div{
    width: 10%;
    height: 250%;
    border: 1px solid black;
    text-align: center;
    margin-left: 0;
}
button{
    display: inline-block;
    width: 25%;
    border: 1px solid black;
}
.btn2{
    margin-left: 5%;
    background: red;
    color: white;
    cursor: pointer;
}
.btn1{
    border: 1px solid red;
    color: red;
    cursor: pointer;
}
.first .second{
    cursor: pointer;
}

</style>