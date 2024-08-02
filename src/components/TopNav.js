import {useLocation} from "react-router-dom";

const TopNav = () => {

    const location = useLocation();
    const curPath = location.pathname.split("/")[2];

    const pageTitle = curPath.charAt(0).toUpperCase() + curPath.slice(1);

    return <div className={`box mb-3`}>
        <div className={`adminPageTitle`}>{pageTitle}</div>
    </div>
}

export default TopNav;