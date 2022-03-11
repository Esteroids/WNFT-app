import { useState } from "react";
import BrowseByTokenIDResult from "./BrowseByTokenIDResult"
import {getTokenByTokenID} from "../../data/WnftContract"
import {intValidate} from "../../../utils/validators"
import GenericFieldSetError from "../../generics/GenericFieldSetError";
const loading_gif = require('../../../images/Loading_Animation.gif');


function BrowseByTokenID(props){

  const [tokenIDValue, setTokenIDValue] = useState('');
  const [tokenSearchResults, setTokenSearchResults] = useState({}); 
  const [isError, setIsError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 


  const callGetTokenByID = () => {
    if (intValidate(tokenIDValue)){
      setIsLoading(true);
      getTokenByTokenID(props.contractDetails.contractAddress, tokenIDValue).then((resp) => { setTokenSearchResults( resp ); setIsLoading(false);})
    } 
    else setIsError('error')
  }

  const tokenIDChange = (e) => {setIsError('');setTokenIDValue(e.target.value)}

  const notIsContractLoaded = !props.isContractLoaded


    return (
<div className="col-12  my-3">
  <label htmlFor="browse-token-id" className="form-label">WNFT Token ID</label>
  <div className="input-group">
    <input type="text" className="form-control shadow-lg rounded" name="browse-token-id" id="browse-token-id" onChange={tokenIDChange} value={tokenIDValue} disabled={notIsContractLoaded ? 'disabled' : null}  />
    <button type="submit" className="btn btn-blue" onClick={callGetTokenByID} disabled={notIsContractLoaded ? 'disabled' : null}>SHOW</button>
  </div>
  {!isError && (tokenSearchResults?.tokenExists !== undefined) && (<BrowseByTokenIDResult tokenSearchResults={tokenSearchResults} key="browse_by_token_id_results" />) }
  {isError &&  ((<GenericFieldSetError  key="browse_by_token_id_input_error" />)) }
  { isLoading && (<img src={loading_gif} />)}

</div>)
}

export default BrowseByTokenID;