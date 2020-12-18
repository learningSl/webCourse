<template>
    <div @click="getDetail" class="all">
        <div class="top">
            <img :src="this.image_url" />
        </div>
        <div class="bottom">
            <label>{{this.name}}</label><br />
            <label class="price">{{'￥' + this.price}}</label>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        name:{type: String},
        price:{type: String},
        image_url:{type: String},
        flag:{type: Number}
    },
    methods: {
        getDetail(){
            let arr = this.image_url.split('/')
            this.$router.push({
                path: '/detail',
                query:{
                    arr:arr[arr.length-1],
                    flag:this.flag
                }
            });
        }
    },
}
</script>

<style scoped>
.all{
    width: 30%;
    height: 30%;
    background: white;
    text-align: center;
    margin-left: 3%;
    cursor: pointer;
}
.top{
    width: 100%;
    height: 80%;
    margin-top: 0%;
}
.top img{
    width: 30%;
    height: 100%;
}
.bottom{
    margin-top: 2%;
    width: 100%;
    height: 20%;
}
label{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.price{
    color: red;
}
</style>