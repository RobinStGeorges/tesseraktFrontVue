<template>
<div class="page">
  <div class="intro">
    Bienvenue utilisateur {{ user[0][0] }}  {{ user[0][1] }} ! 
  </div>
  <div class="row infos">
    <div class="col-5 shadowed">
      <fieldset>
        <legend>Informations</legend>
        <div class='informations'>
          <b>Prénom</b> : {{ user[0][0]}}<br>
          <b>Nom</b> : {{ user[0][1] }}<br>
          <b>Mail</b> : {{ userMail }}<br>
          <b>Date d'inscription</b> : {{ user[0][2] | formatDate}}<br>
        </div>
      </fieldset>
    </div>
    <div class="col-2"></div>
    <div class="col-5 shadowed">
      <b>Exercices commencés</b> : <br>
        <div v-for="exo in this.isStartedData" :key="exo">
          {{ exo[0] }} - {{ exo[1] }} <br>
        </div>
      <br>
      <b>Exercice Fini</b> : <br>
        <div v-for="exo in this.isFinishedData" :key="exo">
          {{ exo[0] }} - {{ exo[1] }} <br>
        </div>
      <br>
      <b>Temps moyen de validation</b> : {{ dateAvg }} heures <br>
      <br>
    </div>
  </div>
  <div class="row graph">
    <div class="col-2"></div>
    <div class="col-8">
      <center>
        <div class="shadowed">
          <line-chart :data="chartData"></line-chart>
        </div>
      </center>
    </div>
    <div class="col-2"></div>
  </div>
  <br>
  <br>
</div>
</template>
<script>
export default {
  mounted(){
    this.userMail = localStorage.usertoken
    if(this.userMail == '' || this.userMail == undefined){
      this.$router.push({ name: 'loginForm' });
    }
    this.$axios
      .post('http://' + this.$ipAdresse + ':5000/getUserDataByMail/' + this.userMail)
      .then(response => {
        this.userData = response.data
        this.userData.forEach(element => {
        });
        }
      )
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/getUserByMail/' + this.userMail)
      .then(response => {
        this.user = response.data
        })
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/getUserDataStarted/' + this.userMail)
      .then(response => {
        this.isStartedData = response.data
        })
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/getUserDataFinished/' + this.userMail)
      .then(response => {
        this.isFinishedData = response.data
      })
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/exercices')
      .then(response => (this.exercices = response.data))
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/getDateDif/' + this.userMail)
      .then(response => {
        this.arrayDateDif = response.data
        var acc = 0; var accTime = 0;
        this.arrayDateDif.forEach( (elem) => {
          elem.forEach( (date) => {
            acc = acc + 1;
            var dateStart = new Date(elem[0]); var dateEnd = new Date(elem[1])
            var difference = dateEnd - dateStart; 
            var hours = (difference / (1000 * 60 * 60)).toFixed(1);
            this.chartData['' + elem[2]] = Math.floor(parseFloat(hours));
            this.redrawChart();
            accTime = accTime + parseFloat(hours);
          })
        })
        this.dateAvg = accTime / acc;
      })
  },
  methods: {
    getNameExoById(id){
      this.exercices.forEach( (exo) => {
        if('' + exo[0] == '' + id){
          return (exo[1]);
        }
      })
    },
    redrawChart() {
    new Chartkick.LineChart(
          "chart-1",
          this.chartData,
          {stacked: true}
        )
    }
  },
  name: 'profil',
  data () {
    return {
      userMail: '',
      userData: null,
      user: null,
      isStartedData: null,
      isFinishedData: null,
      exo: null,
      dateAvg: null,
      exercices: null,
      arrayDateDif: null,
      chartData: {}
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
  margin-bottom: 5%;
  font-size: 250%;
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
.informations{
  text-align: left;
}
.shadowed{
  box-shadow: 10px 10px 10px 10px grey;
}
.side:hover{
  transform: scale(1.30, 1.30);
}
.infos{
  margin-bottom: 5%;
}
.graph{
  margin-top: 5%;
}
</style>
