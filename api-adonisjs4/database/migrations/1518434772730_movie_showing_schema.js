//Crear la tabla movie_showings
//Indica donde se va a ver una peli
  'use strict'

const Schema = use('Schema')

class MovieShowingSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('movie_showings', (table) => {
      table.increments();
      table.integer('cinema_id').unsigned();
      table.foreign('cinema_id').references('cinemas.id');
      table.integer('movie_id').unsigned();
      table.foreign('movie_id').references('movies.id');
      table.integer('room_id').unsigned();
      table.foreign('room_id').references('rooms.id');
      table.date('movie_show_date');
      table.timestamps()
    })
  }

  //Elimina la tabla
  down () {
    this.drop('movie_showings')
  }
}

module.exports = MovieShowingSchema
