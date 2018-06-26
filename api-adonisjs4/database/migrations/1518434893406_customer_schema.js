//Crear la tabla Customer
//Asigna a un user una tarjeta de credito y un telefono
'use strict'

const Schema = use('Schema')

class CustomerSchema extends Schema {
  //Crea la tabla
  up () {
    this.create('customers', (table) => {
      table.increments();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('customer_phone', 14).nullable();
      table.string('customer_credit_card', 40);
      table.timestamps()
    })
  }

  //Elimina la tabla
  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
