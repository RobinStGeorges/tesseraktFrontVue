/* eslint-disable */
<template>
<div class="page">
  <a class="btn btn-primary pull-left" v-on:click="goto" role="button">↵ Retour</a>
  <br>
      <div class="row">
        <div class="col-6">
          <div class="titre">
            <h1>{{ exercice[1] }}</h1>
          </div>
          <hr>
          <div class="contenu">
            <p class="list-group-item-text" v-html="exercice[3]"></p>
            <p> Vous aurez besoin de ces cubes :</p>
            <div v-for="(cube, index) in this.cubeNeeded" :key="`cube-${index}`">
              <div class="cubeValue">
                {{ cube }}
                {{ addClassToArray(cube) }}
                <!-- {{ filterArray() }} -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <img id="imgDiv" class="img" :src="imgUrl"/>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-4">
          <button v-on:click="checkWithCubes" type="button" class="btn btn-primary">Comparer la réponse avec les cubes</button>
        </div>
        <div v-if="showExercice" class="col-4">
          <button type="button" class="btn btn-success" v-on:click="changeImg(exercice[6])" >Voir l'exercice</button>
        </div>
        <div v-if="showExercice == false" class="col-4">
          <button type="button" class="btn btn-warning" v-on:click="changeImg(exercice[7])" >Voir la réponse</button>
        </div>
        <div class="col-4">
          <button v-on:click="setFinished(exercice[0])" type="button" class="btn btn-danger">Valider l'exercice</button>
        </div>
      </div>
      <br>
      <div class="row" id='cubeShow'>
        <div class="col-3"></div>
        <div class="col-6">
<!--          RESOLUTION VIA CUBE-->
          <table class="center ">
            <div v-for="item_y in arrayOne(exercice[14])" :key="item_y">
              <tr>
                 <span v-for="item_x in arrayOne(exercice[13])" :key="item_x">
                   {{ updateIdGrid() }}
                   <td class="cube vide" v-bind:id="idGrid" >
                   </td>
                   {{ addOneIX() }}
                 </span>
              </tr>
              {{ setIXTo0() }}
              {{ addOneIY() }}
            </div>
            {{ setIXTo0() }}
            {{ setIYTo0() }}
          </table>
        </div>
        <div class="col-3"></div>
      </div>
      <div class="row">
        <div class="col-3">
        </div>
        <div class="col-6 table-content">
          <p>
            Pas de cubes ? Tentez de résoudre l'exercice ici avant de regarder la réponse !
          </p>
<!--          RESOLUTION VIRTUELLE-->
<!--parcourt la taille de matrice de bdd, et creer un tableau selon cette taille-->
            <table class="center">
              <tr>
                <td>
                  <div class="masterCube">
                  </div>
                </td>
              </tr>
              <div v-for="item_y_virt in arrayOne(exercice[10])" :key="item_y_virt">
                <tr>
                 <span v-for="item_x_virt in arrayOne(exercice[9])" :key="item_x_virt">
                   {{ updateIdGridVirtual() }}
                   <td v-on:click="manageClass(idGridVirtual)" class="cube vide" v-bind:id="idGridVirtual">
                     {{ addOneIXVirtual() }}
                   </td>
                 </span>
                </tr>
                {{ addOneIYVirtual() }}
                {{ setIXTo0Virtual() }}
              </div>
              {{ setIYTo0Virtual() }}
              {{ setIXTo0Virtual() }}
            </table>
        </div>
        <div class="col-3">
      </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      acc: 0,
      id: 0,
      exercice: [],
      showModalData: true,
      xCarMatrix: '',
      yCarMatrix: '',
      coordFinish: '',
      loaded: false,
      object: null,
      cubeNeeded: [],
      classList: [],
      showExercice: true,
      imgUrl: require('@/assets/images/background.jpg'),
      iY: 0,
      iX: 0,
      idGrid: '',
      iYGrid: 0,
      iXGrid: 0,
      idGridVirtual: '',
      x: 0,
      y: 0
    }
  },
  mounted() {
    this.id = this.$route.params.id
    const t = this;
    this.$axios
      .get('http://127.0.0.1:5000/getExercice/' + this.id)
      .then(response => {
        t.exercice = (response.data)[0];
        t.objectCubes = t.exercice[8]
        t.xCarMatrix = t.exercice[13]
        t.yCarMatrix = t.exercice[14]
        t.coordFinish = t.exercice[15]
        const arrayCubeNeeded = t.objectCubes.split('"');
        const arrayCubeNeededFiltered = {}
        for(let i = 1; i<arrayCubeNeeded.length; i += 4){
          arrayCubeNeededFiltered[arrayCubeNeeded[i]] = arrayCubeNeeded[i+2]
        }
        this.cubeNeeded = arrayCubeNeededFiltered
      })
  },
  methods: {
    hideDeleteData: function () {
      
    },
    checkForm: function (e) {

    },
    refreshCubeData: function() {

    },
    checkWithCubes: function() {

    },
    changeImg: function(path) {
      this.imgUrl = require('@/assets/images/' + path)
      this.showExercice = !this.showExercice;
      console.log(this.imgUrl)
    },
    setFinished: function(id) {

    },
    manageClass: function(coord) {

    },
    goto: function(){
      this.$router.push({ name: 'exercices' });
    },
    addClassToArray: function(className){
      if(typeof this.classList[className] === 'undefined'){
        this.classList.slice().push(className);
      }
    
    },
    filterArray: function(){
      this.classList.slice().filter((item, index) => classList.indexOf(item) === index)
    },
    arrayOne(n) {
      return Array(n);
    },
    addOneIY: function(){
      this.iY += 1
    },
    addOneIX: function(){
      this.iX += 1
    },
    addOneIYVirtual: function(){
      this.iYGrid += 1
    },
    addOneIXVirtual: function(){
      this.iXGrid += 1
    },
    updateIdGrid: function(){
      this.idGrid ='virt' + this.iX + '' + this.iY
    },
    setIXTo0: function(){
      this.iX = 0
    },
    setIYTo0: function(){
      this.iY = 0
    },
    updateIdGridVirtual: function(){
      this.idGridVirtual ='' + this.iXGrid + '' + this.iYGrid
    },
    setIXTo0Virtual: function(){
      this.iXGrid = 0
    },
    setIYTo0Virtual: function(){
      this.iYGrid = 0
    }
  },
  name: 'exercice'
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
  padding: 15%;
  margin-top: 12%;
}
.titre{
  text-align: left;
  font-family: 'Abril Fatface', cursive;
  margin: 3%;
}
.contenu{
  font-family: 'Lato', sans-serif;
  line-height: 27px;
  font-size: 127%;
  text-align: left;
}
.video{
  align-content: center;
  margin: 3%;
}
p{
  font-size: 20px;
}
img{
  height: 400px;
  width: auto;
  border-radius: 20px;
  border: 3px solid #F5B82E;
}
.cubeValue{
  margin: 1%;
  width: 27%;
  border-color: #F5B82E;
  border-width : 2px ;
  border-style: solid;
  font-family: 'Lato', sans-serif;
  text-transform: capitalize;
}
.masterCube{
  height: 100px;
  width: 100px;
  background-color: #F5B82E;
}
.cube{
  height: 100px;
  width: 100px;
  border: #F5B82E;
  border-width : 2px ;
  border-style: solid;
  text-align: center;
  vertical-align: middle;
  color: #04080F;
  font-weight: bold;
  font-size: 20px;
}
.table-content{
  text-align: center;
  margin: 0 auto;
  width:100px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.vide{
  background-color: #456990;
  vertical-align: middle;
}
.finish{
  background-color: crimson;
  vertical-align: middle;
}
.start{
  background-color: #9FE855;
  vertical-align: middle;
}
.AVANCER{
  background-color: crimson;
  vertical-align: middle;
}
.EGAL{
  background-color: green;
  vertical-align: middle;
}
.TROIS{
  background-color: slateblue;
  vertical-align: middle;
}
.UN{
  background-color: lawngreen;
}
.DEUX{
  background-color: aquamarine;
}
.VIRAGEGAUCHE{
  background-color: antiquewhite;
}
.hasCarUP{
  background-image: url("../assets/images/car_top_up.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.hasCarDOWN{
  background-image: url("../assets/images/car_top_down.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.hasCarLEFT{
  background-image: url("../assets/images/car_top_left.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.hasCarRIGHT{
  background-image: url("../assets/images/car_top_right.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
