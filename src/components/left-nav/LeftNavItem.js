import ArrowIcon from '../svg-icons/ArrowIcon'
import { NavLink, useLocation } from "react-router-dom";

function LeftNavItem(props){
    const { search } = useLocation();
    return (
<li className="list-group-item lh-sm">
    <NavLink to={props.itemLink + search} className="my-0  d-flex justify-content-between">
        <h6>{props.itemLabel}</h6>
        <ArrowIcon />
    </NavLink>
</li>)
}

export default LeftNavItem;