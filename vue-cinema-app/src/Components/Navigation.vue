/*
  Simplemente la bara de navigation.
  La viste dependera de si estamos connectado o no;
*/
<template lang="html">
  <nav class="navbar navbar-default">
    <div class="container-fluid">

      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#nav-collapse"
          aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Vue.js</a>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/">
              {{$t('navigation.cinema')}}
            </router-link>
          </li>
          <li>
            <router-link v-if="isLogged" to="/profile">
              {{$t('navigation.my_account')}}
            </router-link>
          </li>
          <li>
            <router-link v-if="isLogged" to="/bookings">
              {{$t('navigation.bookings')}}
            </router-link>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link v-if="!isLogged" to="/login">
              {{$t('navigation.login')}}
            </router-link>
          </li>
          <li>
            <router-link v-if="!isLogged" to="/register">
              {{$t('navigation.register')}}
            </router-link>
          </li>
          <li v-if="isLogged">
            <a @click.prevent="logout" href="#">
              {{$t('navigation.logout')}}
            </a>
          </li>
        </ul>

      </div>

    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import authTypes from '../types/auth';
export default {
  name:'navigation',
  methods: {
    //Creamos un alias para las actiones
    ...mapActions({
      _logout: authTypes.actions.logout
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
      isLogged: authTypes.getters.logged
    })

  }
}
</script>

<style scoped lang="scss">
</style>
