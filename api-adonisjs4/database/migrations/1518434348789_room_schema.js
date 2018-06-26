//Crear la tabla room
//Almacena los details de cada sala de cinema
'use strict'

const Schema = use('Schema')

class RoomSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('rooms', (table) => {
      table.increments()
      /***********/
      /*Estas 2 lineas van juntas y crea una relacion entre 2 tablas
      */
      table.integer('cinema_id').unsigned();
      table.foreign('cinema_id').references('cinemas.id');
      /***********/
      table.integer('room_rows');
      table.integer('room_seats');
      table.integer('room_number');
    })
  }

  //Elimina la tabla
  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
