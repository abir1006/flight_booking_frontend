import {Panel} from "rsuite";
import moment from "moment/moment";
import {useDispatch, useSelector} from "react-redux";
import {setFlightBooking} from "../features/flightBookingSlice";
import {useNavigate} from "react-router-dom";
import {setPrevRoute} from "../features/userRouteSlice";
import {toast} from "react-toastify";

const SearchFlightResult = ({flight}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUserAuthenticated = useSelector(state => state?.auth?.isAuthenticated)
    const tripType = useSelector(state => state?.flightQuery?.tripType)
    const flights = flight;

    const flightBookingHandler = () => {
        if (tripType == 1) {
            dispatch(setFlightBooking(flight));
        }

        if (isUserAuthenticated) {
            navigate("/flight-booking");
        } else {
            dispatch(setPrevRoute({prevRoute: "/flight-booking"}))
            toast.warn("Please login to continue booking!")
            navigate("/login");
        }

    }

    if (tripType == 2 && flights?.length > 1) {
        let maxFlightCount = 0;
        let minFlightCount = 0;
        let departureFlightIsMoreThanReturn = true;

        if (flights[0]?.length > flights[1]?.length) {
            maxFlightCount = flights[0]?.length || 0;
            minFlightCount = flights[1]?.length || 0;
            departureFlightIsMoreThanReturn = true;
        } else {
            maxFlightCount = flights[1]?.length || 0;
            minFlightCount = flights[0]?.length || 0;
            departureFlightIsMoreThanReturn = false;
        }

        let i = -1;
        let index2 = -1;

        return <>
            {
                [...Array(parseInt(maxFlightCount))].map((v, j) => {
                    i = i + 1;
                    index2 = index2 + 1;
                    if (departureFlightIsMoreThanReturn && j > minFlightCount - 1) {
                        index2 = 0;
                    }

                    if (!departureFlightIsMoreThanReturn && j > minFlightCount - 1) {
                        i = 0;
                    }

                    return <Panel className={`search-result-row mb-3`} bordered>
                        <div className={`row`}>
                            <div className={`col-2`}>
                                <div className={`returnFlightCell`}>
                                    <img width={`75`}
                                         src={flight[0][i]?.airlineLogo}/>
                                </div>
                                <div className={`returnFlightCell`}>
                                    <img width={`75`}
                                         src={flight[1][index2]?.airlineLogo}/>
                                </div>
                            </div>
                            <div className={`col-2`}>
                                <div className={`returnFlightCell`}>
                                    <p>
                                        <strong>{flight[0][i]?.departureAirport?.code} - {flight[0][i]?.arrivalAirport?.code}</strong>
                                        <br/>
                                        {flight[0][i]?.airlineName} <br/> Flight No: {flight[0][i]?.flightNumber}</p>
                                </div>
                                <div className={`returnFlightCell`}>
                                    <p>
                                        <strong>{flight[1][index2]?.departureAirport?.code} - {flight[1][index2]?.arrivalAirport?.code}</strong>
                                        <br/>
                                        {flight[1][index2]?.airlineName} <br/> Flight
                                        No: {flight[1][index2]?.flightNumber}</p>
                                </div>
                            </div>
                            <div className={`col-3`}>
                                <div className={`returnFlightCell`}>
                                    <p>
                                        <strong>{moment(flight[0][i]?.flightSchedule?.departureTime, 'HH:mm:ss').format("h:mm A")}</strong>
                                        <br/>
                                        {moment(flight[0][i]?.flightSchedule?.departureDate).format("MMM D, ddd")} <br/>
                                        {flight[0][i]?.departureAirport?.name}
                                    </p>
                                </div>
                                <div className={`returnFlightCell`}>
                                    <p>
                                        <strong>{moment(flight[1][index2]?.flightSchedule?.departureTime, 'HH:mm:ss').format("h:mm A")}</strong>
                                        <br/>
                                        {moment(flight[1][index2]?.flightSchedule?.departureDate).format("MMM D, ddd")}
                                        <br/>
                                        {flight[1][index2]?.departureAirport?.name}
                                    </p>
                                </div>
                            </div>
                            <div className={`col-3`}>
                                <div className={`returnFlightCell`}>
                                    <p>
                                        <strong>{moment(flight[0][i]?.flightSchedule?.arrivalTime, 'HH:mm:ss').format("h:mm A")}</strong>
                                        <br/>
                                        {moment(flight[0][i]?.flightSchedule?.arrivalDate).format("MMM D, ddd")} <br/>
                                        {flight[0][i]?.arrivalAirport?.name}
                                    </p>
                                </div>
                                <div className={`returnFlightCell`}>
                                    <p>
                                        <strong>{moment(flight[1][index2]?.flightSchedule?.arrivalTime, 'HH:mm:ss').format("h:mm A")}</strong>
                                        <br/>
                                        {moment(flight[1][index2]?.flightSchedule?.arrivalDate).format("MMM D, ddd")}
                                        <br/>
                                        {flight[1][index2]?.arrivalAirport?.name}
                                    </p>
                                </div>
                            </div>
                            <div className={`col-2 text-center`}>
                                <div className={`returnFlightPrice`}>
                                    <p>
                                        <strong>${flight[0][i]?.ticketPrice + flight[1][index2]?.ticketPrice} USD</strong>
                                        <button
                                            onClick={flightBookingHandler}
                                            className={`btn mx-3 mt-2`}>
                                            Select >
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </Panel>

                })

            }
        </>
    }

    return <Panel className={`search-result-row mb-3`} bordered>
        <div className={`row`}>
            <div className={`col-2`}>
                <img width={`75`}
                     src={flight?.airlineLogo}/>
            </div>
            <div className={`col-2`}>
                <p><strong>{flight?.departureAirport?.code} - {flight?.arrivalAirport?.code}</strong> <br/>
                    {flight?.airlineName} <br/> Flight No: {flight?.flightNumber}</p>
            </div>
            <div className={`col-3`}>
                <p>
                    <strong>{moment(flight?.flightSchedule?.departureTime, 'HH:mm:ss').format("h:mm A")}</strong> <br/>
                    {moment(flight?.flightSchedule?.departureDate).format("MMM D, ddd")} <br/>
                    {flight?.departureAirport?.name}
                </p>
            </div>
            <div className={`col-3`}>
                <p>
                    <strong>{moment(flight?.flightSchedule?.arrivalTime, 'HH:mm:ss').format("h:mm A")}</strong> <br/>
                    {moment(flight?.flightSchedule?.arrivalDate).format("MMM D, ddd")} <br/>
                    {flight?.arrivalAirport?.name}
                </p></div>
            <div className={`col-2 text-center`}>
                <p><strong>${flight?.ticketPrice} USD</strong>
                    <button
                        onClick={flightBookingHandler}
                        className={`btn mx-3 mt-2`}>
                        Select >
                    </button>
                </p>
            </div>
        </div>
    </Panel>
}

export default SearchFlightResult;