import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LandingPage from "../pages/LandingPage";
import FlightBooking from "../pages/FlightBooking";
import MyBookings from "../pages/MyBookings";
import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./privateRoute";


const PageRoutes = () => {

    return <Routes>
        <Route path={"/"} element={<LandingPage/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route path={"/flight-booking"} element={<FlightBooking/>}/>
        <Route path={"/my-bookings"} element={<PrivateRoute roles={['ADMIN', 'USER']}>
            <MyBookings/>
        </PrivateRoute>}/>

    </Routes>

}

export default PageRoutes;