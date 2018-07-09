<template>
  <div class="MovieItem__Wrapper">
    <div class="row">
      <div class="col-md-5">
        <!--accedemos a los detailes de cada pelicula con un props.-->
        <img :src="movie.movie.movie_screenshot" class="img-responsive">
        <div class="clearfix"></div>
        <br>

        <button
          v-if="booking && canBooking"
          @click="$emit('startReservation', movie.movie.id)"
          class="btn btn-warning btn-block"
        >
          {{$t('movie.reservation')}}

        </button>

      </div>
      <div class="col-md-7">
        <h2>
          <!--traduction            data            -->
          {{$t('movie.name')}} : {{movie.movie.movie_name}}
        </h2>

        <h3>
          {{$t('movie.director')}} : {{movie.movie.movie_director}}
        </h3>
        <p>
          {{$t('movie.synopsis')}} : {{movie.movie.synopsis}}
        </p>
        <p>
          {{$t('movie.room_number')}} : {{movie.room.room_rows}}
        </p>
        <p>
          {{$t('movie.room_seats')}} : {{movie.room.room_seats}}
        </p>


        <div class="row">
          <div class="col-md-6">
            <!--mostrar los generos de esta pelicula-->
            <movie-genre :genres="movies.movie.genres"></movie-genre>
          </div>
          <div class="col-md-6">
            mostrar las horas disponible de esta pelicula
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "movie",
      props: {
        movie: {
          type: Object,
          required: true
        },
        booking: {
          type: Boolean,
          required: true
        }
      },
      computed: {
        canBooking () {
          //si el array de movie showing times esta vacio, no se podra reservar
          return this.movie.movie_showing_times.length > 0;
        }
      }
    }

</script>

<style lang="scss" scoped>
  .MovieItem__Wrapper {
    background-color: #181d23 !important;
    padding: 10px;

    h2 {
      margin-top: 0;
    }
  }

</style>
