import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//components
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Cinemas from '@/components/Cinemas/Cinemas'
import Movies from '@/components/Movies/Movies'
//.components

//types
import authTypes from '@/types/auth';
import globalTypes from '@/types/global'
//.types

//global store
import {store} from '@/main';
//.global store

//configurar el router
const router = new Router ({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        Auth: false,
        title: 'Iniciar sesión'
      },
      //Antes de entrar en la ruta, hacemos una verificación:
      beforeEnter: (to, from, next) => {
        //si ya esta loggeado, enviamos el usuario en la pagina de incio
        if (store.state.authModule.logged) {
          next({path: '/'});
          //Si no esta loggeado, le dejamos entrar y no hacemos nada
        } else {
          next();

        }
      }

    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        Auth: false,
        title: 'Registrarme'
      },
      //Antes de entrar en la ruta, hacemos una verificación:
      beforeEnter: (to, from, next) => {
        //si ya esta loggeado, enviamos el usuario en la pagina de incio
        if (store.state.authModule.logged) {
          next({path: '/'});
          //Si no esta loggeado, le dejamos entrar y no hacemos nada
        } else {
          next();

        }
      }
    },
    {
      path: '/',
      name: 'cinemas',
      component: Cinemas,
      meta: {
        Auth: false,
        title: 'Cinemas'
      },
    },
    {
      path: '/cinema/:id',
      name: 'cinema',
      component: Movies,
      meta:{
        Auth: false,
        title: "Listado de pelicula"
      }
    }
  ]
});
//.configurar el router

//para cada cambio de ruta
router.beforeEach((to, from, next)=> {
  document.title = to.meta.title;
  if(to.meta.Auth && !store.state.authModule.logged) {
    next({path: '/login'})
  } else{
      if(store.state.authModule.logged){
        //Si esta logeado, le asignamos un user
        //l.98: modules/auth.js
        store.commit(authTypes.mutations.setUser)
      }
    next();
  }
})
//.para cada cambio de ruta

export default router;
