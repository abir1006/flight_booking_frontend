import SiteLayout from "../layout/SiteLayout";
import moment from "moment/moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {useState} from "react";
import { AutoComplete } from 'rsuite';

import {DatePicker, DateRangePicker} from 'rsuite';

const LandingPage = () => {

    const [tripType, setTripType] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDat] = useState(new Date());

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
                            onClick={e => setTripType(1)}
                            className={`btn ${tripType === 1 && `selected` || ``}`}>One Way
                        </button>
                        <button
                            onClick={e => setTripType(2)}
                            className={`btn mx-2 ${tripType === 2 && ` selected`}`}>Round Trip
                        </button>
                    </div>
                    <div className={`search_panel`}>
                        <div className={`row`}>
                            <div className={`col-4`}>
                                {/*<input type="text" placeholder={`Flying from Airport/ City`}/>*/}
                                <AutoComplete
                                    placeholder={`Flying from Airport/ City`}
                                    data={['JFK', 'ORD', 'DSM']} />

                            </div>
                            <div className={`col-4`}>
                                <AutoComplete
                                    placeholder={`Flying to Airport/ City`}
                                    data={['JFK', 'ORD', 'DSM']} />
                            </div>
                            <div className={`col-3`}>
                                {/*<input type="text" value={moment().format('d MMMM, Y')}/>*/}
                                {tripType === 1 && <DatePicker
                                    oneTap={true}
                                    defaultValue={new Date()}
                                    format="MMM d, Y"/>}

                                {tripType === 2 && <DateRangePicker
                                    format="MMM d, Y"/>}
                            </div>
                            <div className={`col-1`}>
                                <button type={`button`} className={`search-btn full-width`}>
                                    <FontAwesomeIcon className={`darkredIcon`} icon={faSearch} size={`xl`}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SiteLayout>
}

export default LandingPage;