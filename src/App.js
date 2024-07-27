import 'bootstrap/dist/css/bootstrap.min.css'
import 'rsuite/dist/rsuite.min.css';
import './app.css'
import {BrowserRouter, Routes} from 'react-router-dom'
import AdminRoutes from "./routes/adminRoutes";
import PageRoutes from "./routes/pageRoutes";
import Popup from "./components/Popup";

function App() {
    return (
        <BrowserRouter>
            <AdminRoutes/>
            <PageRoutes/>
            <Popup />
        </BrowserRouter>
    )
}

export default App
