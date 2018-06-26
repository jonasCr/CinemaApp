//Crear la tabla genre_movie
//asigna a cada asiento una reserva
'use strict'

const Schema = use('Schema')

class SeatSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('seats', (table) => {
      table.increments()
      table.integer('seat_row').comment('row number for room');
      table.integer('seat_number').comment('seat number for room and row');
      table.enum('seat_state', ['AVAILABLE', 'BOOKED']).defaultTo('AVAILABLE');
      table.integer('booking_id').nullable().unsigned();
      table.foreign('booking_id').references('bookings.id');
    })
  }

  //Elimina la tabla
  down () {
    this.drop('seats')
  }
}

module.exports = SeatSchema
