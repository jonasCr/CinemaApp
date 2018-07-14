<template>
  <div class="MovieHours__Wrapper">
    <div v-if="showing_times.length > 0">
      <!-- el $emit() permite enviar datos al componente padre-->
      <span
        v-for="showing_time in showing_times"
        @click="$emit('selectHour', showing_times.hour_to_show)"
        class="badge-danger badge"
      >
        {{showing_time.hour_to_show}}
      </span>
    </div>
    <div v-else>
      <span class="badge badge-error">
        {{$t('movie_showing_times.empty')}}
      </span>
    </div>
  </div>
</template>

<script>
  import movieGenre from "./MovieGenres"
  import movieShowingTimes from "./MovieShowingTimes"
  export default {
    components: {
      movieGenre,
      movieShowingTimes
    },
    name: "movie-showing-times",
    props: {
      showing_times : {
        types: Array
      }
    }
  }
</script>

<style lang="scss" scoped>
  .badge-danger {
    background-color: #b94a48;
  }

  .badge-danger:hover {
    background-color: #953b39;
  }

  label {
    color: #fff;
  }
</style>
