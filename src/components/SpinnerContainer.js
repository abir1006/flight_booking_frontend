import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";

const SpinnerContainer = () => {
    const show = useSelector(state => state?.spinnerContainer?.show);
    if (!show) {
        return null;
    }
    return <div className={`spinner_container`}>
        <FontAwesomeIcon icon={faSpinner} spin={true}/>
    </div>
}

export default SpinnerContainer;