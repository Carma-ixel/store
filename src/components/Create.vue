<template>
  <div class="conta">
     <div class="container content box">
       <h1 class="title">Agregar Productos</h1>
         <div class="field">    
            <div class="control">
               <label class="label">Ingrese Nombre del Producto</label>
               <input type="text" v-if="name == '' " class="input is-medium" v-model="name" placeholder="Ingrese Producto"><br>
                </div>
            <div class="control">
                 <label class="label">Ingrese el Precio $</label>
                <input type='number'  class="input is-medium" v-model="price" placeholder='ingrese el valor $'><br>
             </div>
            <div class="control">
                <label class="label">Adjunte el url de la Imagen del Producto</label>
                <input type="text"  class="input is-medium" v-model="picture" placeholder="Ingrese foto del Producto"><br> 
            </div>  
             <div class="control"> 
                <button class="button is-primary" @click="createProducts"> Añadir</button>
                <button class="button is-primary" v-if="edit" @click="updateProduct(id)">Actualizar</button>
             </div>    
          </div>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nombre del Producto</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                    <th colspan="2" class="action">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in computedProductList" :key="p.id">
                 <td>{{ p.id }}</td>
                 <td>{{ p.data.name }}</td>
                 <td>{{ p.data.price }}</td>
                 <td> {{ p.data.picture.substring(0,50) }}</td>
                 <td>
              <button class="button btn-success" @click="editProduct(p.id)">Editar</button>
              </td>
              <td>
                  <button class="button btn-danger" @click="deleteProduct(p.id)">Borrar</button>
                  <span class="icon has-text-danger">
                     <i class="fas fa-ban"></i>
                     </span>
              </td>
              </tr>
            </tbody>   
        </table>
  
 </div>    
</template>
<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
    data (){
        return{
            name:'',
            picture: '',
            price: '',
            id: undefined
        }
    },
    methods:{
         ...mapActions(['updateEdit']),
        createProducts(){
            let send = {
                name: this.name,
                picture: this.picture,
                price: this.price,     
            }
            axios.post('https://us-central1-tdddg3.cloudfunctions.net/products/product',send,
            {headers:{'content-type':'application/json'}})
             .then(() =>{
                this.name = ''
                this.picture = ''
                this.price = ''
                this.$store.dispatch('getProducts')
            })
            .catch((error) =>{
                console.log(error);
            });
         },
        deleteProduct(id){
            let confirmation = confirm("Estaiii seguroo??")       
            if(confirmation){
                axios.delete(`https://us-central1-tdddg3.cloudfunctions.net/products/product/${id}`,
                 {headers:{'content-type':'application/json'}}) 
                 .then(() =>{
                     alert('Producto Eliminado Exitosamente')
                   this.$store.dispatch('getProducts')  
                 })
            }
        },
        editProduct(id){
           this.updateEdit()
           this.findProduct(id)    
        },
        //solo es para apretar el botón
        findProduct(id){
             axios.get(`https://us-central1-tdddg3.cloudfunctions.net/products/product/${id}`,
                 {headers:{'content-type':'application/json'}}) 
            .then((response) =>{
                this.name = response.data.name
                this.picture = response.data.picture
                this.price = response.data.price
                this.id = id 
            })
        },
        updateProduct(id){
            let send = {
                name: this.name,
                picture: this.picture,
                price: this.price
            }
            console.log (send)
            axios.put(`https://us-central1-tdddg3.cloudfunctions.net/products/product/${id}`,send,
            {headers:{'content-type':'application/json'}})
            .then(() =>{
                this.name = ''
                this.picture = ''
                this.price = ''
                this.$store.dispatch('getProducts')
            })
            .catch((error) =>{
                console.log(error);
            });
        }
    },
    computed:{
     ...mapState(['products', 'edit']),
      computedProductList(){
        return this.products
        },    
    },
    mounted(){
        this.$store.dispatch('getProducts')
    },
}
</script>
<style scoped>
.conta{
    margin-top: 5em;
}
.container{
	min-width:320px;
	width:64%;
	max-width:40em;
	margin:10vh auto;
    background-color: white;
    
}
input{
    margin-bottom: 1em;
}
h1{
    color: #00d1b2,
}
</style>