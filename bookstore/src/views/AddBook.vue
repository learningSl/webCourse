<template>
    <div class="wrap">
        <div class="top">添加书籍</div>
        <div class="last">
            <table>
                <tr>
                    <td class="first">书名:</td>
                    <td><input v-model="name" type="text"></td>
                </tr>
                <tr>
                    <td class="first">来源:</td>
                    <td><input v-model="author" type="text"></td>
                </tr>
                <tr>
                    <td class="first">价格:</td>
                    <td><input v-model="price" type="number"></td>
                </tr>
                <tr>
                    <td class="first">数量:</td>
                    <td><input v-model="count" type="number"></td>
                </tr>
                <tr>
                    <td class="first">分类:</td>
                    <td>
                        <select v-model="sort">
                            <option value="0">首页推荐</option>
                            <option value="1">编程</option>
                            <option value="2">人文社科</option>
                            <option value="3">党政专区</option>
                            <option value="4">中版书房</option>
                            <option value="5">教材教辅</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="first">上传图片:</td>
                    <td><input @change="update" name="file" accept="image/png,image/gif,image/jpeg,image/jpg" type="file"></td>
                </tr>
                <tr>
                    <td style="text-align:center" colspan="2"><button @click="add">添加</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name:'',
            author:'',
            price:'',
            count:'',
            sort:'',
            image_url:''
        }
    },
    methods: {
        async update(e){
            let file=e.target.files[0]
            let param=new FormData()
            param.append('file',file)
            let data = await this.$http.post('/update',param)
            this.image_url=data.data
        },
        async add(){
            if(this.name=='' || this.price==''|| this.author==''||this.count==''||this.sort==''||this.image_url==''){
                alert("信息不完整")
                return;
            }
            let data = await this.$http.post('/addbook', {name:this.name,author:this.author,price:this.price,count:this.count,sort:this.sort,image_url:this.image_url})
            if(data.data.status==200){
                alert('添加成功')
            }else{
                alert(data.data.msg)
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
.top{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}
.last{
    width: 30%;
    height: 50%;
    background: white;
    margin: 0 auto;
    
}
.last table{
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
.last table tr{
    width: 100%;
    height: 10%;
}
.first{
    width: 50%;
    height: 10%;
    text-align: right;
}
button{
    width: 20%;
    height: 70%;
    border: 1px solid black;
    cursor: pointer;
}
</style>