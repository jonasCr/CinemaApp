import types from '../types/auth';
import globalTypes from '../types/global';
import Vue from 'vue';

const state = {
  user: null,
  logged: !!window.localStorage.getItem('_token')
  // logged va a devolver true si existe y false si esta null o undefinded
};

const actions = {
  //Hacer el login
  [types.actions.login]:({commit}, userInput) => {
    //Indicamos que el processo empieza:
    commit(globalTypes.mutations.startProcessing);
    return new Promise ((resolve, reject)=> {
      //Hacemos una peticion post con las optiones que hemos pasados en main.js
      //La peticion la va hacer segun la API que hemos creado
      //            url       Que enviamos
      Vue.http.post('login',{user: userInput})
        .then(user => {
          //Guardo el token que me envia la API
          window.localStorage.setItem('_token', user.body.token);
          commit(types.mutations.setUser);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        })
        .finally(()=> {
          //Paramos el processo
          commit(globalTypes.mutations.stopProcessing);
        })
    })
  },

  //Registrarse en la application
  [types.actions.register]: ({commit}, userInput) => {
    //Indicamos que el processo empieza:
    commit(globalTypes.mutations.startProcessing);
    return new Promise ((resolve, reject)=> {
      //Igual que para el login...
      Vue.http.post('register', {user: userInput})
        .then(user => {
          resolve(user);
        })
        .catch(error => {
          reject(error);
        })
        .finally(()=> {
          commit(globalTypes.mutations.stopProcessing)
        })
    })
  },
  //Actualizar el perfil
  [types.actions.updateProfile]:({commit}, userInput) => {
    //Indicamos que el processo empieza:
    commit(globalTypes.mutations.startProcessing);
    return new Promise ((resolve, reject)=> {
      //Hacemos una peticion post con las optiones que hemos pasados en main.js
      //La peticion la va hacer segun la API que hemos creado
      //            url       lo que enviamos
      Vue.http.put('profile',{user: userInput})
        .then(user => {
          //Guardamos el token que me envia la API
          window.localStorage.setItem('_token', user.body.token);
          commit(types.mutations.setUser);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        })
        .finally(()=> {
          //Paramos el processo
          commit([globalTypes.mutations.stopProcessing]);
        })
    })
  },
  [types.actions.logout]: ({commit}) => {
    window.localStorage.removeItem('_token');
    commit(types.mutations.setUser)
  }
};

const getters = {
  //Obtener el usuario
  [types.getters.user]: (state) => {
    return state.user;
  },
  //Saber si esta logeado
  [types.getters.logged]: (state) => {
    return state.logged;
  }
};

const mutations = {
  //Establecer el user a traves del token jwt
  [types.mutations.setUser]: (state) => {
    //Verificamos si esta conectado o no
    if (window.localStorage.getItem('_token')) {
      //Si esta conectado:
      const token = window.localStorage.getItem('_token');
      const jwtDecode = require('jwt-decode');
      state.user = jwtDecode(token);
      state.logged = true;
    }else {
      //Si no esta conectado:
      state.logged = false;
      state.user = null
    }

  },
  //Establecer el estado (logged o no)
  [types.mutations.setLogged]: (state, logged) => {
    state.logged = logged
  }
};

export default {
  state,
  actions,
  getters,
  mutations
}
