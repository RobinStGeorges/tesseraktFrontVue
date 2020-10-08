<template>
<div class="page">
  <div class="row">
    <div class="col-xs-12 content-col">
      <h2>Vos cours</h2>
      <div class="list-group">
        <div class="list-group-item" v-for="item in cours['data']" :key="item">
          <h3 class="list-group-item-heading titre">
            <router-link :to="{ name: 'showCours', params: { id: item[0] }}">
              <p>
                <a>
                  {{ item[2] }}
                </a>
              </p>
            </router-link>
            <p class="description" >{{ item[3] }}</p>
          </h3>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cours',
  data () {
    return {
      acc: 0,
      cours: null,
      auth: '',
      user: ''
    }
  },
  mounted () {
    //Check if user is loggedIn,
    //if not, user is redirected to logIn
    if(localStorage.usertoken == ''){
      this.$router.push({ name: 'loginForm' });
    }
    //if he is, we get the cours datas from the api
    this.$axios
      .get('http://' + this.$ipAdresse + ':5000/cours')
      .then(response => (this.cours = response))
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
.list-group {
  margin-top: 5%;
}
.list-group-item{
  border : 2px solid #32908f;
  margin-bottom: 10%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.content-col{
  width: 100%;
  height: auto;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  border-color: #F5B82E;
}
.list-group-item:hover{
  transform: scale(1.15, 1.15);
}
h1, h2, h3 {
  font-family: 'Abril Fatface', cursive;
}
p {
  font-family: 'Lato', sans-serif;
  line-height: 27px;
  font-size: 127%;
}
.description{
  color: #383838;
  font-size: 14px;
}
.nobull {
  list-style-type: none;
 }
</style>
