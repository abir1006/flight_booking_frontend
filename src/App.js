import 'bootstrap/dist/css/bootstrap.min.css'
import 'rsuite/dist/rsuite.min.css';
import './app.css'
import {BrowserRouter, Routes} from 'react-router-dom'
import AdminRoutes from "./routes/adminRoutes";
import PageRoutes from "./routes/pageRoutes";
import Popup from "./components/Popup";
import SpinnerContainer from "./components/SpinnerContainer";

function App() {
    return (
        <BrowserRouter>
            <AdminRoutes/>
            <PageRoutes/>
            <Popup />
            <SpinnerContainer />
        </BrowserRouter>
    )
}

export default App
