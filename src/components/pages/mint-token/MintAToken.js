import { useState } from "react";
import {mintToken} from "../../data/WnftContract"
import { Link, useSearchParams } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { intValidate } from "../../../utils/validators";
import GenericFieldSetError from "../../generics/GenericFieldSetError";

const loading_gif = require('../../../images/Loading_Animation.gif');


function MintAToken(props){

    
    const [withCID, setWithCID] = useState(true); 
    const [tokenIDToMint, setTokenIDToMint] = useState(''); 
    const [initTokenCID, setInitTokenCID] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const [isMinted, setIsMinted] = useState(false); 
    const [isError, setIsError] = useState(''); 


    let [searchParams, setSearchParams] = useSearchParams();

    const notIsContractLoaded = !props.isContractLoaded

    const tokenIDToMintChange = (e) => {setTokenIDToMint(e.target.value);setIsError('')}
    const initTokenCIDChange = (e) => {setInitTokenCID(e.target.value);setIsError('')}

    const callMintToken = () => {
        setIsMinted(false);
        const validator = intValidate(tokenIDToMint)
        if (validator.valid){
            setIsLoading(true);
            mintToken(props.contractDetails.contractAddress, props.contractDetails.contractNetwork, tokenIDToMint, initTokenCID, withCID, props.contractDetails.mintPrice )
            .then(() => {
                setTokenIDToMint('');
                setInitTokenCID('');
                searchParams.set('token-id', tokenIDToMint);
                setIsLoading(false);
                setIsMinted(true);
            }).catch((e) => {
                setIsError('Error from contract:' + e);
                setIsLoading(false);
            });
        }else{
            setIsError(validator.msg);
        }
    }

    
    const withCIDRadioButtonChange = (e) => { setWithCID(e.target.value=='with')}


    return (
<>
  <ReactTooltip />
    <h4 className="mb-3">Mint a Token</h4>
    
    <div className='py-3'>
        <div className="col-12  my-3  d-flex">
            <div className="mx-3">
                <input type="radio" value="with" name="token-cid" checked={withCID} disabled={notIsContractLoaded ? 'disabled' : null}  onChange={withCIDRadioButtonChange} /> With CID
            </div>
            <div>
                <input type="radio" value="without" name="token-cid" checked={!withCID} disabled={notIsContractLoaded ? 'disabled' : null}  onChange={withCIDRadioButtonChange} /> Without CID
            </div>
            
        </div>
        <div className="col-12  my-3">
            <label htmlFor="token-id-to-mint" className="form-label">Token ID to mint</label>
            <div className="input-group">
            
            <input type="text" className="form-control shadow-lg rounded" name="token-id-to-mint" id="token-id-to-mint" disabled={notIsContractLoaded ? 'disabled' : null} value={tokenIDToMint} onChange={tokenIDToMintChange} />
            <button type="submit" className="btn btn-secondary" onClick={callMintToken} disabled={notIsContractLoaded ? 'disabled' : null}>MINT</button>
            </div>
            
        </div>
        {withCID && (<div className="col-12 my-3">
            <label htmlFor="init-cid-to-token" className="form-label">Initial token offchain metadata</label>
            <div className="input-group">
                <input type="text" className="form-control shadow-lg rounded" name="init-cid-to-token" id="init-cid-to-token" value={initTokenCID} disabled={notIsContractLoaded ? 'disabled' : null} onChange={initTokenCIDChange} placeholder="Example: ipns://k51qzi5uqu5djwbl0zcd4g9onue26a8nq97c0m9wp6kir1gibuyjxpkqpoxwag" />
            </div>
        </div>) }
        { isLoading && (<div className="col-12 d-flex"><img src={loading_gif} /></div>)}
        {isMinted && (<div className="search-results my-3 p-3">
            <div className="mt-2">Minted Successfully - <Link to={{ pathname: '/token-profile', search: searchParams.toString()}}>Token Profile</Link></div>
        </div>)}
        {isError &&  ((<GenericFieldSetError key="minted_token_error" errorMsg={isError} />)) }
    </div>
</>)
}

export default MintAToken;