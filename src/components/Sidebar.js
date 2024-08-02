import {Link, useLocation, useNavigate} from "react-router-dom";
import {Nav, Sidenav} from "rsuite";
import {
    FaPlaneArrival,
    FaPlaneUp,
} from "react-icons/fa6";

import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import EventDetailIcon from '@rsuite/icons/EventDetail';
import OffIcon from '@rsuite/icons/Off';
import {logout} from "../features/authSlice";
import {useDispatch} from "react-redux";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const curPath = location.pathname.split("/")[2];

    console.log(curPath);

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    }

    return <div className={`col-2`}>

        <Sidenav>
            <Sidenav.Body>
                <Nav activeKey="1">
                    <Nav.Item
                        onClick={ e => navigate("/admin/dashboard")}
                        eventKey={curPath == 'dashboard' && '1' || '0'} icon={<DashboardIcon/>}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey={curPath == 'passengers' && '1' || '0'} icon={<PeoplesIcon/>}>
                        All Passengers
                    </Nav.Item>
                    <Nav.Item eventKey="0" icon={<EventDetailIcon/>}>
                        All Bookings
                    </Nav.Item>
                    <Nav.Item eventKey="4" icon={<FaPlaneUp className={`rs-icon`} width={`1em`} />}>
                        Flights
                    </Nav.Item>
                    <Nav.Item
                        onClick={ e => navigate("/admin/airports")}
                        eventKey={curPath == 'airports' && '1' || '0'}
                        icon={<FaPlaneArrival className={`rs-icon`} width={`1em`} />}>
                        Airports
                    </Nav.Item>
                    <Nav.Item
                        eventKey="6"
                        onClick={logoutHandler}
                        icon={<OffIcon/>}>
                        Logout
                    </Nav.Item>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    </div>
}

export default Sidebar;