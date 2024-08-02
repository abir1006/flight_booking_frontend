import AdminLayout from "../layout/AdminLayout";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./privateRoute";
import Users from "../pages/admin/Users";
import Airports from "../pages/admin/Airports";


const AdminRoutes = () => {

    return <Routes>
        {/*<Route element={<PrivateRoutes/>}>*/}
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
            <Route path="airports" element={
                <PrivateRoute roles={['ADMIN']}>
                    <Airports/>
                </PrivateRoute>
            }/>
        </Route>
        {/*</Route>*/}
    </Routes>

}

export default AdminRoutes;