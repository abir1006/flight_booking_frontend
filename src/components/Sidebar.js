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
import ListIcon from '@rsuite/icons/List';
import {logout} from "../features/authSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const curPath = location.pathname.split("/")[2];

    const [activeKey, setActiveKey] = useState('1');

    console.log(curPath);

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    }

    return <div className={`col-2`}>

        <Sidenav>
            <Sidenav.Body>
                <Nav activeKey={activeKey} onSelect={setActiveKey}>
                    <Nav.Item
                        onClick={e => navigate("/admin/dashboard")}
                        eventKey="1" icon={<DashboardIcon/>}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey="2" icon={<PeoplesIcon/>}>
                        Passenger
                    </Nav.Item>
                    <Nav.Item eventKey="3" icon={<EventDetailIcon/>}>
                        Booking
                    </Nav.Item>
                    <Nav.Item eventKey="4" icon={<FaPlaneUp className={`rs-icon`} width={`1em`}/>}>
                        Flight
                    </Nav.Item>
                    <Nav.Menu placement="rightStart" eventKey="5" title="Airport" icon={<FaPlaneArrival className={`rs-icon`} width={`1em`}/>}>
                        <Nav.Item
                            onClick={e => navigate("/admin/airport/list")}
                            eventKey="5-1">
                            List
                        </Nav.Item>
                        <Nav.Item
                            onClick={e => navigate("/admin/airport/add")}
                            eventKey="5-2">
                            Add
                        </Nav.Item>
                    </Nav.Menu>
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