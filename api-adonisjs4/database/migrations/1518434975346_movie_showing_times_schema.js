//Crear la tabla movie showing time
//Relaciona la tabla movie_showing con una hora
'use strict'

const Schema = use('Schema')

class MovieShowingTimesSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('movie_showing_times', (table) => {
      table.increments();
      table.integer('movie_showing_id').unsigned();
      table.foreign('movie_showing_id').references('movie_showings.id');
      table.string('hour_to_show', 20);
    })
  }

  //Elimina la tabla
  down () {
    this.drop('movie_showing_times')
  }
}

module.exports = MovieShowingTimesSchema
