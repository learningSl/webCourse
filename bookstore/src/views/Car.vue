<template>
    <div class="car">
        <div class="top">购物车</div>
        <div v-for="(c,i) in car" :key="i" class="wrap">
            <div class="left">
                <img :src="c[0].image_url"  />
            </div>
            <div class="right">
                <div class="top_1">{{c[0].name}}</div>
                <div class="last_1">
                    <div @click="sub(i)">-</div>
                    <div>1</div>
                    <div @click="add(i)">+</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            car:[]
        }
    },
    created() {
        this.car = this.$show(this.car)
    },
    methods: {
        sub(index){
            this.car[index][0].total--;
        },
        add(index){
            this.car[index][0].total++;
        }
    },
}
</script>
<style scoped>
.car{
    width: 100%;
    height: 100%;
    text-align: center;
}
.top{
    width: 100%;
    height: 10%;
    margin-top: 3%;
    font-size: 2rem;
}
.wrap{
    width: 50%;
    height: 15%;
    margin: 0 auto;
    display: flex;
    margin-top: 3%;
    background: white;
    /* justify-content: center; */
}
.left{
   width: 20%;
   height: 90%;
   margin-top: 1.5%; 
   margin-left: 2%;
}
.right{
    width: 75%;
    height: 100%;
    margin-left: 5%;
}
.left img{
    width: 100%;
    height: 100%;
}
.top_1{
    text-align: left;
    width: 100%;
    height: 50%;
    /* margin-top: 3%; */
    padding-top: 3%;
}
.last_1{
    text-align: left;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content:flex-start;
    align-items: flex-end;
}
.last_1 div{
    width: 10%;
    height: 50%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>