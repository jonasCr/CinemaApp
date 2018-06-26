//Crear la tabla Movie
//Almacena los details bascio de una pelicula
'use strict'

const Schema = use('Schema')

class MovieSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('movies', (table) => {
      table.increments();
      table.string('movie_name', 120);
      table.string('movie_director', 100);
      table.string('movie_screenshot', 100).nullable();
      table.text('movie_synopsis');
      table.timestamps()
    })
  }

  //Elimina la tabla
  down () {
    this.drop('movies')
  }
}

module.exports = MovieSchema
