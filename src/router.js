import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import Home from './views/Home.vue'
import Create from './components/Create.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', 
      redirect: 'home'
    },
    {
      path: '/about',
      name: 'about',
      // Esto es otra manera de hacer el lazy-loaded en  vez de hacer el import.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      //Atributo Customizable..para marcar la rutacon un disntitibo para usar:
      meta:{
        requiereLogin:true

      }
    },
    {
    path:'/create',
    name: 'create',
    component: Create
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    }
  ]
})
//to donde va... From de donde viene y next siguiente. 
router.beforeEach((to, from, next) =>{
  //to and from are both route objects. must call "true"
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.requiereLogin)
  if (!user && authRequired){
    next ('login')
  }  else{
    next()
  }
})

export default router;