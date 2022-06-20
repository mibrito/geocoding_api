import Map from '../../../Map'
import api from '../../../../clients/api'
import { Component } from 'react'
import '../../../Pages/styles.css'
import Select from 'react-select'

class ReverseGeocoding extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: [],
      latitude: '',
      longitude: '',
      limite: 5,
      type: 'Endereços'
    }
    this.typeOptions = [
      { value: 'Endereços Reversa', label: 'Endereços' },
      { value: 'Lugares', label: 'Lugares' }
    ]
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    let response = []
    if (this.state.type === 'Endereços Reversa') {
      console.log(this.state.type, 'Endereços', this.state.type === 'Endereços')
      response = await api.getAddressReverseGeocoding({
        lat: this.state.latitude,
        long: this.state.longitude,
        limite: this.state.limite
      })
    } else if (this.state.type === 'Lugares') {
      console.log(this.state.type, 'Lugares', this.state.type === 'Lugares')
      response = await api.getPlaceReverseGeocoding({
        lat: this.state.latitude,
        long: this.state.longitude,
        limite: this.state.limite
      })
    } else {
      console.error("Tipo selecionado errado, deve ser 'Endereços' ou 'Lugares'.")
    }

    console.log('response', response)
    this.setState({ locations: response.data })
  }

  getClickedCoordinates (lat, long) {
    console.log('lat long', lat, long)
    this.setState({ latitude: lat })
    this.setState({ longitude: long })
  }

  render () {
    return (
      <div className='page'>
        <form name='form' className='form' onSubmit={this.handleSubmit}>
          <div className='form-inline'>
            <div className='input input-type'>
              <Select
                style={{ maxWidth: '100%' }}
                onChange={e => this.setState({ type: e.value })}
                options={this.typeOptions}
                defaultOptions
                cacheOptions
              />

            </div>
            <div className=' input input-lat'>
              <input
                style={{ maxWidth: '100%' }}
                type='number'
                name='lat'
                id='lat'
                className='form-control'
                required
                placeholder='Latitude'
                value={this.state.latitude}
                onChange={e => this.setState({ latitude: Number(e.target.value) })}
              />
            </div>
            <div className=' input input-long'>
              <input
                style={{ maxWidth: '100%' }}
                type='number'
                name='long'
                id='long'
                className='form-control'
                required
                placeholder='Longitude'
                value={this.state.longitude}
                onChange={e => this.setState({ longitude: Number(e.target.value) })}
              />
            </div>
            <div className=' input input-limite'>
              <input
                style={{ maxWidth: '100%' }}
                type='number'
                min='1' step='1'
                name='limite'
                id='limite'
                className='form-control'
                required
                placeholder='Limite'
                value={this.state.limite}
                onChange={e => this.setState({ limite: Number(e.target.value) })}
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

export default ReverseGeocoding
