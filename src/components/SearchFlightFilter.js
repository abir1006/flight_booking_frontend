import {Checkbox, CheckboxGroup, CheckTree, Slider} from "rsuite";
import {useEffect, useState} from "react";
import axios from "../configs/axios";
import {useDispatch} from "react-redux";
import {setQuery} from "../features/flightQuerySlice";

const SearchFlightFilter = () => {

    const [airlines, setAirlines] = useState([])
    const [airlineId, setAirlineId] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("/airlines")
            .then(res => setAirlines(res.data))
            .catch(err => console.log(err))

    }, []);

    const airlineFilterHandler = airlineIds => {
        setAirlineId(airlineIds);
        dispatch(setQuery({airlines: airlineIds}))
    }

    const [value, setValue] = useState(0);

    const priceChangeHandler = price => {
        dispatch(setQuery({ticketPrice: price}))
    };


    return <div className={`box`}>
        <div className={`mt-3`}>
            <h5>Price Range</h5>
            <div className={`px-2`}><Slider
                min={0}
                max={5000}
                step={100}
                progress
                style={{marginTop: 16}}
                value={value}
                onChange={value => {
                    setValue(value);
                }}
                onChangeCommitted={priceChangeHandler}
            /></div>
            <p className={`p-3 text-center mb-3`}>${value} USD</p>
            <h5 className={`mt-3 mb-2`}>Airlines</h5>
            <div className={`airlinesFilter`}>
                <CheckboxGroup
                    name="checkbox-group"
                    value={airlineId}
                    onChange={value => {
                        airlineFilterHandler(value);
                    }}>
                    {
                        airlines.map((item, index) => {
                            return <Checkbox value={item.id}>{item.airlineName}</Checkbox>
                        })
                    }

                </CheckboxGroup>
            </div>

        </div>
    </div>
}

export default SearchFlightFilter;