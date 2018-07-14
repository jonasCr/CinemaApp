<template>
  <div class="Movies__Wrapper">
    <div class="row">
      <div class="col-md-3">
        <movie-filter></movie-filter>
      </div>
      <div class="col-md-9">
        <div v-if="movies && movies.length > 0">
          <div v-for="(movie, index) in movies" class="movie">
            <!-- el v-on recoge el event que le envia el componente hijo-->
            <movie
              :movie="movie"
              :booking="true"
              v-on:startReservation="reservation($event)"
              :key="index"
            ></movie>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moviesTypes from '../../types/movie';
  import {mapGetters, mapActions} from 'vuex';
  import Movie from './MovieItem'
  import MovieFilter from './MovieFilter'
  export default {
    components: {
      Movie,
      MovieFilter
    },
    name: "movie-list",
    mounted() {
      const cinemaId = this.$route.params.id;
      this.fetchMovies(cinemaId);
    },
    methods: {
      ...mapActions({
        fetchMovies: moviesTypes.actions.fetchMovies
      }),
      reservation(movieId) {
        console.log(movieId)
      }
    },
    computed: {
      ...mapGetters({
        movies: moviesTypes.getters.movies
      })
    }
  }
</script>

<style lang="scss" scoped>
  .Movies__Wrapper{

  }
</style>
