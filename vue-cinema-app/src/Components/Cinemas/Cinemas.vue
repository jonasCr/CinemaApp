<template>
    <div class="cinema-list">
      listado de cines
    </div>
</template>

<script>
  import cinemaTypes from '@/types/cinema'
  import {mapGetters} from 'vuex'
  export default {
      name: "cinema-list",
      mounted() {
        this.$store.dispatch(cinemaTypes.actions.fetchCinemas);
      }
  }
</script>

<style scoped>

</style>
