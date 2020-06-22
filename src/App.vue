<template>
 <div id="app">
  <navbar :brand="'Stranger Plants'"/>
    <div class="modal" :class="{'is-active': overlay}" >
      <div class="modal-background"></div>
        <div class="modal-content">
          <progress class="progress is-medium is-dark" max="100">95%</progress>
        </div>     
    </div>
   <router-view/>
  <Footer/>
 </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import {mapState} from 'vuex'

export default {
  
  components: {
    Navbar,
    Footer 
  },
   computed:{
    ...mapState(['overlay'])
  },
}
</script>
<style scoped>
#app{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
