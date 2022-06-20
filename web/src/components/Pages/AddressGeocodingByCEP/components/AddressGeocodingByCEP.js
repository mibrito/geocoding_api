import Map from '../../../Map'
import api from '../../../../clients/api'
import { Component } from 'react'
import '../../../Pages/styles.css'

class AddressGeocodingByCEP extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: [],
      cep: '',
      type: 'Endereços CEP',
      clickedLat: '',
      clickedLong: ''
    }
  }

  getClickedCoordinates (lat, long) {
    console.log('lat long', lat, long)
    this.setState({ clickedLat: lat })
    this.setState({ clickedLong: long })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const locations = await api.getAddressesByCEP({ cep: this.state.cep })
    this.setState({ locations })
    this.setState({ address: this.currentAddress })
  }

  render () {
    return (
      <div className='page'>
        <form name='form' className='form' onSubmit={this.handleSubmit}>

          <div className='form-inline '>
            <div className='input'>
              <input
                type='text'
                name='cep'
                className='form-control'
                id='cepInput'
                required
                placeholder='Insira o CEP'
                value={this.state.cep}
                onChange={e => this.setState({ cep: e.target.value })}
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

export default AddressGeocodingByCEP
