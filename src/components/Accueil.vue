<template>
<div class="page">
  <div class="intro">
    <h1> Vous avez le pouvoir</h1>
    <h2> D'apprendre de nouvelles choses aujourd'hui </h2>
  </div>
  <div class="row cours">
    <div class="col-6">
      <h3>Apprendre</h3>
      <router-link to="/cours">
        <img  src="../assets/images/school.png" alt="bulb" class="imgChoice" id="cours" />
      </router-link>
    </div>
    <div class="col-6">
      <h3>Exercer</h3>
      <router-link to="/exercices">
        <img  src="../assets/images/configure.png" alt="bulb" class="imgChoice" id="exercices" />
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
export default {
  mounted(){
    //Check if login first
    if(localStorage.usertoken == ''){
      this.$router.push({ name: 'loginForm' });
    }
  },
  name: 'accueil',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
