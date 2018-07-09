import types from '@/types/movie';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
  cinemaInfo: {},
  genres:[],
  query: {
    search: '',
    rows: null,
    seats: null,
    hours: null,
    genre: null
  }
};

const actions = {
  //LLamamos a la api y llamos a las mutations de este modulo
  [types.actions.fetchMovies] : ({commit}, cinemaId) => {
    commit(globalTypes.mutations.startProcessing);
    Vue.http.get(`movies/${cinemaId}/byCinema`).then(movies => {
      commit(types.mutations.receivedMovies, {apiResponse: movies});
      commit(globalTypes.mutations.stopProcessing);
    })
  },
  [types.actions.fetchGenres] : ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
    Vue.http.get('genres').then(genres => {
      commit(types.mutations.receivedGenres, {apiResponse: genres});
      commit(globalTypes.mutations.stopProcessing);
    })
}

};

const getters = {
  [types.getters.movies]: (state) => {
    let movies = state.cinemaInfo.movie_showings;
    if(state.query.search) {
      movies.filter(movie => movie.movie.movie_name.toLowerCase().includes(state.query.search));
    }

    if(state.query.rows) {
      movies = movies.filter(movie => movie.room.room_rows >= state.query.rows)
    }

    if(state.query.seats){
      movies = movies.filter(movie => movie.room.room_seats >= state.query.seats)
    }

    if(state.query.genre){
      movies = movie.filter(movie => movie.movie.genres.some(genre.pivot.genre_id === state.query.genre))
    }

    if(state.query.hour) {
      movies = movies.filter(movie => movie.movie_showing_time.some(movie_showing_time => {
        const arrayHour = movie_showing_time.hour_to_show.split(':');
        return parseInt(arrayHour[0]) === state.query.hour;
      }))
    }

    return movies;

  },
  //Devolver el valor de cada variable.
  [types.getters.search] : state => state.search,
  [types.getters.rows] : state => state.rows,
  [types.getters.seats] : state => state.seats,
  [types.getters.genres] : state => state.genres,
  [types.getters.genre] : state => state.genre,
  [types.getters.hour] : state => state.hour,

};

const mutations = {
  //Asignamos los valor recibido de la api a state.**
  [types.mutations.receivedMovies] :(state, {apiResponse}) => {
    state.cinemaInfo = apiResponse.data;
  },

  [types.mutations.receivedGenres] :(state, {apiResponse}) => {
    state.genres = apiResponse.data
  },

  [types.mutations.setSearch] :(state, query) => {
    state.query.search = query;
  },
  [types.mutations.setRow] :(state, query) => {
    state.query.rows = query;
  },
  [types.mutations.setHour] :(state, query) => {
    state.query.hours = query;
  },
  [types.mutations.setGenre] :(state, query) => {
    state.query.genres = query;
  },
  [types.mutations.clearFilters] : (state) => {
    state.query = {
      search: '',
      rows: null,
      seats: null,
      hours: null,
      genre: null
    }
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}
