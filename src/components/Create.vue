<template>
  <div>
     <div class="container content box col">
       <h1 class="title">Agregar Productos</h1>
         <div class="field">  
           <span v-if="formHasErrors" class="has-text-danger">
                <i class="mdi mdi-alert"></i>
               Por favor, complete todos los campos
              </span>  
            <div class="control">
               <label class="label">Ingrese Nombre de la Planta</label>
               <input type="text" class="input is-medium" v-model="name" placeholder="Ingrese Producto"><br>
                </div>
            <div class="control">
                 <label class="label">Ingrese el Precio $</label>
                <input type='number'   class="input is-medium" v-model="price" placeholder='ingrese el valor $'><br>
             </div>
            <div class="control">
                <label class="label">Adjunte el url de la Imagen de la Planta</label>
                <input type="text"  class="input is-medium" v-model="picture" placeholder="Ingrese foto del Producto"><br> 
            </div>
            <div class="buttons">
                <button class="button is-success" @click="createProducts">Añadir</button>
                <button class="button is-primary" v-if="edit" @click="updateProduct(id)">Actualizar</button>  
            </div>    
          </div>
     </div>
        <table class="table is-striped container col">
            <thead>
                <tr>
                    <th>Id</th>
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
              <button class="button is-primary" @click="editProduct(p.id)">Editar</button>
              </td>
              <td>
                  <button class="button is-danger" @click="deleteProduct(p.id)">Borrar</button>
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
            id: undefined,
          formHasErrors: false
        }
    },
    methods:{
         ...mapActions(['updateEdit']),
        Valid(){
        if (this.name && this.price && this.picture) {
          this.formHasErrors = false
        return true;
          }
          this.formHasErrors = [];
          if (!this.name && !this.price && !this.picture) {
            this.formHasErrors
          }
        },
        createProducts(){
            let send = {
                name: this.name,
                picture: this.picture,
                price: this.price,     
            }
            if(this.Valid()){
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

            }
         },
        deleteProduct(id){
            let confirmation = confirm("Segurito Segurito quiere borrarlo??")       
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
.col{
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

</style>