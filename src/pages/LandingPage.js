import SiteLayout from "../layout/SiteLayout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {useEffect, useState} from "react";
import {AutoComplete, Input, InputGroup, InputNumber, Stack} from 'rsuite';

import {DatePicker, DateRangePicker} from 'rsuite';
import axios from "../configs/axios";
import {FaUser} from "react-icons/fa6";

import {useNavigate} from "react-router-dom";
import SearchFlight from "../components/SearchFlight";
import {useDispatch, useSelector} from "react-redux";
import {resetQuery, setQuery} from "../features/flightQuerySlice";
import moment from "moment/moment";

const LandingPage = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDat] = useState(new Date());
    const [airports, setAirports] = useState(['---'])
    const navigate = useNavigate();
    const [showSearchFlight, setShowSearchFlight] = useState(false)
    const [searchQuery, setSearchQuery] = useState({})
    const dispatch = useDispatch();
    const tripType = useSelector(state => state?.flightQuery?.tripType || 1);

    useEffect(() => {
        console.log("landing page")
        dispatch(resetQuery({
            travellers: 1,
            tripType: 1,
            startDate: moment().format("YYYY-MM-DD")
        }))
        getAirportData();

    }, []);

    const getAirportData = page => {
        axios.get(`/airports`).then(res => {
            let airportData = []
            res.data.map(row => {
                airportData.push({
                    id: row.id,
                    code: row.code,
                    name: row.code + ' - ' + row.name + ', ' + row.city + ', ' + row.country
                });
            })
            setAirports(airportData);

        }).catch(err => {
            console.log(err)
        })
    }

    const searchFlightHandler = () => {
        setShowSearchFlight(false);
        setTimeout(() => {
            setShowSearchFlight(true);
        }, 1)

    }

    const searchFrom = value => {
        let airportCode = value.split("-")[0]
        let selectedAirport = airports.find(data => data.code == airportCode.trim());
        dispatch(setQuery({departureAirportId: selectedAirport.id}))
    }

    const searchTo = value => {
        let airportCode = value.split("-")[0]
        let selectedAirport = airports.find(data => data.code == airportCode.trim());
        dispatch(setQuery({arrivalAirportId: selectedAirport.id}))
    }

    const passengerCount = value => {
        dispatch(setQuery({travellers: value}))
    }

    const tripTypeHandler = value => {
        dispatch(setQuery({tripType: value}))
    }

    const travellingDateHandler = date => {
        if (date.length > 1) {
            dispatch(setQuery({startDate: moment(date[0]).format("YYYY-MM-DD")}))
            dispatch(setQuery({endDate: moment(date[1]).format("YYYY-MM-DD")}))
        } else {
            dispatch(setQuery({startDate: moment(date).format("YYYY-MM-DD")}))
        }
    }

    return <SiteLayout>
        <div className={`row`}>
            <div className={`col-12 py-4`}>
                <p className={`welcomeText text-center`}> Welcome to flight searching app, find flights in cheap rate
                    and enjoy
                    holidays</p>
            </div>
        </div>
        <div className={`row`}>
            <div className={`col-12`}>
                <div className={`box`}>
                    <div className={`tab mb-3`}>
                        <button
                            onClick={e => tripTypeHandler(1)}
                            className={`btn ${tripType === 1 && `selected` || ``}`}>One Way
                        </button>
                        <button
                            disabled={true}
                            onClick={e => tripTypeHandler(2)}
                            className={`btn mx-2 ${tripType === 2 && ` selected`}`}>Round Trip
                        </button>
                    </div>
                    <div className={`search_panel`}>
                        <div className={`row`}>
                            <div className={`col-4`}>
                                {/*<input type="text" placeholder={`Flying from Airport/ City`}/>*/}
                                <AutoComplete
                                    onSelect={searchFrom}
                                    placeholder={`Flying from?`}
                                    data={airports.map(item => item.name)}/>

                            </div>
                            <div className={`col-4`}>
                                <AutoComplete
                                    onSelect={searchTo}
                                    placeholder={`Flying to?`}
                                    data={airports.map(item => item.name)}/>
                            </div>
                            <div className={`col-3`}>
                                {/*<input type="text" value={moment().format('d MMMM, Y')}/>*/}
                                {tripType === 1 && <DatePicker
                                    onSelect={travellingDateHandler}
                                    oneTap={true}
                                    defaultValue={new Date()}
                                    format="MMM d, Y"/>}

                                {tripType === 2 && <DateRangePicker
                                    onOk={travellingDateHandler}
                                    format="MMM d, Y"/>}
                            </div>
                            <div className={`col-1`}>
                                <button
                                    onClick={searchFlightHandler}
                                    type={`button`} className={`search-btn full-width`}>
                                    <FontAwesomeIcon className={`darkredIcon`} icon={faSearch} size={`xl`}/>
                                </button>
                            </div>
                        </div>
                        <div className={`row`}>
                            <div className={`col-4`}>
                                <InputGroup className={`mt-2`}>
                                    <InputGroup.Addon>
                                        <FaUser/>
                                    </InputGroup.Addon>
                                    <InputNumber
                                        defaultValue={1}
                                        onChange={passengerCount}
                                        placeholder={`Traveller`}/>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showSearchFlight && <SearchFlight/>}
    </SiteLayout>
}

export default LandingPage;