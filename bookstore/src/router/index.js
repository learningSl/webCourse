import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'
import Order from '../views/Order.vue'
import HistoryOrder from '../views/HistoryOrder.vue'
import AddBook from '../views/AddBook.vue'
import RootLogin from '../views/RootLogin.vue'
import OperatorBook from '../views/OperatorBook.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login,
   },
   {
     path: '/home',
     component: Home
   },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/order',
    component: Order
  },
  {
    path:'/historyorder',
    component: HistoryOrder
  },
  {
    path:'/add',
    component: AddBook
  },
  {
    path:'/rootlogin',
    component: RootLogin
  },
  {
    path:'/operatorbook',
    component:OperatorBook
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path=='/'){
    return next()
  }else{
    if(sessionStorage.getItem('token')){
      return next()
    }else{
      return next('/')
    }
  }
})
export default router
