<template>
  <div class="login">
    <div class="columns">
      <div class="column is-one-third"></div>
      <div class="column is-one-third">
        <div class="container content box card">
          <h1 class="is-centered">Login</h1>
            <form>
              <div class="field">
                <!-- Error -->
                <span v-if="formHasErrors" class="has-text-danger">
                  <i class="mdi mdi-alert"></i>
                  Usuario o Contraseña incorrectos, Intente nuevamente.
                </span>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input type="email" name="email" id="email" placeholder="Email"
                  v-model="credentials.email"
                  class="input">
                  <span class="icon is-small is-left">
                    <i class="mdi mdi-email"></i>
                  </span>
                </div>
              </div>
              <!-- Field password -->
              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control has-icons-left has-icons-right">
                  <input type="password" name="password" id="password" placeholder="*******"
                  v-model="credentials.password"
                  class="input">
                  <span class="icon is-small is-left">
                    <i class="mdi mdi-key"></i>
                  </span>
                </div>
              </div>
              <!-- field submit -->
              <div class="field">
                <button class="button is-primary is-pulled-right" @click="login">Acceder</button>
              </div>
              <div class="is-clearfix"></div>
            </form>
        </div>
      </div>
      <div class="column is-one-third"></div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase';
export default {
  name: '',
  props: {},
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      formHasErrors: false
    }
  },
  methods: {
    login(e) {
      //función que ayuda a no mandar el formulario a otra paguina. 
      e.preventDefault()
      this.formHasErrors = this.credentials.email === '' || this.credentials.password === ''
      if(!this.formHasErrors) {
        // try login
        Firebase.auth()
              .signInWithEmailAndPassword(
                this.credentials.email,
                this.credentials.password
              )
              .then(() => {
                let user = this.credentials.email
                this.$store.dispatch('updateUser', user)
                this.$router.push('/home')
        })
        .catch(() =>{
          alert('usuario no encontrado')
        })
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
  .login-container {
    padding: 2rem 1rem 0.5rem 1rem;
    margin-top: 70px;
    margin-bottom: auto;  
  }
  .login{
    min-height: 38em;
    background-image: url('../assets/bg.jpeg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color:#f5f6f8;
  }
  .card{
   margin-top: 8em;
   background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  }

  
</style>