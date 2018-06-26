//Crear la tabla Cinema
//Crea una lista de genero
'use strict'

const Schema = use('Schema')

class GenreSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('genres', (table) => {
      table.increments();
      table.string('genre_name', 100);
    })
  }

  //Elimina la tabla
  down () {
    this.drop('genres')
  }
}

module.exports = GenreSchema
