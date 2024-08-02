import {useLocation} from "react-router-dom";

const TopNav = () => {

    const location = useLocation();
    const curPath = location.pathname.split("/")[2];
    const action = location.pathname.split("/")[3];
    const prefix = action ? action.charAt(0).toUpperCase() + action.slice(1) + ' ' : '';
    const pageTitle = curPath.charAt(0).toUpperCase() + curPath.slice(1);

    return <div className={`box mb-3`}>
        <div className={`adminPageTitle`}>{prefix + pageTitle}</div>
    </div>
}

export default TopNav;