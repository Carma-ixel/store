<template>
<footer class="footer" >
  <div class="content has-text-centered">
    <p>
      <strong>STORE</strong> by <a href="https://github.com/Carma-ixel">Carmarí Barreto</a>.
      <strong>Todos los Derechos Reservados</strong>
    </p>
  </div>
</footer> 
</template>
<script>
export default {
     name: '',
  components: {},
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
    
}
</script>
<style scoped>
footer{
   background-color:black;
}
</style>