import { useState } from "react";
import BrowseByTokenIDResult from "./BrowseByTokenIDResult"
import {getTokenByNthNum} from "../../data/WnftContract"
import {intValidate} from "../../../utils/validators"
import GenericFieldSetError from "../../generics/GenericFieldSetError";

const loading_gif = require('../../../images/Loading_Animation.gif');



function BrowseByNthToken(props){

  const [nthTokenValue, setNthTokenValue] = useState('');
  const [tokenSearchResults, setTokenSearchResults] = useState({}); 
  const [isError, setIsError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  const callGetNthToken = () => {
    const validator = intValidate(nthTokenValue)
    if (validator.valid) {
      setIsLoading(true);
      getTokenByNthNum(props.contractDetails.contractAddress, props.contractDetails.contractNetwork, nthTokenValue).then((resp) => { setTokenSearchResults( resp );setIsLoading(false);})
    }
    else setIsError(validator.msg)
  }

  const getNthTokenKeyDown = (e) => { e.key === 'Enter' && callGetNthToken();}


  const tokenNumChange = (e) => {setIsError('');setNthTokenValue(e.target.value)}

  const notIsContractLoaded = !props.isContractLoaded


    return (
<div className="col-12  my-3">
  <label htmlFor="browse-nth-token" className="form-label">Token number</label>
  <div className="input-group">
    <input type="text" className="form-control shadow-lg rounded" name="browse-nth-token" id="browse-nth-token" onChange={tokenNumChange} onKeyDown={getNthTokenKeyDown} value={nthTokenValue} disabled={notIsContractLoaded ? 'disabled' : null}  />
    <button type="submit" className="btn btn-blue" onClick={callGetNthToken} disabled={notIsContractLoaded ? 'disabled' : null}>SHOW</button>
  </div>
  {!isError && (tokenSearchResults?.tokenExists !== undefined) && (<BrowseByTokenIDResult tokenSearchResults={tokenSearchResults} key="browse_nth_token_results" />) }
  {isError &&  ((<GenericFieldSetError key="browse_nth_token_input_error" errorMsg={isError} />)) }
  { isLoading && (<img src={loading_gif} />)}

</div>)
}

export default BrowseByNthToken;