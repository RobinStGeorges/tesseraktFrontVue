/* eslint-disable */
<template>
<div class="page">
  <div class='row'>
    
    <div class='col-4'>
      <a class="btn btn-primary pull-center" v-on:click="goto" role="button">↵ Retour</a>
      </div>
    <div class='col-4'></div>
    <div class='col-4'>
      Avant de
      <button type="button" class="btn btn-dark" data-dismiss="modal" @click="showModal = true">
      commencer l'exercice
      </button>
    </div>
  </div>
  
  <br>

  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel2">Avant de
                  <button type="button" class="btn btn-dark" data-dismiss="modal" @click="showModal = false">
                  commencer l'exercice
                  </button>
                </h4>
              </div>
              <div class="modal-body">
                <p> Pour cette exercice, vous aurez besoin de {{nbCube}} cubes.</p>
                <p>Les cubes connectés actuellement :</p>
                <!-- Form starts -->
                <form id="cubeIdToAction" @submit="onSubmit()">
                  <div v-for="userItem in userResponseValue" :key=userItem>
                    <div class="row">
                      <div class="col-6">
                        {{ userItem }}
                      </div>
                      <div  class="col-6">
                        <select class="select"  @name=" userItem ">
                          <option v-for="cubeItem in cubeNeeded" :key="cubeItem" @id="cubeItem">{{ cubeItem }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- Submit Button -->
                  <div class="row">
                    <button @click="refreshCubeData()" class="btn btn-warning btn-lg btn-block">Recharger</button>
                  </div>
                  <div class="row">
                    <button type="submit" class="btn btn-danger btn-lg btn-block">Valider les cubes</button>
                  </div>
                </form>
                <!-- Form ends -->
              </div>
              <div class="modal-footer">
                <p>
                  <u>
                  Afin de les parametrer, connectez les un par un au cube master, afin de leur associer la valeur correspondante
                  </u>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
      </div>

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
          <button  type="button" class="btn btn-primary">Comparer la réponse avec les cubes</button>
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
      <div class="row">
    <div class="col-4"></div>
    <div class="col-4">
          <button v-on:click="checkWithCubes" type="button" class="btn btn-primary">Comparer la réponse avec les cubes virtuels</button>
    </div>
    <div class="col-4"></div>
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
                   <td class="cube vide" v-bind:id="idGrid" :ref="idGrid">
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
      <br>
      <div class="row">
        <div class="col-3">
        </div>
        <div class="col-6 table-content">
          <p>
            Pas de cubes ? Tentez de résoudre l'exercice ici avant de regarder la réponse !
          </p>
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
                   <td v-on:click="manageClass($event)" class="cube vide" v-bind:id="idGridVirtual" :ref="idGridVirtual">
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
    <br>
    
</div>
</template>
<script>
export default {
  data () {
    return {
      acc: 0,
      id: 0,
      exercice: [],
      showModalData: false,
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
      y: 0,
      showCubeDisplay: false,
      xStart: 2,
      yStart: 2,
      mapUserResponse: [],
      mapCubeToId: [],
      newCarState: 'UP',
      actualCoord: '',
      showModal: false,
      nbCube: 0,
      resultatForm: ''
    }
  },
  mounted() {
    //Check if login first
    if(localStorage.usertoken == ''){
      this.$router.push({ name: 'loginForm' });
    }
    this.id = this.$route.params.id
    const t = this;
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/getExercice/' + this.id)
      .then(response => {
        t.exercice = (response.data)[0];
        t.objectCubes = t.exercice[8]
        t.xCarMatrix = t.exercice[13]
        t.yCarMatrix = t.exercice[14]
        t.coordFinish = t.exercice[15]
        t.xStart = t.exercice[16]
        t.yStart = t.exercice[17]
        const arrayCubeNeeded = t.objectCubes.split('"');
        const arrayCubeNeededFiltered = {}
        for(let i = 1; i<arrayCubeNeeded.length; i += 4){
          arrayCubeNeededFiltered[arrayCubeNeeded[i]] = arrayCubeNeeded[i+2]
        }
        this.cubeNeeded = arrayCubeNeededFiltered
        this.nbCube = Math.floor(arrayCubeNeeded.length/4)
      })
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/getUserResponse')
      .then((response) => {
        const userResponse = response.data
        this.mapUserResponse = [];
        this.userResponseValue = [];
        for (let i = 0; i < userResponse.length; i++){
          this.mapUserResponse[userResponse[i][3] + '' + userResponse[i][4]] = userResponse[i][2];
          this.userResponseValue[i] = (userResponse[i][2]);
        }
      });
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/getCubesValuesAll')
      .then((response) => {
        const responseData = response['data']
        for (let i = 0; i < responseData.length; i++){
          this.mapCubeToId[responseData[i][0]] = responseData[i][1];
        }
      });
  },
  methods: {
    onSubmit(){
      this.resultatForm = '';
      const form = document.getElementById('cubeIdToAction');
      const formElements = form.getElementsByClassName('select');
      for (const item of formElements) {
        this.resultatForm = this.resultatForm + ';' + item.name + ';' + item.value;
      }
      this.setCubeValue();
      this.getUserResponse();
      this.getCubeToIdMap();
    },
    setCubeValue(){
      this.$axios
      .post('http://' + this.$ipAdresse + ':5000/setCubesValues/' + this.resultatForm)
      .then((response) => {
        console.log('RESPONSE')
        console.log(response)
        if (response['status'] != 200){
          alert('recommencez, le reseau a du mal !');
        }
        else {
          alert('C\'est bon, c\'est passé ! Vous pouvez commencer l\'exercice !');
        }
      });
    },
    getUserResponse(){

    },
    getUserResponse(){

    },
    getCubeToIdMap(){

    },
    setShowCubeDisplay: function(){
      this.showCubeDisplay = this.showCubeDisplay !== true;
    },
    async initGridExo(){
      const divById = document.getElementById('virt' + this.xStart + this.yStart);
      divById.classList.add('hasCarUP');
      await this.delay(500);
    },
    initVirtMatrixStartFinish(){
      const divById = document.getElementById('virt' + this.xStart + this.yStart);
      divById.classList.remove('vide');
      divById.classList.add('start');
      const divFinished = document.getElementById('virt' + this.coordFinish);
      divFinished.classList.remove('vide');
      divFinished.classList.add('finish');
    },
    getValueFromId(id){
      return this.cubeNeeded[id];
    },
    async delay(ms) {
      await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
    },
    async manageForward(x, y, oldX, oldY){
    const oldDivById = document.getElementById('virt' + oldX + oldY);
    oldDivById.classList.remove('hasCarUP', 'hasCarDOWN', 'hasCarLEFT', 'hasCarRIGHT');
    for (let i = 0; i < this.xCarMatrix; i++) {
      for (let j = 0; j < this.yCarMatrix; j++) {
        const divById = document.getElementById('virt' + x + y);
        if (i === x && j === y) {
          // si c'est la bonne pos, ajouter le dernier etat'
          divById.classList.remove('hasCarUP', 'hasCarDOWN', 'hasCarLEFT', 'hasCarRIGHT');
          if (this.newCarState === 'UP') {
            divById.classList.add('hasCarUP');
            await this.delay(1000);
          } else if (this.newCarState === 'DOWN') {
            divById.classList.add('hasCarDOWN');
            await this.delay(1000);
          } else if (this.newCarState === 'LEFT') {
            divById.classList.add('hasCarLEFT');
            await this.delay(1000);
          } else {
            divById.classList.add('hasCarRIGHT');
            await this.delay(1000);
          }
        }
        // si ce n'est pas la bonne pos, retirer les class car'
        else {
          divById.classList.remove('hasCarUP', 'hasCarDOWN', 'hasCarLEFT', 'hasCarRIGHT');
        }
      }
    }
    },
    forward(){
    switch (this.newCarState) {
      case 'UP':
        if (this.yStart - 1 < 0){
          this.isDone = false;
          return false;
        }
        else {
          this.manageForward(this.xStart, this. yStart - 1, this.xStart, this.yStart);
          this.yStart = this. yStart - 1;
          this.actualCoord = 'virt' + this.xStart + '' + this.yStart;
        }
        break;

      case 'DOWN':
        if (this.yStart + 1 > this.yCarMatrix){
          this.isDone = false;
          return false;
        }
        else {
          this.manageForward(this.xStart, this. yStart + 1, this.xStart, this.yStart);
          this.yStart = this.yStart + 1;
          this.actualCoord = 'virt' + this.xStart + '' + this.yStart;
        }
        break;

      case 'LEFT':
        if (this.xStart - 1 < 0){
          this.isDone = false;
          return false;
        }
        else{
          this.manageForward(this.xStart - 1, this. yStart, this.xStart , this. yStart);
          this.xStart = this.xStart - 1;
          this.actualCoord = 'virt' + this.xStart + '' + this.yStart;
        }
        break;

      case 'RIGHT':
        if (this.xStart + 1 > this.xCarMatrix){
          this.isDone = false;
          return false;
        }
        else{
          this.manageForward(this.xStart + 1, this. yStart, this.xStart , this. yStart);
          this.xStart = this.xStart + 1;
          this.actualCoord = 'virt' + this.xStart + '' + this.yStart;
        }
        break;
    }

    return true;
    },
    async manageCubesAlgo(){
      setTimeout(async function () {
        const sizeMap = this.mapUserResponse.size;
        let x = 0;
        let y = 0;
        this.isDone = false;
        const isWon = false;
        let action = '';
        this.actualCoord = '';
        while (!this.isDone) {
          
        // regarde s'il y a une instruction'
        let indexVar = '' + x + y
      if (this.mapUserResponse[indexVar] != undefined) {
      //   // faire l'association id vers valeur'
      //   // AVANCER
      console.log('indexVar : ' + indexVar)
      console.log('mapuserresponse')
      console.log(this.mapUserResponse)
      console.log('mapCubetoId : ')
      console.log(this.mapCubeToId)
        if (this.mapCubeToId[Number(this.mapUserResponse['' + x + y])-1] === 'AVANCER') { // AVANCER
        console.log('avancer')
          if (this.mapCubeToId[Number(this.mapUserResponse['' + x + (y + 1)])-1] === 'EGAL') { // EGAL
          console.log('egal')
            if (this.mapCubeToId[Number(this.mapUserResponse['' + x + (y + 2)])-1] === 'DEUX') {
              console.log("deux")
              for (let indexFor = 0; indexFor < 2; indexFor ++){
                await this.delay(1000);
                this.forward();
              }
            }
            else if (this.mapCubeToId[Number(this.mapUserResponse['' + x + (y + 2)])-1] === 'UN'){
              console.log("un")
              for (let indexFor = 0; indexFor < 1; indexFor ++){
                await this.delay(1000);
                this.forward();
              }
            }
            else if (this.mapCubeToId[Number(this.mapUserResponse['' + x + (y + 2)])-1] === 'TROIS'){
              console.log("trois")
              for (let indexFor = 0; indexFor < 3; indexFor ++){
                await this.delay(1000);
                this.forward();
              }
              // regarde si la voiture est sur les bonnes coordonnées
              if ('virt' + this.coordFinish === this.actualCoord) {
                alert('Vous avez réussi !');
                this.isWon = true;
                this.isDone = true;
                return true;
              }
            }
              // regarde si la voiture est sur les bonnes coordonnées
              if ('virt' + this.coordFinish === this.actualCoord) {
                alert('Vous avez réussi !');
                this.isWon = true;
                this.isDone = true;
                return true;
              }
          }
        }
        // TOURNER A GAUCHE
        if (this.mapCubeToId[Number(this.mapUserResponse['' + x + y])-1] === 'VIRAGEGAUCHE'){
          console.log('a gauche')
          this.manageVirageAGauche();
        }
      }
      // passe ligne suivante
      if (this.mapUserResponse['' + (x + 1) + y] != undefined) {
        x++;
        y = 0;
      } else {
        this.isDone = true;
      }

      await this.delay(1000);
    }
    if (this.isDone && !this.isWon) {
      alert('Ce n\'est pas la bonne réponse');
        }
      }.bind(this),0) // the `bind(this)` is important!

      
    },
    async manageVirageAGauche(){
      const divById = document.getElementById('virt' + this.xStart + this.yStart);
      switch (this.newCarState) {
        case 'UP':
          this.newCarState = 'LEFT';
          divById.classList.remove('hasCarUP');
          divById.classList.add('hasCarLEFT');
          await this.delay(1000);
          break;
        case 'DOWN':
          this.newCarState = 'RIGHT';
          divById.classList.remove('hasCarDOWN');
          divById.classList.add('hasCarRIGHT');
          await this.delay(1000);
          break;
        case 'LEFT':
          this.newCarState = 'DOWN';
          divById.classList.remove('hasCarLEFT');
          divById.classList.add('hasCarDOWN');
          await this.delay(1000);
          break;
        case 'RIGHT':
          this.newCarState = 'UP';
          divById.classList.remove('hasCarRIGHT');
          divById.classList.add('hasCarUP');
          await this.delay(1000);
          break;
      }
    },
    checkWithCubes: function() {
      this.setShowCubeDisplay();
      this.initGridExo();
      this.initVirtMatrixStartFinish();
      // this.getValueFromId(3);
      this.manageCubesAlgo();
    },
    changeImg: function(path) {
      this.imgUrl = require('@/assets/images/' + path)
      this.showExercice = !this.showExercice;
    },
    manageClass: function(event) {
      const coord = event.currentTarget.id;
      const divById = this.$refs[coord];
      if (divById[0]['classList'].contains('vide')){
        // REGARDE SI LA DIV EST INIT, SI NON INIT AVEC ARRAYCUBENEDEED[0]
        divById[0]['classList'].remove('vide');
        divById[0]['classList'].add(this.cubeNeeded[1]);
        divById[0]['innerText'] = this.cubeNeeded[1];
      }
      else{
        // MET LA CLASS +1 DANS LA LISTE DES CLASS NEEDED, SI OUT OF BOUND, 0
        const arraysize = this.classList.length;
        const indexClassInArray = this.classList.indexOf(divById[0]['classList'][1]);
        if (indexClassInArray + 1 > arraysize){
          divById[0]['classList'].remove(divById.classList[1]);
          divById[0]['classList'].add(this.classList[0]);
          divById.innerText = this.classList[0];
        }
      divById[0]['classList'].remove(divById[0]['classList'][1]);
      divById[0]['classList'].add(this.classList[indexClassInArray + 1]); 
      divById[0]['innerText'] = this.classList[indexClassInArray + 1];
      }
    },
    goto: function(){
      this.$router.push({ name: 'exercices' });
    },
    addClassToArray: function(className){
        this.classList.push(className);
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
  padding: 5%;
  margin-top: 0%;
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
.modal-title{
  text-align: center;
  margin: auto;
  
}
</style>
