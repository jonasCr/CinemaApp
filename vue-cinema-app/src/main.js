import Vue from 'vue'
import App from '@/App.vue'

//Vue-resource: Para hacer peticiones HTTP
import VueResource from 'vue-resource';
Vue.use(VueResource);
//Establecer la ruta base de cada peticiones:
Vue.http.options.root = 'http://127.0.0.1:3333/api/v1/'
//Para enviar el token
Vue.http.interceptors.push((request, next)=>{
  //Añade en todas las peticiones http, une header con el token que hemos almacenado en el localStorage.
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`)
  next()
})
//.Vue-resource

//vuex: Para acceder a nuestra tienda
import Vuex from 'vuex';
Vue.use(Vuex);
//.vuex

//blockui: Para bloquear la pantalla si estamos processando algo
import BlockUI from 'blockui';
Vue.use(BlockUI);
//.blockui

//modulos y typos
import globalTypes from '@/types/global'
//.modulos y typos

//vee-validate: Para validar de manera sencilla formularios
import VeeValidate, {Validator} from 'vee-validate';
Vue.use(VeeValidate);
//.vee-validate

//vue-tables-2: Para crear y menejar tablas
import {ClientTable} from 'vue-tables-2';
//Le pasamos un objeto vacio para poder meter parametros
//El segundo parametro es para decir si queremos usar vue o no (false)
//El tercero es para decir si queremos usar algun framework
//El ultimo define que tema queremos
Vue.use(ClientTable, {}, false, 'bootstrap4', 'default')
//.vue-tables-2

//almacén global de datos con vuex
export const store = new Vuex.Store({
  state : {

  },
  actions:{

  },
  getters: {

  },
  mutations: {

  },
  modules: {

  }
})
//.almacén global de datos con vuex

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
