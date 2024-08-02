import AdminLayout from "../layout/AdminLayout";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./privateRoute";
import Users from "../pages/admin/Users";
import AirportList from "../pages/admin/airport/AirportList";
import AirportAdd from "../pages/admin/airport/AirportAdd";


const AdminRoutes = () => {

    return <Routes>
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" index element={
                <PrivateRoute roles={['ADMIN']}>
                    <Dashboard/>
                </PrivateRoute>
            }/>
            <Route path="passengers" element={
                <PrivateRoute roles={['ADMIN']}>
                    <Users/>
                </PrivateRoute>
            }/>
            <Route path="airport/list" element={
                <PrivateRoute roles={['ADMIN']}>
                    <AirportList/>
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