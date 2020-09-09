<template>
    <div class="page">
        <div class="titre">
            Connectez-vous !
        </div>
        <form @submit.prevent="submit()">
            <input type="email" v-model="email" />
            <input type="password" v-model="password" />
            <button type="submit">Log in</button>
        </form>
    </div>
</template>
<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    submit() {
      this.$emit("submit", {
        email: this.email,
        password: this.password
      });
    }
  }
};
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