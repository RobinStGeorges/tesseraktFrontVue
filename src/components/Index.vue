<template>
  <div class="page">
  <br>
  <img width="60" height="40" src="../assets/images/logo.png" alt="logoTesserakt"/>
  <h1>
    Bienvenue sur Tesserakt !
  </h1>
  <div v-if="isConnected == ''">
    <router-link to="/login">
      <u>Vous pouvez commencer par vous <b>connecter</b></u>
    </router-link>
  </div>
  <div class="">
    <div class="content">
      <h2>Qu'est-ce-que Tesserakt ?</h2>
      <p class="bording">Tesserakt est un produit permettant l'apprentissage des notions basiques et avancées de l'informatique dès le plus
        jeune âge, en permettant une approche physique avec les éléments de code par le biais de cubes à moduler. </p>
    </div>
  </div>
  <div class="">
    <div class="content">
      <h2>Comment se procurer un kit Tesserakt ?</h2>
      <p class="bording">Le projet étant en phase de lancement, nous vous invitons à prendre contact avec nous à l'adresse Tesserakt.contact@gmail.com. <br> kit Tesserakt contient un cube "Master" réglé selon vos paramètres de connexions, 5 cubes "Commandes" ainsi que l'accès à nos cours et à nos exercices</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  mounted(){
    this.isConnected = localStorage.usertoken;
  },
  name: 'Index',
  data () {
    return {
      isConnected: ''
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
a{
  color: #2D3142;
}
h1, h2 {
  font-family: 'Abril Fatface', cursive;
}
p {
  font-family: 'Lato', sans-serif;
  line-height: 27px;
  font-size: 127%;
}
.bording{
  border: 1px darkgray solid;
  padding: 2%;
  margin-bottom: 120px;
}
.content{
  text-align: left;
  margin: 2%;
}
.carousel{
  margin: 10%;
  padding: 10%;
}
img{
  height: 30px;
  height: auto;
}
</style>
