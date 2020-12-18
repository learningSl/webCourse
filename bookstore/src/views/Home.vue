<template>
  <div class="home">
    <div class="top_title">
        <div class="right">
          <div @click="t" :class="{a:act}">修改 / 删除书籍</div>
          <div :class="{a:act}" @click="addBook">添加书籍</div>
          <div @click="rootLogin">管理员登录</div>
          <div @click="change">历史订单</div>
          <!-- <div @click="change" >我的购物车</div> -->
          <div @click="out">退出登录</div>
        </div>
    </div>
    <div class="nav">
      <Nav @getdata="getdatas" :titles="this.nav_title" />
    </div>
    <div class="suggestion">
      <Bookcard :flag="flags" v-for="(result,index) in results" :key="index" :name="result['书名']" :price="result['价格']" :image_url="result['image_url']" />
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Bookcard from '../components/Bookcard'
import Nav from '../components/Nav'
export default {
  name: 'Home',
  components: {
    Bookcard,
    Nav
  },
  data() {
    return {
      results: [],
       nav_title:["首页", "编程", "人文社科","党政专区","中版书房","教材教辅"],
       flags: 0,
       act:true
    }
  },
  async created() {
    let data = await this.$http.get('/suggesstion')
    this.results=data.data;
    if(sessionStorage.getItem('root')==200){
        this.act=false
    }
  },
  methods: {
    login(){
      this.$router.push('/login')
    },
    async getdatas(index){
      if(index == 1){
        this.flags=1;
        let data = await this.$http.get('/bookdata/bian');
        this.results=data.data;
      }else if(index == 0){
        this.flags=0;
        let data = await this.$http.get('/suggesstion')
        this.results=data.data;
      }else if(index==2){
        this.flags=1;
        let data = await this.$http.get('/bookdata/man')
        this.results=data.data;
      }else if(index==3){
        this.flags=1;
        let data = await this.$http.get('/bookdata/country')
        this.results=data.data;
      }else if(index==4){
        this.flags=1;
        let data = await this.$http.get('/bookdata/middle')
        this.results=data.data;
      }else if(index==5){
        this.flags=1;
        let data = await this.$http.get('/bookdata/teach')
        this.results=data.data;
      }
    },
    out(){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('root')
      this.$router.push('/')
    },
    change(){
      this.$router.push('/historyorder')
    },
    rootLogin(){
      this.$router.push('/rootlogin')
    },
    addBook(){
      this.$router.push('/add')
    },
    t(){
      this.$router.push('/operatorbook')
    }
  },
}
</script>
<style scoped>
.home{
  width: 100%;
  height: 100%;
}

.suggestion{
  margin-top: 5%;
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
}
.top_title{
  width: 100%;
  height: 5%;
  float: left;
  margin-top: 2%;
}
.left{
  width: 50%;
  height: 100%;
  float: left;
  text-align: left;
}
.right{
  width: 50%;
  height: 100%;
  /* float: left; */
  display: flex;
  text-align: right;
}
.left div{
  float: left;
  margin-left: 5%;
  color: blue;
  cursor: pointer;
}
.right div{
  width: 25%;
  float: left;
  margin-left: 5%;
  cursor: pointer;
}
.nav{
  width: 100%;
  height: 10%;
}
.a{
  pointer-events: none;
}
</style>
