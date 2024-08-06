import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane} from "@fortawesome/free-solid-svg-icons/faPlane";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../features/authSlice";
import {Dropdown} from "rsuite";
import {setPrevRoute} from "../features/userRouteSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authUser = useSelector(state => state.auth);

    const logoutHandler = () => {
        dispatch(setPrevRoute(null))
        dispatch(logout());
        navigate("/login");
    }

    return <div className={`header`}>
        <div className={`row`}>
            <div className={`col-8 py-5`}>
                <Link to={'/'}>
                    <FontAwesomeIcon style={{color: 'darkred', fontSize: '50px'}} icon={faPlane} size={`xl`}/>
                </Link>
            </div>
            <div className={`col-4 py-5 text-end`}>
                {!authUser.isAuthenticated && <><Link to={'/login'}>Login</Link> / <Link
                    to={'/register'}>Register</Link></>}
                {authUser.isAuthenticated &&
                    <Dropdown title={`Welcome ${authUser?.user?.firstname || authUser?.user?.email}`}>
                        <Dropdown.Item>My bookings</Dropdown.Item>
                        <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                    </Dropdown>}
            </div>
        </div>
    </div>
}

export default Header;