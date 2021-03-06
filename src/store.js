import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function setInStorage(key, obj) { localStorage.setItem(key, JSON.stringify(obj))} //enviar producto al carrito
function getFromStorage(key) { return JSON.parse(localStorage.getItem(key))} //muostrar items carrito
function getCartTotal(productsList) { //obtener total 
  let price = 0.0
  productsList.forEach(p => {
    price += p.data.price * p.qty
  })
  return price
}

function newCart() { //resetear carrito
  return {
    list: [],
    total: 0.0,
  }
}

export default new Vuex.Store({
  state: { 
    // User
    currentUser: getFromStorage('user') || undefined,
    // Cart
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
    products: [],
    loading: false,
    edit: false,
    overlay: false,
  },
  mutations: {
    LOADING_PRODUCTS(state){state.loading = !state.loading},
    GET_PRODUCTS(state, products){
      state.products = []
       products.forEach((prod) =>{
          prod['qty'] = 1
          state.products.push(prod)
        })
      state.loading = false
    },
    UPDATE_CURR_USER(state, user) {
    state.currentUser = user
        setInStorage('user', user)
    },
    ADD_TO_CART(state, product) {
      if (product.qty === undefined ) { product['qty'] = 1 }
       let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
        if (pidx >= 0) {
          state.shoppingCart.list[pidx].qty++
        } else {
          state.shoppingCart.list.push(product)
        }
        // update total price
       state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        // update in storage
       setInStorage('cart', state.shoppingCart)
    },
    REMOVE_FROM_CART(state, product_id) {
        let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
        if (pidx >= 0) {
          state.shoppingCart.list.splice(pidx, 1)
          state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
          setInStorage('cart', state.shoppingCart)
        } else {
          throw new Error("Product not found in cart")
        }
      },
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      setInStorage('cart', state.shoppingCart)
    },
    UPDATE_SHOW_CART(state, value) {state.showCart = value },
    UPDATE_EDIT(state){state.edit = !state.edit},
    ON_OVERLAY(state){state.overlay = true},
    OFF_OVERLAY(state){state.overlay = false}
  },
  actions: { // realizan el cambio y operaciones asincronas
    updateEdit({commit}){
      commit('UPDATE_EDIT')
    },
    // User
    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    addToCart ({commit}, product) {
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    removeFromCart ({commit}, product_id) {
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    clearCart ({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    updateShowCart({commit}, val) {
      console.log('setting showCart to', val)
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val) 
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    //LLamado de los productos 
    getProducts({commit}){
    //Mutación de carga con el process y lo prodcuts
      commit('ON_OVERLAY')
      commit('LOADING_PRODUCTS')
      //Llamado a la base de datos y traer información
      axios.get (`https://us-central1-tdddg3.cloudfunctions.net/products/products`, {
        headers:{
          "Content-type": "text/plain"
        }
      }).then((accept) =>{
      //variable auxiliar
      let data = accept.data;
      //llamar otra mutación conjunto que inyecta los productos y la otra que cierra el overlay
      commit('GET_PRODUCTS', data)
      }).finally(() =>{
        commit('OFF_OVERLAY')
      })
    }    
  },
  getters: { //son metodos computados
    // Acceso Usuarios
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    // Carrito, mostrar agregar
    shoppingCart: state => state.shoppingCart,
    showCart: state => state.showCart,
  }
})
