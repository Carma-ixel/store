<template>
  <div class="container ">
    <section class="hero is-medium is-bold">
      <div class="hero-body">
        <div class="container">
          <div style="display: inline-block;">
            <h1 class="title is-2" :style="{color: textColor}">
              Universo de Plantas para ti.
            </h1>
            <h2 class="subtitle" :style="{color: textColor}" >
              Las plantas más exóticas y extrañas están aquí
            </h2>
          </div>
          <div class="is-pulled-right" style="display: inline-block;">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="" v-model="search">
                <span class="icon is-small is-left">
                  <i class="mdi mdi-magnify"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-3" v-for="p in computedProductList" :key="p.id">
        <div class="card has-equal-height">
          <div class="image-card">
            <div class="image has-spacing image is-16by9">
              <img  :src="p.data.picture">
            </div>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title" :style="{color: textColor}">{{ p.data.name }}</h3>
              <p class="subtitle">$ {{ p.data.price * p.qty }}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada.</p>
              <div class="counter">
                <button @click="decrQty(p.id)" :disabled="p.qty === 1"><i class="mdi mdi-minus"></i></button>
                {{ p.qty }}
                <button @click="incrQty(p.id)"><i class="mdi mdi-plus"></i></button>
              </div>
              <button @click="addToCart(p)" class="button is-pulled-right is-primary">
                <i class="mdi mdi-cart"></i>
              </button>
              <div class="is-clearfix"></div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  components: {},
  props: {}, 
  data(){
    return {
      search: '',
      textColor: '#4c7210', 
    }
  },
  methods: {
    incrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      this.products[idx].qty++
    },
    decrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      if(this.products[idx].qty > 1) {
        this.products[idx].qty--
      }
    },
    addToCart(product) {
      // push a copy of product to the cart
      let p = JSON.parse(JSON.stringify(product))
      this.$store.dispatch('addToCart', p)
      // reset qty
      product.qty = 1
    }
  },
  computed: {
    ...mapState(['products']),
    computedProductList() {
      return this.products.filter(p => {
        return p.data.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  watch: {},
  created() {
    this.$store.dispatch('getProducts')
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.card{
  margin-top: 2.1em;
  margin-bottom: 1.5em;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
.hero{
  margin-top: 2em;
  padding-bottom: 2em;
  background-image: url('../assets/bg.jpeg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color:#f5f6f8;
}
.counter {
  display: inline-block;
  button {
    text-align: center;
    border-radius: 50%;
    border-color: #00c4a7;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
}
</style>