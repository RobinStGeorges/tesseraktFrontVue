<template>
    <div class='page'>
        <div class="container">
            <div class="row">
                <div class="col-md-6 mt-5 mx-auto">
                    <form v-on:submit.prevent="register">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                    <div class="form-group">
                        <label for="first_name">First Name</label>
                        <input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="Enter First Name">
                    </div>
                    <div class="form-group">
                        <label for="last_name">Last Name</label>
                        <input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Enter Last Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" v-model="email" class="form-control" name="email" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                    </div>
                    <button class="btn btn-lg btn-primary btn-block">Register</button>
                    </form>
                </div>
            </div>
            <br>
            <button @click="goToLogin" class="btn btn-lg btn-primary btn-block">Se connecter</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    name: 'register',       
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },

  methods: {
    goToLogin(){
      this.$router.push({ name: 'loginForm' });
    },
    register () {
      axios.post('http://127.0.0.1:5000/users/register', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }).then((res) => {
        console.log(res)
        router.push({ name: 'loginForm' })
      }).catch((err) => {
        console.log(err)
      })
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
