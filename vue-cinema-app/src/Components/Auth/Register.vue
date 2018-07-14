<template>
  <div class="register col-md-6 col-md-offset-3">
    <h1 class="text-center text-muted">{{$t('register.title')}}</h1>

    <div v-if="error" class="alert alert-danger">
      {{$t('register.error')}}
    </div>

    <hr>

    <div class="well">
      <form class="form-horizontal" autocomplete="false" @submit.prevent="validateBeforeSubmit">

        <div class="form-group">
          <label for="email" class="control-label col-sm-4">
            {{$t('register.email')}}
          </label>

          <div :class="{'has-error' : errors.has('email')}" class="col-md-8">
            <input
              class="form-control"
              type="text"
              id="email"
              name="email"
              v-model="email"
              v-validate="'required|email'"
              :placeholder="$t('register.email')"
              :class="{'has-error' : errors.has('email')}">
            <!--
              v-validate check si el correo es valido y si esta puesta
            -->
            <span v-if="errors.has('email')" class="text-danger">
              {{errors.first('email')}}
            </span>
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="control-label col-md-4">
            {{$t('register.password')}}
          </label>

          <div :class="{'has-error' : errors.has('password')}" class="col-md-8">
            <input
              autocomplete="off"
              ref="password"
              name="password"
              v-model="password"
              v-validate
              data-vv-rules="required|min:6"
              class="form-control"
              type="password"
              id="password"
              :placeholder="$t('register.password')"
              :class="{'has-error': errors.has('password')}"
            >
            <!--
            errors.has('password') se encuentra en el store y esta enviando por vee-validate

            {'has-error' : errors.has('password')} => si hay error, pon la clase has-error

            v-validate check si la contrasena tiene minimo 6 caracteres
            -->

            <span v-if="errors.has('password')" class="text-danger">
              {{errors.first('password')}}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="password_confirmation" class="control-label col-md-4">
            {{$t('register.password_confirmation')}}
          </label>


          <div :class="{'has-error' : errors.has('password_confirmation')}" class="col-md-8">
            <input
              type="password"
              v-model="password_confirmation"
              name="password_confirmation"
              class="form-control"
              id="password_confirmation"
              :placeholder="$t('register.password_confirmation')"
              v-validate="'required|confirmed:password'"
              :class="{'has-errors': errors.has('password_confirmation')}"
            >
            <!--
            errors.has('password') se encuentra en el store y esta enviando por vee-validate

            {'has-error' : errors.has('password')} => si hay error, pon la clase has-error

            v-validate check si la contrasena tiene minimo 6 caracteres y coresponde con la primera contrasena
            -->

            <span v-if="errors.has('password_confirmation')" class="text-danger">
              <!--El objecto de vee validate que nos permite acceder al error y a su traduction-->
              {{errors.first('password_confirmation')}}
            </span>
          </div>
        </div>




        <hr>
        <!--Desactivar si hay errores-->
        <button type="submit" class="btn btn-success btn-block">
          {{$t('register.title')}}
        </button>

      </form>
    </div>
  </div>
</template>

<script>
  import authTypes from '../../types/auth';
  import {mapActions} from 'vuex';
  export default {
    name: "register",
    data() {
      return {
        email: '',
        password: '',
        password_confirmation: '',
        error: false,
      }
    },
    methods: {
      ...mapActions({
        register: authTypes.actions.register
      }),
      validateBeforeSubmit(){
        debugger;
        this.$validator.validateAll()
          .then( result => {

            if(!result) {
              //Hay errores en el formulario
            } else {
              this.register({
                email: this.email,
                password: this.password
              })
                .then(resolve => {
                  this.$router.push('/login')
                  //TODO: login directamente si es possible
                }),
                error => {
                  this.error = true;
                  console.log('Error al enviar los datos:', error)
                }
            }
          })
          .catch(error => {
            console.log('Error de formulario:', error);
            this.error = true;
          })
      }
    }
  }
</script>

<style scoped>

</style>
