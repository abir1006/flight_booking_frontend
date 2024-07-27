import AdminLayout from "../layout/AdminLayout";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./privateRoute";
import Users from "../pages/admin/Users";


const AdminRoutes = () => {

    return <Routes>
        {/*<Route element={<PrivateRoutes/>}>*/}
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" index element={
                <PrivateRoute roles={['ADMIN', 'SELLER']}>
                    <Dashboard/>
                </PrivateRoute>
            }/>
            <Route path="users" element={
                <PrivateRoute roles={['ADMIN', 'SELLER']}>
                    <Users/>
                </PrivateRoute>
            }/>
        </Route>
        {/*</Route>*/}
    </Routes>

}

export default AdminRoutes;