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

    const flightBookingHandler = () => {
        dispatch(setFlightBooking(flight));
        if (isUserAuthenticated) {
            navigate("/flight-booking");
        } else {
            dispatch(setPrevRoute({prevRoute: "/flight-booking"}))
            toast.warn("Please login to continue booking!")
            navigate("/login");
        }

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