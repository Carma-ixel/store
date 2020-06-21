<template>
<footer class="footer" >
  <div class="content has-text-centered">
    <p>
      <strong>STORE</strong> by <a href="https://github.com/Carma-ixel">Carmarí Barreto</a><br>
      <strong>Todos los Derechos Reservados</strong>
    </p>
  </div>
</footer> 
</template>
<script>
export default {
  name: 'Footer',
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

      background-image: linear-gradient(to right, #0ba360 0%, #3cba92 100%);
  }
  a{
    color: white
  }
</style>