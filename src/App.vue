<template>
  <div id="app">
    <navbar :brand="'My Store'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>


<style lang="scss">
#app{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
 background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
}
</style>
