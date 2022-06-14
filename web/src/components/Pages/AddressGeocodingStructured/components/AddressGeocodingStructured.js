import Map from '../../../Map'
import ApiClient from '../../../../clients/api'
import { Component } from "react"
import '../../../Pages/styles.css'

class AddressGeocodingStructured extends Component {
    constructor(props) {
        super(props)
        this.apiClient = new ApiClient()
        this.state = {
            locations: [],
            type: "Endereços",
            clickedLat: "",
            clickedLong: "",
            name: "",
            number: "",
            neighborhood: "",
            city: "",
            state: ""
        }
    }

    getClickedCoordinates(lat, long) {
        console.log('lat long', lat, long)
        this.setState({ clickedLat: lat })
        this.setState({ clickedLong: long })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const response = await this.apiClient.getAddressGeocodingStructured({
            nome: this.state.name,
            numero: this.state.number,
            bairro: this.state.neighborhood,
            cidade: this.state.city,
            estado: this.state.state
        });
        console.log('response', response)
        this.setState({ locations: response.data })
    }

    render() {
        return (
            <div className='page'>
                <form name="form" className="form" onSubmit={this.handleSubmit}>

                    <div className="form-inline">
                        <div className="input input-name">
                            <input
                                style={{ maxWidth: '100%' }}
                                type="text"
                                name="nameInput"
                                id="nameInput"
                                className="form-control"
                                required
                                placeholder="Logradouro"
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="input input-number">
                            <input
                                style={{ maxWidth: '100%' }}
                                type="text"
                                name="numberInput"
                                id="numberInput"
                                className="form-control"
                                required
                                placeholder="Número"
                                value={this.state.number}
                                onChange={e => this.setState({ number: e.target.value })}
                            />
                        </div>
                        <div className="input input-neighborhood">
                            <input
                                style={{ maxWidth: '100%' }}
                                type="text"
                                name="neighborhoodInput"
                                id="neighborhoodInput"
                                className="form-control"
                                placeholder="Bairro"
                                value={this.state.neighborhood}
                                onChange={e => this.setState({ neighborhood: e.target.value })}
                            />
                        </div>
                        <div className="input input-city">
                            <input
                                style={{ maxWidth: '100%' }}
                                type="text"
                                name="cityInput"
                                id="cityInput"
                                className="form-control"
                                required
                                placeholder="Cidade"
                                value={this.state.city}
                                onChange={e => this.setState({ city: e.target.value })}
                            />
                        </div>
                        <div className="input input-state">
                            <input
                                style={{ maxWidth: '100%' }}
                                type="text"
                                name="stateInput"
                                id="stateInput"
                                className="form-control"
                                required
                                placeholder="Estado"
                                value={this.state.state}
                                onChange={e => this.setState({ state: e.target.value })}
                            />
                        </div>
                        <button className="input btn" type="submit">Buscar</button>
                    </div>

                </form>

                <Map id="mapContainer"
                    sendClickedCoordinates={this.getClickedCoordinates.bind(this)}
                    locations={{ "response": this.state.locations, "type": this.state.type }}
                />
            </div >
        )
    }
}

export default AddressGeocodingStructured
