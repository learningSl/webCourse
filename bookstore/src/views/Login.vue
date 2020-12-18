<template>
    <div class="wrap">
        <div class="dis">
            <div class="top" @click="tologin" :class="{active: isActive}">
                登录
            </div>
            <div @click="toresi" :class="{active: !isActive}" class="top">
                注册
            </div>
            <table align="center" class="t" v-show="isActive">
            <tr>
                <td class="first">用户名:</td>
                <td class="second"><input v-model="username" type="text" /></td>
            </tr>
            <tr>
                <td class="first">密码:</td>
                <td class="second"><input v-model="password" type="password"></td> 
            </tr>
            <tr>
                <td colspan="2" class="n"><button @click="login" class="btn1">登录</button></td>
            </tr>
        </table>
        <table align="center" class="t" v-show="!isActive">
            <tr>
                <td class="first">用户名:</td>
                <td class="second"><input v-model="resiUser" type="text" /></td>
            </tr>
            <tr>
                <td class="first">密码:</td>
                <td class="second"><input v-model="resiPwd" type="password"></td> 
            </tr>
            <tr>
                <td class="first">联系方式:</td>
                <td class="second"><input v-model="resiPhone" type="text"></td> 
            </tr>
            <tr>
                <td colspan="2" class="n"><button @click="resi" class="btn1">注册</button></td>
            </tr>
        </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag:true,
            isActive: true,
            username:'',
            password:'',
            resiUser:'',
            resiPwd:'',
            resiPhone:''
        }
    },
    methods: {
        async login(){
            // localStorage.setItem('token', "aaa")
            // this.$routerrouter.push('/home')
            let res = await this.$http.post('/login',{username:this.username, password:this.password})
            if(res.data.status==200){
                sessionStorage.setItem('token', this.username+' '+this.password+' '+res.data.id)
                alert(res.data.msg)
                this.username=''
                this.password=''
                this.$router.push('/home')
            }else{
                alert(res.data.msg)
            }
        },
        toresi(){
            this.isActive=!this.isActive
        },
        tologin(){
            this.isActive=!this.isActive
        },
        async resi(){
            let data = await this.$http.post('/resi', {username:this.resiUser,password:this.resiPwd,phone:this.resiPhone})
            if(data.data.status==200){
                alert('注册成功')
                this.resiUser=''
                this.resiPwd=''
                this.resiPhone=''

            }else{
                alert('注册失败')
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
.dis{
    width: 25%;
    height: 80%;
    background: white;
}
.top{
    width: 50%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    float: left;
    color: gray;
    cursor: pointer;
}
.t{
    text-align: center;
    width: 100%;
    height: 30%;
    background: white;
    /* display: block; */
    margin-top: 30%;
}
tr{
    width: 70%;
    height: 20%;
}
.t tr .first{
    width: 25%;
    height: 20%;
    text-align: right;
}
.active{
    color: blue;
}
.btn1{
    background-color: skyblue;
    /* display: block; */
    width: 40%;
    height: 80%;
    text-align: center;
    /* margin-top: 5%; */
}

</style>