import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SpinnerContainer = () => {
    return <div className={`spinner_container`}><FontAwesomeIcon icon={faSpinner} spin={true} /></div>
}

export default SpinnerContainer;