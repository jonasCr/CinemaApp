/*
  Simplement la bara de navigation.
  La viste dependera de si estamos connectado o no;
*/
<template lang="html">
  <nav class="navbar navbar-default">
    <a href="#" class="navbar-brand">Vue.js 2</a>
    <button class="navbar-toggle" data-toggle="collapse" data-target="#navbarNav" type="button" name="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collpase navbar-collapse" id="navbarNav">
      <div class="nav navbar-nav">
        <router-link to="/">
          {{$t('navigation.cinema')}}
        </router-link>
        <router-link v-if="logged" to="/profile">
          {{$t('navigation.my_account')}}
        </router-link>
        <router-link v-if="logged" to="/booking">
          {{$t('navigation.booking')}}
        </router-link>
      </div>

    </div>

    <div class="nav navbar-nav navbar-right">
      <router-link v-if="!logged" to="/login">
        {{$t('navigation.login')}}
      </router-link>
      <router-link v-if="!logged" to="/registrer">
        {{$t('navigation.registrer')}}
      </router-link>
      <a @click.prevent="logout()" v-if="logged" @ href="#">
        {{$t('navigation.logout')}}
      </a>
    </div>

  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name:'navigation',
  methods: {
    //Creamos un alias para las actiones
    ...mapActions({
      _logout: authTypes.actions.logout;
    }),
    //El metodo para delogarse
    logout(){
      //El action logout
      this._logout();
      //Levamos el usuario al componente de login
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    //Creamos alias para los getters
    ...mapGetters({
      islogged: authTypes.getters.logged;
    })

  }
}
</script>

<style scoped lang="scss">
</style>
