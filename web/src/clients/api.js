// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5003'
// });

// export default api;

import axios from 'axios'

const API_CLIENT_TIMEOUT = 100000 // Milliseconds
const SRID = 4326

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: API_CLIENT_TIMEOUT,
})


api.getPlaceGeocoding = async (config) => {
  const url = `/busca/lugares?nome=${config.nome}&estado=${config.estado || ''}&meso=${config.meso || ''}&srid=${SRID}`
  return api.get(url)
}

api.getAddressGeocoding = async (config) => {
  const url = `/busca/enderecos?end=${config.end}&exato=False&threahold=0.8&srid=${SRID}`
  return api.get(url)
}

api.getAddressGeocodingStructured = async (config) => {
  const url = `/busca/enderecos/estruturado?nome=${config.nome}&numero=${config.numero}&cidade=${config.cidade}&estado=${config.estado}&exato=False&threahold=0.8&srid=${SRID}`
  return this.instance.get(url)
}

api.getPlaceReverseGeocoding = async (config) => {
    const url = `/busca/lugares/geocodificacao_reversa?lat=${config.lat}&long=${config.long}&limite=${config.limite}&srid=${SRID}`
    return this.instance.get(url)
}

api.getAddressReverseGeocoding = async (config) => {
        const url = `/busca/enderecos/geocodificacao_reversa?lat=${config.lat}&long=${config.long}&limite=${config.limite}&srid=${SRID}`
        return this.instance.get(url)
    }

api.getAddressesByCEP = async (config) => {
        const url = `/busca/enderecos/cep?cep=${config.cep}&srid=${SRID}`
        return this.instance.get(url)
    }

api.getEstados = async (config) => {
        const url = `/estados?srid=${SRID}`
        return this.instance.get(url)
    }

api.getMeso = async (config) => {
        const url = `mesos?estado_id=${config.estado_id}&srid=${SRID}`
        return this.instance.get(url)
    }
}

export default api
