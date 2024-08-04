import {Checkbox, Slider} from "rsuite";
import {useEffect, useState} from "react";

const SearchFlightFilter = () => {

    const [airlines, setAirlines] = useState([])

    useEffect(() => {

    }, []);

    const [value, setValue] = useState(0);

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
            /></div>
            <p className={`p-3 text-center mb-3`}>${value} USD</p>
            <h5 className={`mt-3 mb-2`}>Airlines</h5>
            <div>
                <ul>
                    <li><Checkbox>Qatar Airways</Checkbox></li>
                    <li><Checkbox>Emirates</Checkbox></li>
                    <li><Checkbox>Turkish Airlines</Checkbox></li>
                </ul>
            </div>

        </div>
    </div>
}

export default SearchFlightFilter;