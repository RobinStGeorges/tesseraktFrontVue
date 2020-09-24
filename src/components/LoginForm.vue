<template>
  <div class='page'>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="login">
                    <h1 class="h3 mb-3 font-weight-normal">Rentrez vos identifiants</h1>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" v-model="email" class="form-control" name="email" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                    </div>
                    <button class="btn btn-lg btn-primary btn-block">Se connecter</button>
                </form>
            </div>
        </div>
        <br>
        <button @click="register" class="btn btn-lg btn-primary btn-block">S'inscrire</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
export default {
  name: 'loginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register(){
      this.$router.push({ name: 'register' });
    },
    login () {
      axios.post('http://' + window.location.host + ':5000/users/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        localStorage.setItem('usertoken', this.email)
        this.$userMail = this.email
        this.email = ''
        this.password = ''
        router.push({ name: 'cours' })
      }).catch((err) => {
        console.log(err)
      })
      this.emitMethod()
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
<style scoped>
.page{
  background-image: url('../assets/images/background.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.9;
  border-color: #BFAB25;
  border-width : 2px ;
  border-style: solid;
  text-align: center;
  padding: 0 15%;
}
h1, h2, h3 {
  font-family: 'Abril Fatface', cursive;
}
p {
  font-family: 'Lato', sans-serif;
  line-height: 27px;
  font-size: 127%;
}
.intro{
  text-align: center;
  margin-bottom: 12%;
}
P{
  text-align: center;
  font-family: Roboto, sans-serif;
}
.cours {
  border : 2px solid #32908f;
  padding : 5%;
  margin-bottom: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
img {
  width: 75%;
}
.col-6:hover{
  transform: scale(1.15, 1.15);
}
</style>