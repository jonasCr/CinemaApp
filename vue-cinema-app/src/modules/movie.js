import typeMovie from '@/types/movie';
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
  [typeMovie.actions.fetchMovies] : ({commit}, cinemaId) => {
    commit(globalTypes.mutations.startProcessing);
    Vue.http.get(`movies/${cinemaId}/byCinema`).then(movies => {
      commit(typeMovie.mutations.receivedMovies, {apiResponse: movies});
      commit(globalTypes.mutations.stopProcessing);
    })
  },
  [typeMovie.actions.fetchGenres] : ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
    Vue.http.get('genres').then(genres => {
      commit(typeMovie.mutations.receivedGenres, {apiResponse: genres});
      commit(globalTypes.mutations.stopProcessing);
    })
}

};

const getters = {
  [typeMovie.getters.search]: (state) => {
    let movies = cinemaInfo.movie_showings;
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
  [typeMovie.getters.search] : state => state.search,
  [typeMovie.getters.rows] : state => state.rows,
  [typeMovie.getters.seats] : state => state.seats,
  [typeMovie.getters.genres] : state => state.genres,
  [typeMovie.getters.genre] : state => state.genre,
  [typeMovie.getters.hour] : state => state.hour,

};

const mutations = {
  //Asignamos los valor recibido de la api a state.**
  [typeMovie.mutations.receivedMovies] :(state, {apiResponse}) => {
    state.cinemaInfo = apiResponse.data;
  },

  [typeMovie.mutations.receivedGenres] :(state, {apiResponse}) => {
    state.genres = apiResponse.data
  },

  [typeMovie.mutations.setSearch] :(state, query) => {
    state.query.search = query;
  },
  [typeMovie.mutations.setRow] :(state, query) => {
    state.query.rows = query;
  },
  [typeMovie.mutations.setHour] :(state, query) => {
    state.query.hours = query;
  },
  [typeMovie.mutations.setGenre] :(state, query) => {
    state.query.genres = query;
  },
  [typeMovie.mutations.clearFilters] : (state) => {
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
