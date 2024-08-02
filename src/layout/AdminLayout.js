import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const AdminLayout = () => {
    return (
        <div className={`container-fluid my-3`}>
            <div className={`row`}>
                <Sidebar/>
                <div className="col-10">
                    <div className="main__content">
                        <TopNav/>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
