import {Panel} from "rsuite";

const SearchFlightResult = ({data}) => {
    return <Panel className={`search-result-row mb-3`} bordered>
        <div className={`row`}>
            <div className={`col-2`}>
                <img width={`75`}
                     src={`https://cdn.logojoy.com/wp-content/uploads/2018/05/30142251/194.png`}/>
            </div>
            <div className={`col-2`}>
                <p><strong>DAC - ORD</strong> <br/>
                    Etihad Airways</p>
            </div>
            <div className={`col-3`}>
                <p>
                    <strong>03:30 PM</strong> <br/>
                    11 Aug, Sunday <br/>
                    Hazrat Shahzalal Airport
                </p>
            </div>
            <div className={`col-3`}>
                <p>
                    <strong>04:45 PM</strong> <br/>
                    12 Aug, Sunday <br/>
                    Dubai International ...
                </p></div>
            <div className={`col-2 text-center`}>
                <p><strong>$505 USD</strong>
                    <button className={`btn mx-3 mt-2`}>
                        Select >
                    </button>
                </p>
            </div>
        </div>
    </Panel>
}

export default SearchFlightResult;