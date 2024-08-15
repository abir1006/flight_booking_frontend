import { Link, useLocation, useNavigate } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import {
    FaMoneyBill, FaMoneyCheckDollar,
    FaPaperPlane,
    FaPlaneArrival,
    FaPlaneUp,
} from "react-icons/fa6";

import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import EventDetailIcon from '@rsuite/icons/EventDetail';
import OffIcon from '@rsuite/icons/Off';
import ListIcon from '@rsuite/icons/List';
import { logout } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const curPath = location.pathname.split("/")[2];

    const [activeKey, setActiveKey] = useState('1');

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
                        eventKey="1" icon={<DashboardIcon />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Menu placement="rightStart" eventKey="2" title="Passenger"
                        icon={<PeoplesIcon />}>
                        <Nav.Item
                            eventKey="2-1"
                            onClick={e => navigate("/admin/passenger/list")}>
                            List
                        </Nav.Item>
                    </Nav.Menu>

                    <Nav.Menu placement="rightStart" eventKey="3" title="Booking"
                        icon={<EventDetailIcon className={`rs-icon`} width={`1em`} />}>
                        <Nav.Item
                            onClick={e => navigate("/admin/booking/list")}
                            eventKey="3-1">
                            List
                        </Nav.Item>
                    </Nav.Menu>

                    <Nav.Menu placement="rightStart" eventKey="4" title="Flight"
                        icon={<FaPlaneUp className={`rs-icon`} width={`1em`} />}>
                        <Nav.Item
                            onClick={e => navigate("/admin/flight/list")}
                            eventKey="4-1">
                            List
                        </Nav.Item>

                        <Nav.Item
                            onClick={e => navigate("/admin/flight/add")}
                            eventKey="4-2">
                            Add
                        </Nav.Item>
                    </Nav.Menu>

                
                    <Nav.Menu placement="rightStart" eventKey="5" title="Airport"
                        icon={<FaPlaneArrival className={`rs-icon`} width={`1em`} />}>
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

                    <Nav.Menu placement="rightStart" eventKey="6" title="Payment"
                              icon={<FaMoneyCheckDollar className={`rs-icon`} width={`1em`} />}>
                        <Nav.Item
                            onClick={e => navigate("/admin/payment/history")}
                            eventKey="6-1">
                            History
                        </Nav.Item>
                    </Nav.Menu>

                    <Nav.Item
                        eventKey="6"
                        onClick={logoutHandler}
                        icon={<OffIcon />}>
                        Logout
                    </Nav.Item>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    </div>
}

export default Sidebar;