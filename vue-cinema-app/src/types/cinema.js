import namespace from '@/utils/namespace'

export default namespace('cinema', {
  getters : [
    'cinemas',
    'search',
    'rooms',
    'seats'
  ],
  actions: [
    'fetchCinema'
  ],
  mutations: [
    'receivedCinemas',
    'setSearch',
    'setRooms',
    'clearFilter'
  ]
})
