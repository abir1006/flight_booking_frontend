import {useEffect, useState} from "react";
import {FaPlane} from "react-icons/fa6";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {Placeholder, Panel, IconButton, Button} from "rsuite";
import SearchFlightFilter from "./SearchFlightFilter";
import SearchFlightResult from "./SearchFlightResult";
import axios from "../configs/axios";
import {useSelector} from "react-redux";
const qs = require('qs');

const SearchFlight = ({searchData}) => {

    const [spinner, setSpinner] = useState(false);
    const searchQuery = useSelector(state => state?.flightQuery)

    const [flights, setFlights] = useState([])

    useEffect(() => {
        setSpinner(true);
        axios.get("/flights/search", {
            params: searchQuery,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }).then(res => {
            if (searchQuery.tripType == 1) {
                setFlights(res.data[0])
            } else {
                setFlights(res.data)
            }

            setTimeout(() => {
                setSpinner(false);
            }, 2000)
        }).catch(err => {
            console.log(err);
            setSpinner(false)
        })

    }, [searchQuery]);

    const data = []

    return <div className={`row mt-3`}>
        <div className={`col-3`}>
            <SearchFlightFilter/>
        </div>
        <div className={`col-9`}>
            {spinner && <div className={`box`}>
                <div className={`FlightSearchSpinnerPanel`}>
                    <FontAwesomeIcon icon={faSpinner} spin={true}/> Searching flight <span
                    className={`flightSearchIcon`}><FaPlane/></span>
                </div>
                <div className={`mt-3`}>
                    <Panel
                        bordered>
                        <Placeholder.Paragraph rows={2} graph="image"/>
                    </Panel>
                </div>
            </div>
            }
            {!spinner && <div className={`box`}>
                <div className={`mt-3`}>
                    {flights.length == 0 && <p className={`text-center`}>No flight found</p>}
                    {
                        flights.length > 0 && flights.map(flight => {
                            return <SearchFlightResult flight={flight}/>
                        })
                    }
                </div>
            </div>}
        </div>

    </div>
}

export default SearchFlight;