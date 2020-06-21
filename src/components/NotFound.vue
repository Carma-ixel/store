<template>
  <div class="container content">
      <div class="has-text-centered">
        <h1 class="title is-1 ti">Error 404</h1>
        <h3 class="subtitle sub" >No encontrado :(</h3>    
      </div>
      <div class="has-text-centered">
        <button class="button is-success"><router-link to="/" :style="Col">Regresar a Home</router-link></button>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      Col:{
        color:'white',
        top:'1em'
      },
    }
  }
}
</script>
<style  scoped>
  .sub{
    margin-bottom: 4em;
  }
  .ti{
    margin-top: 3em;
    margin-bottom: 1em;
  }
  .container{
    min-height: 25em;
    background-image: url('../assets/leaf.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>