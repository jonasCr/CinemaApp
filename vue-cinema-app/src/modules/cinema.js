import types from '../types/cinema';
import globalTypes from '../types/global';
import Vue from 'vue';

const state = {
  cinemas: [],
  query: {
    search: '',
    rooms: null,
    seats: null
  }
};

const actions = {
  [types.actions.fetchCinemas]: ({commit}) => {
    //Indiquemos que empezamos el processo para bloquear la pantalla
    commit(globalTypes.mutations.startProcessing);
    //llamamos a la funcion creada en la api con la url cinema
    Vue.http.get('cinemas').then(cinemas => {
      //Lamamos a la funcion creada en las mutation
      commit(types.mutations.receivedCinemas, {apiResponse: cinemas});
      commit(globalTypes.mutations.stopProcessing);

    })

  }
};

const getters = {
  //tener la busqueda
  [types.getters.search]: state => state.query.search,
  //tener la sala
  [types.getters.rooms]: state => state.query.rooms,
  //tener los asientos
  [types.getters.seats]: state => state.query.seats,
  //Tener los cinema en funcion de la busqueda:
  [types.getters.cinemas]: (state) => {
    //Vamos a almecenar los filtros no el la variable global sino en una variable a parte
    let cinemas = state.cinemas;

    //si el usuario hace una busqueda:
    if(state.query.search) {
      cinemas = cinemas.filter(cinema => cinema.cinema_name.toLowerCase().includes(state.query.search));
    }


    //si el usuario hace una busqueda por sala
    if (state.query.rooms){
      //filtramos para monstrar solo los cinema que tiene = o mas sala que los que indique el usuario
      cinemas = cinemas.filter(cinema => cinema.__meta__.number_of_rooms >= state.query.rooms);
    }

    //si el usuario hace una busqueda por asiento
    if (state.query.seats) {
      cinemas = cinemas.filter(cinema => cinema.cinema_seat_capacity >= state.query.seats);
    }
    return cinemas
  },
};

const mutations = {
  //Almacenar los cinemas dentro de la variable state
  [types.mutations.receivedCinemas]:(state, {apiResponse}) => {
    //alamcenamos
    state.cinemas = apiResponse.data;
  },
  //Almacenamos la busqueda dentro de la variable state
  [types.mutations.setSearch]:(state, query) => {
    state.query.search = query;
  },
  //Almacenamos la sala dentro de la variable state
  [types.mutations.setRooms]: (state, room) => {
    state.query.rooms = room
  },
  //Almacenamos el asiento dentro de la variable state
  [types.mutations.setSeats]: (state, seats) => {
    state.query.seats = seats;
  },
  //Resetear los filtros. Les ponemos al estado que estan al incio.
  [types.mutations.clearFilter]: (state) => {
    state.query = {
      search: '',
      rooms: null,
      seats: null
    }
  }
};


export default {
  state,
  actions,
  mutations,
  getters
}
