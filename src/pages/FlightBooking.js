import SiteLayout from "../layout/SiteLayout";
import {useSelector} from "react-redux";
import PassengerForm from "../components/PassengerForm";


const FlightBooking = () => {

    const flightBooking = useSelector(state => state.flightBooking);
    const travellers = useSelector(state => state.flightQuery?.travellers || 0);

    return <SiteLayout>
        <div className={`row`}>
            <div className={`col-12`}>
                <div className={`box`}>
                    <h4>Passenger booking information</h4>
                    {
                        [...Array(parseInt(travellers))].map((v,i) => {
                            return <PassengerForm formCount={i+1}/>
                        })
                    }
                </div>
            </div>
        </div>
    </SiteLayout>
}

export default FlightBooking;