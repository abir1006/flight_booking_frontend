import {useEffect, useState} from "react";
import {FaPlane} from "react-icons/fa6";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {Placeholder, Panel, IconButton, Button} from "rsuite";
import SearchFlightFilter from "./SearchFlightFilter";
import SearchFlightResult from "./SearchFlightResult";
import axios from "../configs/axios";
import {useSelector} from "react-redux";

const SearchFlight = ({searchData}) => {

    const [spinner, setSpinner] = useState(false);
    const searchQuery = useSelector(state => state?.flightQuery)

    useEffect(() => {
        setSpinner(true);
        // setTimeout(() => {
        //     setSpinner(false);
        // }, 5000)

        axios.get("/flights/search", {
            params: searchQuery
        }).then(res => {
            console.log(res.data);
            setTimeout(() => {
                setSpinner(false);
            }, 2000)
        }).catch(err => {
            console.log(err);
            setSpinner(false)
        })

    }, []);

    const data = []

    return <div className={`row mt-3`}>

        {spinner && <div className={`col-12`}>
            <div className={`box`}>
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
        </div>
        }

        {!spinner && <>
            <div className={`col-3`}>
                <SearchFlightFilter/>
            </div>
            <div className={`col-9`}>
                <div className={`box`}>
                    <div className={`mt-3`}>
                        <SearchFlightResult data={data}/>
                        <SearchFlightResult data={data}/>
                    </div>
                </div>
            </div>
        </>
        }
    </div>
}

export default SearchFlight;