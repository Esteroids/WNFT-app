import { useState } from "react";
import {mintToken} from "../../data/WnftContract"

function MintAToken(props){

    
    const [withCID, setWithCID] = useState(true); 
    const [tokenIDToMint, setTokenIDToMint] = useState(''); 
    const [initTokenCID, setInitTokenCID] = useState(''); 


    const tokenIDToMintChange = (e) => setTokenIDToMint(e.target.value)
    const initTokenCIDChange = (e) => setInitTokenCID(e.target.value)

    const callMintToken = () => {
        mintToken(props.contractDetails.contractAddress, tokenIDToMint, initTokenCID, withCID, props.contractDetails.mintPrice )
        .then(() => {setTokenIDToMint('');setInitTokenCID('')})
    }



    const withCIDRadioButtonChange = (e) => { setWithCID(e.target.value=='with')}

    const notIsContractLoaded = !props.isContractLoaded

    return (
<>
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
            <label htmlFor="init-cid-to-token" className="form-label">Init CID to token</label>
            <div className="input-group">
                <input type="text" className="form-control shadow-lg rounded" name="init-cid-to-token" id="init-cid-to-token" value={initTokenCID} disabled={notIsContractLoaded ? 'disabled' : null} onChange={initTokenCIDChange} />
            </div>
        </div>) }
    </div>
</>)
}

export default MintAToken;