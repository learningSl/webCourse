<template>
    <div class="wrap">
       <div class="title">修改 / 删除书籍</div>
       <div class="all">
           <div>选择分类:</div>
           <div>
               <select v-model="sort">
                    <option value="0">首页推荐</option>
                    <option value="1">编程</option>
                    <option value="2">人文社科</option>
                    <option value="3">党政专区</option>
                    <option value="4">中版书房</option>
                    <option value="5">教材教辅</option>
                </select>
           </div>
           <div style="margin-left:15%;border:1px solid black;font-size: 2rem;"><button @click="getdata" style="width:100%;height:30%">查询</button></div>
       </div>
        <div class="alls" v-for="(res,i) in results" :key="i">
            <div class="left">
                <img :src="res.image_url" />
            </div>
                <div class="right">
                    <div class="first">
                        <div>书名:</div>
                        <div><input v-model="res['书名']" type="text"></div>
                    </div>
                    <div class="first">
                        <div>价格:</div>
                        <div><input v-model="res['价格']" type="text"></div>
                    </div>
                    <div class="first">
                        <div>数量:</div>
                        <div><input v-model="res['数量']" type="text"></div>
                    </div>
                    <div class="first">
                        <div><button @click="up(i)">修改</button></div>
                        <div><button @click="del(i)">删除</button></div>
                    </div>
                </div>
        </div>
       
    </div>
</template>
<script>
export default {
    data() {
        return {
            sort:'',
            results:[]
        }
    },
    methods: {
        async getdata(){
            if(this.sort==''){
                return;
            }
            if(this.sort == 1){
                let data = await this.$http.get('/bookdata/bian');
                this.results=data.data;
            }else if(this.sort == 0){
                let data = await this.$http.get('/suggesstion')
                this.results=data.data;
            }else if(this.sort==2){
                let data = await this.$http.get('/bookdata/man')
                this.results=data.data;
            }else if(this.sort==3){
                let data = await this.$http.get('/bookdata/country')
                this.results=data.data;
            }else if(this.sort==4){
                let data = await this.$http.get('/bookdata/middle')
                this.results=data.data;
            }else if(this.sort==5){
                let data = await this.$http.get('/bookdata/teach')
                this.results=data.data;
            }
        },
        async up(i){
            let data= await this.$http.post('/up',{name:this.results[i]['书名'],price:this.results[i]['价格'],count:this.results[i]['数量'],sort:this.sort,image_url:this.results[i].image_url})
            if(data.data.status==200){
                alert("修改成功")

            }else{
                alert('修改失败')
            }
        },
        async del(i){
            if(!confirm('你确定要删除吗?')){
                return;
            }
            let data= await this.$http.post('/del',{image_url:this.results[i].image_url,sort:this.sort})
            if(data.data.status==200){
                
                alert("删除成功")
                this.results.splice(i, 1)
            }else{
                alert('删除失败')
            }
        }
    },
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
    background: aqua;
}
   
.all{
    width: 50%;
    height: 10%;
    margin: 0 auto;
    margin-top: 3%;
    padding-left: 5%;
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
.first{
    display: flex;
    margin-top: 5%;
}
select{
    width: 150%;
    height: 30%;
    font-size: 2rem;
}
.alls{
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
    background: chocolate;
}
.left img{
    width: 100%;
    height: 100%;
}
/* .right{
    width: 50%;
    height: 100%;
    margin-left: 5%;
    background: chartreuse;
} 
*/
button{
    border: 1px solid black;
    /* padding-left: 3%; */
    cursor: pointer;
}
</style>