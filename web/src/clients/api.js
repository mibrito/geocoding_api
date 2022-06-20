import axios from 'axios'

const API_CLIENT_TIMEOUT = 100000 // Milliseconds
const SRID = 4326

const querystring = (o) => {
  const q = new URLSearchParams()
  Object.keys(o).forEach(k => {
    q.set(k, o[k])
  })
  return q
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: API_CLIENT_TIMEOUT
})

api.getPlaceGeocoding = async (config) => {
  const query = querystring({
    estado: '',
    meso: '',
    srid: SRID,
    ...config
  }).toString()
  const url = `/busca/lugares?${query}`
  return api.get(url)
}

api.getAddressGeocoding = async (config) => {
  const query = querystring({
    exato: 'False',
    threashold: '0.8',
    srid: SRID,
    ...config
  }).toString()
  const url = `/busca/enderecos?${query}`
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

api.getAddressGeocodingStructured = async (config) => {
  const query = querystring({
    exato: 'False',
    threashold: '0.8',
    srid: SRID,
    ...config
  }).toString()
  const url = `/busca/enderecos/estruturado?${query}`
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

api.getPlaceReverseGeocoding = async (config) => {
  const query = querystring({
    srid: SRID,
    ...config
  }).toString()
  const url = `/busca/lugares/geocodificacao_reversa?${query}`
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

api.getAddressReverseGeocoding = async (config) => {
  const query = querystring({
    srid: SRID,
    ...config
  }).toString()
  const url = `/busca/enderecos/geocodificacao_reversa?${query}`
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

api.getAddressesByCEP = async (config) => {
  const query = querystring({
    srid: SRID,
    ...config
  }).toString()
  const url = `/busca/enderecos/cep?${query}`
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

api.getEstados = async () => {
  const query = querystring({
    srid: SRID
  }).toString()
  const url = `/estados?${query}`
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

api.getMeso = async (config) => {
  const query = querystring({
    srid: SRID,
    ...config
  }).toString()
  const url = `mesos?${query}`
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default api
