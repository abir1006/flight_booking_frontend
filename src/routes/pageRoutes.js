import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LandingPage from "../pages/LandingPage";
import FlightBooking from "../pages/FlightBooking";
import MyBookings from "../pages/MyBookings";


const PageRoutes = () => {

    return <Routes>
        <Route path={"/"} element={<LandingPage />}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route path={"/flight-booking"} element={<FlightBooking/>}/>
        <Route path={"/my-bookings"} element={<MyBookings/>}/>
    </Routes>

}

export default PageRoutes;