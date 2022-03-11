import { Link, useSearchParams } from "react-router-dom";


function BrowseByTokenIDResultShow(props){

    let [searchParams, setSearchParams] = useSearchParams();

    searchParams.set('token-id', props.tokenID)

    return (
<div className="mt-2"><Link to={{ pathname: '/token-profile', search: searchParams.toString()}}>Profile for token ID: {props.tokenID}</Link></div>)
}

export default BrowseByTokenIDResultShow;