<template>
    <div class="wrap">
        <div class="title">我的订单</div>
        <div class="all" v-for="(r,i) in res" :key="i">
            <div class="left">
                <img :src="r.image_url" />
            </div>
            <div class="right">
                <div class="top">
                    <div>订单编号:</div>
                    <div>{{r.orderid + '(已完成)'}}</div>
                </div>
                <div class="top">
                    <div>物品名称:</div>
                    <div>{{r.goodsname}}</div>
                </div>
                <div class="top">
                    <div>支付金额:</div>
                    <div class="p">{{'￥' + r.pay}}</div>
                </div>
                <div class="top">
                    <div>下单时间:</div>
                    <div>{{r.d}}</div>
                </div>
                <div class="top">
                    <div>购买数量:</div>
                    <div>{{r.goodscount}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    async created() {
        let id=sessionStorage.getItem('token').split(' ').pop()
        let data = await this.$http.post('/order', {id})
        this.res=data.data
         
    },
    data(){
        return {
            res:[]
        }
    }
}
</script>
<style scoped>
.wrap{
    width: 100%;
    height: 100%;
}
.title{
    width: 100%;
    height: 10%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.all{
    width: 50%;
    height: 20%;
    margin: 0 auto;
    margin-top: 3%;
    /* padding-left: 5%; */
    display: flex;
    background-color: white;
}
.left{
    width: 30%;
    height: 100%;
}
.left img{
    width: 100%;
    height: 100%;
}
.top{
    width: 100%;
    height: 20%;
    display: flex;
}
.p{
    color: red;
}
.right{
    width: 70%;
    height: 100%;
    margin-left: 5%;
}
</style>