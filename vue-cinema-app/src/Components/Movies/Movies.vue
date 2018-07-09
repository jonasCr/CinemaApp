<template>
  <div class="Movies__Wrapper">
    <div class="row">
      <div class="col-md-3">
        filter
      </div>
      <div class="col-md-9">
      </div>
    </div>
  </div>
</template>

<script>
  import moviesTypes from '@/types/movie';
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: "movie-list",
    mounted() {
      const cinemaId = this.$route.params.id;
      this.fetchMovies(cinemaId);
    },
    methods: {
      ...mapActions({
        fetchMovies: moviesTypes.actions.fetchMovies
      })
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
