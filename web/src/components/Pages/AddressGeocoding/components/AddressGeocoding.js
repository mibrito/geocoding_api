import Map from '../../../Map'
import api from '../../../../clients/api'
import { Component } from 'react'
import '../../../Pages/styles.css'

class AddressGeocoding extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: [],
      addresses: [''],
      type: 'Endereços',
      clickedLat: '',
      clickedLong: ''
    }
  }

  getClickedCoordinates (lat, long) {
    this.setState({ clickedLat: lat })
    this.setState({ clickedLong: long })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    let locations = await Promise.all(
      this.state.addresses.map(address =>
        api.getAddressGeocoding({ end: address })
      )
    )
    locations = locations.flat()
    this.setState({ locations })
  }

  handleAddAddr = () => {
    const addresses = this.state.addresses.slice()
    addresses.push('')
    this.setState({ addresses })
  }

  render () {
    return (
      <div className='page'>
        <form className='form' name='form' onSubmit={this.handleSubmit}>
          {/* list of addresses to search */}
          <div className='form-inline'>
            {this.state.addresses.map((address, index) => (
              <div key={index} className='input input-address'>
                <input
                  style={{ width: '100%' }}
                  className='form-control'
                  type='text'
                  name={'address' + index}
                  required
                  placeholder='Insira o endereço completo'
                  value={address}
                  onChange={e => {
                    const addresses = this.state.addresses.slice()
                    addresses[index] = e.target.value
                    this.setState({ addresses })
                  }}
                />
              </div>
            ))}
          </div>

          {/* form buttons */}
          <button className='input btn add' type='button' onClick={this.handleAddAddr}>Adicionar Endereço</button>
          <button className='input btn' type='submit'>Buscar</button>

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
