<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
    <!-- Brand -->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        {{ brand }}
      </router-link>
      <a role="button"
      class="navbar-burger burger" aria-label="menu" aria-expanded="false"
      data-target="navbarMenu"
      :class="{'is-active' :displayMenu}"
      @click="displayMenu = !displayMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!--  -->
    <div id="navbarMenu" class="navbar-menu" :class="{'is-active' :displayMenu}">
        <div class="navbar-start">
          <!--
          <a class="navbar-item">
            Home
          </a>
          -->
        </div>

        <div class="navbar-end">
          <a data-testID="cart" class="navbar-item" @click="showCart">
            <span class="icon">
              <i class="mdi mdi-32px mdi-cart"></i>
              <span
              class="tag is-warning"
              v-if="$store.getters.shoppingCart.list.length > 0">
                {{ $store.getters.shoppingCart.list.length }}
              </span>
            </span>
          </a>
          <router-link v-if="!isLoggedIn" to="/login" class="navbar-item">
            Login
          </router-link>
          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                <span class="icon">
                  <i class="mdi mdi-32px mdi-account"></i>
                </span>
               {{getCurrentUser ? getCurrentUser.email: ''}}
            </a>

            <div class="navbar-dropdown">
              <a  class="navbar-item x">
                Preferencias
              </a>
              <a class="navbar-item x" @click="showCart">
                Ver Carrito
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item x" @click="logout">
                Cerrar Sesión
              </a>
              <router-link to="/create" class="x"  @click="displayMenu = !displayMenu">Añadir Producto
              </router-link>
            </div>
          </div>
        </div>
      </div>
    <!--  -->
    </div> <!-- container -->
  </nav>
</template>

<script>
import Firebase from 'firebase';


export default {
  name: '',
  components: {},
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      displayMenu: false,
    }
  },
  methods: {
    showCart(event) {
      event.preventDefault();
      this.$store.dispatch('updateShowCart', true)
    },
    logout() {
      Firebase.auth().signOut().then (() =>{
        this.$router.push ('/login')
        this.$store.dispatch('updateUser', false)
      this.displayMenu = false
     })
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){
      return Firebase.auth().currentUser ? Firebase.auth().currentUser : ''
    }
  },
  watch: {},
  created() {
    this.currentUser = Firebase.auth().currentUser

  },

 
  mounted() {}
}
</script>

<style lang="scss" scoped>
a, i {
  color: white;
}
nav{
  height: 3.25rem;
  background-color: rgb(55, 56, 56);
  position: fixed;
  top: 0;
  width: 100%;
 }
 #navbarMenu{
   background-color: rgb(55, 56, 56);

 }

.navbar-dropdown{
background-color: rgb(55, 56, 56);
}

</style>