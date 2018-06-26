'use strict'

const Booking = use('App/Models/Booking');
const Seat = use('App/Models/Seat');
const Customer = use('App/Models/Customer');
const Database = use('Database');

class BookingController {
  //Creamos el metodo save llamado en start/routes.js con:
  // (routes.js/L30):
  // Route.post('booking', 'BookingController.save').middleware(['auth:jwt']);
  async save({response, request, auth}) {
    const trx= await Database.beginTransaction();

      //Recogemos el user con auth
      const user = await auth.getUser();
      //Le asignamos un customer_id
      const customer = await Customer.findBy('user_id', user.id);
      //Y creamos una nueva reserva:
      const booking = await Booking.create({
        customer_id: customer.id,
        movie_showing_time_id: request.input('movie_showing_time_id'),
        booking_seat_count: request.input('seats').length,
        booking_made_day: new Date(),
      }, trx);


      // Vamos a reservar cada asiento pedido
      let seats = [];
      for(let i = 0; i< request.input('seats').length; i++) {
        //Recojo el asiento actual que se va a reprensentar de la siguiente manera:
        //  1   -   5
        // row    asiento
        const current_seat = request.input('seats')[i];
        //Para recoger el row y el seat hago un split que va a devulover algo asi:
        // [1,5]
        const seat_row = current_seat.split('-');
        //Envio estos datos en en array seats[]:
        // => seat_row[0]   =  1  row
        // => seat_row[1]   =  5  seat_number
        seats.push({
          booking_id: booking.id,
          seat_row: seat_row[0];
          seat_number: seat_row[1];
        })

      }

      await Seat.createMany(seats, trx);

    trx.commit();

    return response.json({res: 'ok'})
  }

  //Creamos el metodo save llamado en start/routes.js con:
  // (routes.js/L31):
  // Route.get('bookings/last', 'BookingController.last').middleware(['auth:jwt'])
  // Va a recoger la ultima reserva de un usuario
  async last({response, auth}) {
    //recoger el user
    const user = await auth.getUser();
    //le relacionamos con un customer_id
    const customer = await Customer.findBy('user_id', user.id);
    // cargamos la tabla bookings con seats y movies.
    await customer.loadMany({
      bookings: (booking) => {
        //Select top 1
        //from booking
        //where customer_id(de la tabla) = customer_id(de la APP)
        //order by id desc
        booking.where('customer_id', customer.id).limit[1].orderBy('id', 'desc')
          //Le añadimos los asientos
          .with('seats')
          //Le añadimos la hora de la peli
          .with('movie_showing_time', async movie_showing_time => {
            movie_showing_time.select('id', 'movie_showing_id')
              .with('movie_showing', (movie_showing)=>{
                movie_showing.select('id', 'cinema_id', 'room_id', 'movie_id')
                  .with('movie', (movie)=>{
                    movie.select('id', 'movie_name').with('genres', (genres)=> {
                      genres.select('id', 'genre_name')
                    })
                  })
                  .with('cinema', (cinema)=> {
                    cinema.select('id', 'cinema_name', 'cinema_address', 'cinema_phone', 'cinema_seat_capacity')
                  })
              })
          })
      }
    });
    return response.json({data: customer});
  }

  //Creamos el metodo all llamado en start/routes.js con:
  // (routes.js/L32):
  //Va a devolver todas las reserva de un ususario, por lo tanto, es igual al metodo last pero sin .limit[1];
  async all({reponse, auth}){
    //recoger el user
    const user = await auth.getUser();
    //le relacionamos con un customer_id
    const customer = await Customer.findBy('user_id', user.id);
    // cargamos la tabla bookings con seats y movies.
    await customer.loadMany({
      bookings: (booking) => {
        // Aqui hemos quitado el .limit[1] del metodo last para poder devolver todo y no solo uno
        booking.where('customer_id', customer.id).orderBy('id', 'desc')
          //Le añadimos los asientos
          .with('seats')
          //Le añadimos la hora de la pelicula
          .with('movie_showing_time', async movie_showing_time => {
            movie_showing_time.select('id', 'movie_showing_id')
              .with('movie_showing', (movie_showing)=>{
                movie_showing.select('id', 'cinema_id', 'room_id', 'movie_id')
                  .with('movie', (movie)=>{
                    movie.select('id', 'movie_name').with('genres', (genres)=> {
                      genres.select('id', 'genre_name')
                    })
                  })
                  .with('cinema', (cinema)=> {
                    cinema.select('id', 'cinema_name', 'cinema_address', 'cinema_phone', 'cinema_seat_capacity')
                  })
              })
          })
      }
    });
    return response.json({data: customer});
  }
}

module.exports = BookingController
