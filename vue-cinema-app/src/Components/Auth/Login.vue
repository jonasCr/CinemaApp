<template lang="html">
  <div class="login col-md-6 col-md-offset-3">
    <h1 class="text-center text-muted">{{$t('login.title')}}</h1>

    <div v-if="error" class="alert alert-danger">
      {{$t('login.error')}}
    </div>

    <hr>

    <div class="well">
      <form class="form-horizontal" autocomplete="false" @submit.prevent="validateBeforeSubmit">

        <div class="form-group">
          <label for="email" class="control-label col-md-4">
            {{$t('login.email')}}
          </label>

          <div :class="{'has-error' : errors.has('email')}" class="col-md-8">
            <input
              class="form-control"
              type="text"
              name="email"
              id="email"
              value="email"
              v-model="email"
              v-validate="'required|email'"
              :placeholder="$t('login.email')"
              :class="{'has-error' : errors.has('email')}">
              <!--
                v-validate check si el correo es valido y si esta puesta
              -->
            <span v-if="errors.has('email')" class="text-danger">
              {{errors.first('email')}}
            </span>
          </div>
        </div>

        <br>

        <div class="form-group">
          <label for="password" class="control-label col-md-4">
            {{$t('login.password')}}
          </label>

          <div :class="{'has-error' : errors.has('password')}" class="col-md-8">
            <input
              class="form-control"
              type="password"
              id="password"
              name="password"
              value="password"
              v-model="password"
              v-validate="'required|min:6'"
              :placeholder="$t('login.password')"
              :class="{'has-error' : errors.has('password')}">
              <!--
              errors.has('password') se encuentra en el store y esta enviando por vee-validate

              {'has-error' : errors.has('password')} => si hay error, pon la clase has-error

              v-validate check si la contrasena tiene minimo 6 caracteres
              -->

            <span v-if="errors.has('password')" class="text-danger">
              {{errors.first('password')}}
            </span>
          </div>

          <hr>

          <button type="submit" class="btn btn-success btn-block">
            {{$t('login.title')}}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import authTypes from '@/types/auth'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    ...mapActions({
      login: authTypes.actions.login
    }),
    validateBeforeSubmit(){
      //Hacemos las validation con vee-validate
      this.$validator.validateAll()
        .then(result => {
          if(!result) {
            //fallan las validacion
          }else {
            //llamamos a la function para hacer el login
            // y le pasamos un objeto con el email y el password
            this.login({
              email: this.email,
              password: this.password,
            })
              .then(
                //si esta bien, enviamos al usuario al incio
                user => {
                  this.$router.push('/')
                },
                //Si hay error, pasamos la variable error a true
                // para enseñar el mensaje de error
                error => {
                  //TODO: Monstrar un mensaje en function del error
                  this.error = true;
                  console.log(error);
                }

              )
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
