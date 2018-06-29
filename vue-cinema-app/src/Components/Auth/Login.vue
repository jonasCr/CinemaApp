<template lang="html">
  <div class="login col-md-6 col-md-offset-3">
    <h1 class="text-center text-muted">{{$t('login.title')}}</h1>

    <div v-if="error" class="alert alert-danger">
      {{$t('login.error')}}
    </div>

    <hr>

    <div class="well">
      <form autocomplete="false" @submit.prevent="validateBeforeSubmit">

        <div class="form-group">
          <label for="email" class="control-label col-md-4">
            {{$t('login.email')}}
          </label>

          <div :class="{'has-error' : errors.has('email')}" class="col-md-8">
            <input
              class="form-control"
              type="text"
              name="email"
              value="email"
              v-model="email"
              v-validate="'required|email'"
              :placeholder="$t(login.email)"
              :class="{'has-error' : errors.has('email')}">
            <span v-if="errors.has('email')" class="text-danger">
              {{errors.first('email')}}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="control-label col-md-4">
            {{$t('login.password')}}
          </label>

          <div :class="{'has-error' : errors.has('password')}" class="col-md-8">
            <input
              class="form-control"
              type="password"
              name="password"
              value="password"
              v-model="password"
              v-validate="'required|min:6'"
              :placeholder="$t(login.email)"
              :class="{'has-error' : errors.has('password')}">
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
import {{mapActions}}
import authTypes from '@/types/auth'
export default
  name: 'login',
  data() {
    return {
      email: '';
      password: '',
      error: null
    }
  },
  methods: {
    ...mapActions({
      login: authTypes.actions.login
    }),
    validateBeforeSubmit(){
      this.$validator.validateAll()
        .then(result => {
          if(!result) {
            //fallan las validacion
          }else {
            this.login({
              email: this.password,
              password: this.password,
            })
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
