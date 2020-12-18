<template>
    <div class="wrap">
        <div class="all">
            <div class="top">管理员登录</div>
            <div class="last">
                <table>
                    <tr>
                        <td class="first">用户名:</td>
                        <td><input v-model="username" type="text"></td>
                    </tr>
                    <tr>
                        <td class="first">密码:</td>
                        <td><input v-model="password" type="password"></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="btn" style="text-align:center"><button @click="rootlogin">登录</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        async rootlogin(){
            if(this.username==''||this.password==''){
                alert("请输入用户名和密码")
                return;
            }
            let data=await this.$http.post('/rootlogin', {username:this.username,password:this.password})
            if(data.data.status==200){
                sessionStorage.setItem('root', data.data.status)
                alert(data.data.msg)
                this.$router.push('/home')
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
    display: flex;
    justify-content: center;
    align-items: center;
}
.all{
    width: 30%;
    height: 70%;
    /* background: chartreuse; */
    margin: 0 auto;
    background: white;
}
.top{
    width: 100%;
    height: 10%;
    /* background: chocolate; */
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.last{
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
}
table{
    width: 100%;
    height: 35%;
}
tr{
    width: 100%;
    height: 100%;
}
td{
    width: 50%;
    height: 100%;
}
tr .first{
    width: 30%;
    text-align: right;
}
.btn{
    padding-top: 5%;
    width: 30%;
    height: 120%;
}
.btn button{
    width: 30%;
    border: 1px solid black;
    height: 130%;
    /* background: green; */
    cursor: pointer;
}
</style>