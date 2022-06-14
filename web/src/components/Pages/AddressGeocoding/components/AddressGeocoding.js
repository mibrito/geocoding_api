import Map from '../../../Map'
import ApiClient from '../../../../clients/api'
import { Component } from "react"
import '../../../Pages/styles.css'

class AddressGeocoding extends Component {
    constructor(props) {
        super(props)
        this.apiClient = new ApiClient()
        this.state = {
            locations: [],
            addresses: ["",],
            type: "Endereços",
            clickedLat: "",
            clickedLong: ""
        }
    }

    getClickedCoordinates(lat, long) {
        console.log('lat long', lat, long)
        this.setState({ clickedLat: lat })
        this.setState({ clickedLong: long })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let response = await Promise.all(this.state.addresses.map(async (address) => {
            try {
                const result = await this.apiClient.getAddressGeocoding({ "end": address });
                return result.data;
            }
            catch (error) {
                console.log(error)
            }
        }));
        response = response.flat();
        console.log('response', response)
        this.setState({ locations: response })
    }

    clickAddAddr() {
        let new_addresses = this.state.addresses.slice()
        new_addresses.push("")
        this.setState({ addresses: new_addresses })
        console.log(this.state.addresses)
    }

    render() {
        return (
            <div className='page'>

                <form className="form" name="form" onSubmit={this.handleSubmit}>

                    {/* <label for="address" className='label'>Endereço</label> */}
                    {this.state.addresses.map((address, index) => (
                        <div className="form-inline" key={index}>
                            <div className="input input-address">
                                <input
                                    style={{ width: '100%' }}
                                    className="form-control"
                                    type="text"
                                    name={"address" + index}
                                    required
                                    placeholder="Insira o endereço completo"
                                    value={address}
                                    onChange={e => {
                                        let new_addresses = this.state.addresses.slice()
                                        new_addresses[index] = e.target.value
                                        this.setState({ addresses: new_addresses })
                                    }}
                                />
                            </div>
                        </div>
                    )
                    )}
                    <button className="input btn add" type="button" onClick={() => this.clickAddAddr()}>Adicionar Endereço</button>
                    <button className="input btn" type="submit">Buscar</button>

                </form>

                <Map id="mapContainer"
                    sendClickedCoordinates={this.getClickedCoordinates.bind(this)}
                    locations={{ "response": this.state.locations, "type": this.state.type }}
                />
            </div >
        )
    }
}

export default AddressGeocoding
