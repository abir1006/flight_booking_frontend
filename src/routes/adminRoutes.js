import AdminLayout from "../layout/AdminLayout";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./privateRoute";
import Users from "../pages/admin/Users";
import AirportList from "../pages/admin/airport/AirportList";
import AirportAdd from "../pages/admin/airport/AirportAdd";
import PassengerList from "../pages/admin/passenger/PassengerList";
import BookingList from "../pages/admin/booking/BookingList";
import FlightList  from "../pages/admin/flight/FlightList";
import FlightAdd  from "../pages/admin/flight/FlightAdd";


const AdminRoutes = () => {

    return <Routes>
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" index element={
                <PrivateRoute roles={['ADMIN']}>
                    <Dashboard/>
                </PrivateRoute>
            }/>
            <Route path="passenger/list" element={
                <PrivateRoute roles={['ADMIN']}>
                    <PassengerList/>
                </PrivateRoute>
            }/>
            <Route path="airport/list" element={
                <PrivateRoute roles={['ADMIN']}>
                    <AirportList/>
                </PrivateRoute>
            }/>
            <Route path="booking/list" element={
                <PrivateRoute roles={['ADMIN']}>
                    <BookingList/>
                </PrivateRoute>
            }/>

            <Route path="flight/list" element={
                <PrivateRoute roles={['ADMIN']}>
                    <FlightList/>
                </PrivateRoute>
            }/>

            <Route path="flight/add" element={
                <PrivateRoute roles={['ADMIN']}>
                    <FlightAdd/>
                </PrivateRoute>
            }/>

        
            <Route path="airport/add" element={
                <PrivateRoute roles={['ADMIN']}>
                    <AirportAdd/>
                </PrivateRoute>
            }/>
        </Route>
    </Routes>

}

export default AdminRoutes;