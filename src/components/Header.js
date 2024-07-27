import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane} from "@fortawesome/free-solid-svg-icons/faPlane";
import {Link} from "react-router-dom";

const Header = () => {
    return <div className={`header`}>
        <div className={`row`}>
            <div className={`col-8 py-5`}>
                <Link to={'/'}>
                    <FontAwesomeIcon style={{color: 'darkred', fontSize: '50px'}} icon={faPlane} size={`xl`}/>
                </Link>
            </div>
            <div className={`col-4 py-5 text-end`}>
                <Link to={'/login'}>Login</Link> / <Link to={'/register'}>Register</Link>
            </div>
        </div>
    </div>
}

export default Header;