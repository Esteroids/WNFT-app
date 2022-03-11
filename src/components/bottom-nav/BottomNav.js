
import { useLocation, Link } from "react-router-dom";
import PagesInfo from "../pages/PagesInfo";
import ArrowIcon from "../svg-icons/ArrowIcon";

function BottomNav(){
    const { search, pathname } = useLocation();

    let page_info = PagesInfo[pathname.substring(1)||'general-information']
    const prev_label = page_info?.prev && (page_info?.prev_label || PagesInfo[page_info?.prev].label)

    const next_label = page_info?.next && (page_info?.next_label || PagesInfo[page_info?.next].label)

    return (
<div className="d-flex flex-wrap justify-content-between align-items-center nav-bottom">
    <div className="col-md-4 d-flex align-items-center">
        {page_info?.prev?(<Link to={PagesInfo[page_info?.prev].route + search}><ArrowIcon className="mx-2 rotate-arrow" />{prev_label}</Link>):''}
    </div>
    <div className="col-md-4 justify-content-end  d-flex">
        {page_info?.next?(<Link to={PagesInfo[page_info?.next].route + search}>{next_label}<ArrowIcon className="mx-2" /></Link>):''}
    </div>
</div>
)
}

export default BottomNav;