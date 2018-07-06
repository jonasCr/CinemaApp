<template>
  <div class="col-md-12 CinemaItem_Wrapper">
    <div class="row">
      <div class="col-md-5 col-xs-12">
        <img :src="cinema.cinema_screenshot" class="img-cinema img-responsive">
      </div>

      <div class="col-md-7 col-xs-12">
        <h2>
          <router-link :to="{name: 'cinema', params: {id: cinema.id}}">
            {{$t('cinema.name')}}: {{cinema.cinema_name}}
          </router-link>
        </h2>
        <h3>
          {{$t('cinema.address')}}: {{cinema.cinema_address}}
        </h3>
        <p>
          {{$t('cinema.details')}}: {{cinema.cinema_details}}
        </p>
        <p>
          {{$t('cinema.telephone')}}: {{cinema.cinema_phone}}
        </p>
        <p>
          {{$t('cinema.seats')}}: {{cinema.cinema_seat_capacity}}
        </p>


      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import CinemaTypes from '@/types/cinema'

    export default {
      name: "cinema-item",
      props: {
        cinema: {
          type: Object,
          required: true
        }
      },
      computed: {
        ...mapGetters({
          cinemaNumbers: CinemaTypes.getters.cinemaNumbers
        })
      }

    }
</script>

<style lang="scss" scoped>
  .CinemaItem_Wrapper {
    background-color: #181d23 !important;
    padding: 10px;

    h2 {
      margin-top: 0;
    }

    .img-cinema {
      margin: auto;
    }
  }
</style>
