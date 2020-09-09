/* eslint-disable */
<template>
<div class="page">
  <a class="btn btn-primary pull-left" v-on:click="goto" role="button">↵ Retour</a>
  <br>
  <br>
  <div class="row">
    <div class="col">
      <div class="titre">
          <h1>{{ this.cours[2] }}</h1>
      </div>
      <hr>
      <div class="contenu">
        <p class="list-group-item-text" v-html="cours[4]">{{cours[4]}}</p>
      </div>
    </div>
    <div class="col video">
      <iframe width="100%" height="250px" src="https://www.youtube.com/embed/tNH2JbcCCFU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
  <br>
  <a class="btn btn-warning" @click="showExerciceById(cours[1])"  role="button">Accéder à l'exercice</a>
</div>
</template>
<script>
export default {
  data () {
    return {
      cours: null,
      id: null
    }
  },
  mounted() {
    //Check if login first
    if(this.$userMail == ''){
      this.$router.push({ name: 'loginForm' });
    }
    this.id = this.$route.params.id
    this.$axios
      .get('http://127.0.0.1:5000/getCours/' + this.id)
      .then(response => {
        console.log('response')
        console.log(response)
        this.cours = response['data'][0]
        }
      )
  },
  methods: {
    showExerciceById(id){
      this.$router.push({ name: 'exercice', params: { id: this.id }});
    },
    goto: function(){
      this.$router.push({ name: 'cours' });
    },
  },
  name: 'showCours'
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
  padding: 5%;
  margin-top: 0%;
}

.titre{
  text-align: left;
  font-family: 'Lato ', sans-serif;
  margin: 3%;
}

.contenu{
  font-family: 'Lato', sans-serif;
  line-height: 27px;
  font-size: 127%;
}

.video{
  align-content: center;
  margin: 0%;
}

p{
  font-size: 20px;
}
</style>
