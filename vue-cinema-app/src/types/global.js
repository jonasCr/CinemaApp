//Importar el js NAMESPACE
import namespace from '@utils/namespace';

export default namespace('global',
  //Para enviar peticiones HTTP:
  actions: [
    'changeLanguage'
  ],
  //Para devolver una informacion
  getters: [
    'processing',
    'language',
  ],
  //Para establecer los datos
  mutations: [
    'startProcessing',
    'stopProcessing',
    'setLanguage'
  ]
})
