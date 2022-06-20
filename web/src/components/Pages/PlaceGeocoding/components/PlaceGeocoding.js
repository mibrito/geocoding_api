import Map from '../../../Map'
import api from '../../../../clients/api'
import { Component } from 'react'
import AsyncSelect from 'react-select/async'
import '../../../Pages/styles.css'
import '../../../../App.css'

class AddressGeocoding extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: [],
      name: '',
      type: 'Lugares Direta',
      clickedLat: '',
      clickedLong: '',
      selectedState: { value: 'Todos os estados', label: 'Todos os estados' },
      selectedMeso: { value: 'Todas as mesorregiões', label: 'Todos as mesorregiões' }
    }
    this.states = []
    this.mesos = []
  }

  getStatesSelectOptions = async () => {
    this.states = await api.getEstados({})
    const statesOptions = [
      { value: 'Todos os estados', label: 'Todos os estados' },
      ...this.states.map((state) => { return { value: state.id, label: state.name } })
    ]
    return statesOptions
  }

  getMesosSelectOptions = async () => {
    if (this.state.selectedState.value === 'Todos os estados') return
    this.mesos = await api.getMeso({ estado_id: this.state.selectedState.value })
    const mesosOptions = [
      { value: 'Todas as mesorregiões', label: 'Todos as mesorregiões' },
      ...this.mesos.map((meso) => { return { value: meso.nomemeso, label: meso.nomemeso } })
    ]
    return mesosOptions
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: caso selectedState ou Meso sejam padrão -> não enviar nada
    let response = []
    if (this.state.selectedMeso.label !== 'Todas as mesorregiões') {
      response = await api.getPlaceGeocoding({ nome: this.state.name, estado: this.state.selectedState.label, meso: this.state.selectedMeso.label })
    } else if (this.state.selectedState.label !== 'Todos os estados') {
      response = await api.getPlaceGeocoding({ nome: this.state.name, estado: this.state.selectedState.label })
    } else {
      response = await api.getPlaceGeocoding({ nome: this.state.name })
    }

    this.setState({ locations: response.data })
  }

  getClickedCoordinates (lat, long) {
    this.setState({ clickedLat: lat })
    this.setState({ clickedLong: long })
  }

  render () {
    return (
      <div className='page'>
        <form name='form' className='form' onSubmit={this.handleSubmit}>
          <div className='form-inline '>
            <div className='input'>
              {/* <label for="name" className='label'>Nome do lugar</label> */}
              <input
                className='form-control'
                type='text'
                name='name'
                id='name'
                required
                placeholder='Nome'
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className='input input-select'>
              {/* <label for='stateSelection'>Selecione o estado</label> */}
              <AsyncSelect
                name='stateSelection'
                id='stateSelection'
                placeholder='Selecione o estado'
                loadOptions={this.getStatesSelectOptions}
                onChange={e => this.setState({ selectedState: e }, () => { })}
                defaultOptions
                cacheOptions
              />
            </div>
            <div className='input input-select'>
              {/* <label for='mesoSelection'>Selecione a mesorregião</label> */}
              <AsyncSelect
                key={this.state.selectedState.value}
                name='mesoSelection'
                id='mesoSelection'
                placeholder='Selecione a mesorregião'
                loadOptions={this.getMesosSelectOptions}
                onChange={e => this.setState({ selectedMeso: e })}
                defaultOptions
                cacheOptions
              />
            </div>
            <button className='input btn' type='submit'>Buscar</button>
          </div>

        </form>

        <Map
          id='mapContainer'
          sendClickedCoordinates={this.getClickedCoordinates.bind(this)}
          locations={{ response: this.state.locations, type: this.state.type }}
        />
      </div>
    )
  }
}

export default AddressGeocoding
