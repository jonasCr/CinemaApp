//Crear la tabla genre_movie
//Asocia un genero a una pelicula
'use strict'

const Schema = use('Schema')

class GenreMovieSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('genre_movie', (table) => {
      table.integer('movie_id').unsigned();
      table.foreign('movie_id').references('movies.id');
      table.integer('genre_id').unsigned();
      table.foreign('genre_id').references('genres.id');
    })
  }

  //Elimina la tabla
  down () {
    this.drop('genre_movie')
  }
}

module.exports = GenreMovieSchema
