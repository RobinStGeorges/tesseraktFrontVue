<template>
  <div class="navbar">
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/">
      <a class="navbar-brand" href="#">Tesserakt</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link to="/accueil">
            <li class="nav-item active">
              <a class="nav-link" href="/accueil">Menu <span class="sr-only">(current)</span></a>
            </li>
          </router-link>
          <router-link to="/cours">
            <li class="nav-item">
              <a class="nav-link" href="/cours">Cours</a>
            </li>
          </router-link>
          <router-link to="/exercices">
            <li class="nav-item">
              <a class="nav-link" href="/exercice">Exercices</a>
            </li>
          </router-link>
          <router-link to="/profil">
            <li class="nav-item">
              <a class="nav-link" href="/profil">Profil</a>
            </li>
          </router-link>
          <li class="nav-item">
            <a style="color: darkred" v-if="true" class="nav-link" @click="logout">Se déconnecter</a>
            <a  style="color: #9FE855" v-if="true == false" class="nav-link" @click="logout()">Se connecter</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- NAV BAR END-->

  </div>
</template>
<script>
import EventBus from './EventBus'
export default {
  name: 'nav_bar',
  data () {
    return {
    }
  },
  mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  },
  methods: {
    logout () {
      localStorage.usertoken = ''
      this.$router.push({ name: 'loginForm' });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
  display: inline-flex;
}
</style>
