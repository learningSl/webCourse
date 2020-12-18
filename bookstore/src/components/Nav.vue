<template>
    <div class="nav_all">
        <ul>
            <li @click="change(0)" :class="{ac: active0}">{{titles[0]}}</li>
            <li @click="change(1)" :class="{ac: active1}">{{titles[1]}}</li>
            <li @click="change(2)" :class="{ac: active2}">{{titles[2]}}</li>
            <li @click="change(3)" :class="{ac: active3}">{{titles[3]}}</li>
            <li @click="change(4)" :class="{ac: active4}">{{titles[4]}}</li>
            <li @click="change(5)" :class="{ac: active5}">{{titles[5]}}</li>
            <!-- <li>{{titles[6]}}</li> -->
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        titles:{type:Array, required: true}
    },
    data() {
        return {
            active0: true,
            active1: false,
            active2: false,
            active3: false,
            active4: false,
            active5: false
        }
    },
    methods: {
        change(index){
            this.$emit('getdata', index)
            if(index==1){
                this.active0=false
                this.active1=true
                this.active2=false
                this.active3=false
                this.active4=false
                this.active5=false

            }else if(index == 2){
                this.active0=false
                this.active1=false
                this.active2=true
                this.active3=false
                this.active4=false
                this.active5=false
            }else if(index == 3){
                this.active0=false
                this.active1=false
                this.active2=false
                this.active3=true
                this.active4=false
                this.active5=false
            }else if(index == 4){
                this.active0=false
                this.active1=false
                this.active2=false
                this.active3=false
                this.active4=true
                this.active5=false
            }else if(index == 5){
                this.active0=false
                this.active1=false
                this.active2=false
                this.active3=false
                this.active4=false
                this.active5=true
            }else if(index == 0){
                this.active0=true
                this.active1=false
                this.active2=false
                this.active3=false
                this.active4=false
                this.active5=false
            }
        }
    },
    
}
</script>
<style scoped>
.nav_all{
    width: 100%;
    height: 100%;
    line-height: 10%;
    margin-top: -1%;
}
.ac{
    background: blue;
}
ul{
    list-style: none;
    display: block;
    width: 100%;
    height: 100%;
}
li{
    width: 15%;
    height: 70%;
    font-size: 1.5rem;
    float: left;
    display: block;
    text-align: center;
    margin: 0 auto;
    background: white;
    line-height: 250%;
    cursor: pointer;
}
li:hover{
    background: skyblue;
}
</style>