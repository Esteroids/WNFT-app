import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTokenByTokenID, setTokenURI } from "../../data/WnftContract";
import BottomNav from "../../bottom-nav/BottomNav";
import GenericFieldSet from '../../generics/GenericFieldSet';
import TokenOnchainMetadataValues from "./TokenOnchainMetadataValues"




function TokenProfile(props){

  const [searchParams, setSearchParams] = useSearchParams();
  const [tokenDetails, setTokenDetails] = useState({});
  //const [tokenURIValue, setTokenURIValue] = useState(tokenDetails?.tokenURI||'');

  const callSetTokenURI = (tokenURIValue) => {
    let promise = new Promise(function (resolve, reject) {
      setTokenURI(props?.contractDetails?.contractAddress, tokenDetails.id, tokenURIValue)
      .then(() => {setTokenDetails({...tokenDetails, tokenURI: tokenURIValue});resolve(true);})
      .catch(() => reject('error'))
    });
    return promise;
  }

  const [transferToValue, setTransferToValue] = useState('');


  const tokenId = searchParams.get('token-id')

  const transferToValueChange = (e) => setTransferToValue(e.target.value)


  const notTokenOwner = !tokenDetails?.isTokenOwner;
    
  useEffect(() => {
    if(tokenId && props.contractDetails?.contractAddress){
      const withData = true;
      getTokenByTokenID(props.contractDetails?.contractAddress, tokenId, withData, props.contractDetails.tokenMetadataField).then((resp)=>{
        setTokenDetails(resp)
      })
    }
  }, [tokenId, props.contractDetails])

  
    return (
  <>
    <h2 className="mb-3 token-profile-title">Token profile</h2>
    <div className="mx-5 token-profile">
        <h4>Contract details</h4>
        <div className='py-2'>
            <div className="col-12  my-3">
                <label htmlFor="ens-node" className="form-label">Name</label>
                <div className="show-value">{props.contractDetails?.name||''}</div>
            </div>
            <div className="col-12 my-3">
                <label htmlFor="website-cid" className="form-label">Address</label>
                <div className="show-value">{props.contractDetails?.contractAddress||''}</div>
                
            </div>
            <div className="col-12  my-3">
                <label htmlFor="ens-resolver" className="form-label">Symbol</label>
                <div className="show-value">{props.contractDetails?.symbol||''}</div>
                
            </div>
        </div>
        <h4>Token details</h4>
        <div className='py-2'>
            <div className="col-12  my-3">
                <label htmlFor="ens-node" className="form-label">ID</label>
                <div className="show-value">{tokenDetails?.id||''}</div>
            </div>
            <div className="col-12 my-3">
                <label htmlFor="website-cid" className="form-label">Owner</label>
                <div className="show-value">{tokenDetails?.owner||''}</div>
            </div>
            <GenericFieldSet mainClass="col-7  my-3" key="token-uri-key" genericFieldLabel="Content" genericFieldID="token-uri" notOwnerAndNotLogin="" notOwner={notTokenOwner}  callSet={callSetTokenURI} initFieldValue={tokenDetails?.tokenURI} />

            <div className="col-7  my-5">
                <div className="input-group">
                <input type="text" disabled={notTokenOwner ? 'disabled' : null} className="form-control shadow-lg rounded" name="transfer-to" id="transfer-to" value={transferToValue} onChange={transferToValueChange}  />
                <button type="submit" disabled={notTokenOwner ? 'disabled' : null} className="btn btn-secondary " >TRANSFER</button>
                </div>
                
            </div>
        </div>
        <h4>Onchain metadata</h4>
        {props.contractDetails?.tokenMetadataField?props.contractDetails?.tokenMetadataField[0].map((_, i) => {       
  return (<TokenOnchainMetadataValues key={"token_onchain_values_" + i.toString()} indexField={i} tokenMetadataField={props.contractDetails.tokenMetadataField} notTokenOwner={notTokenOwner} contractDetails={props.contractDetails} tokenId={tokenDetails?.id} />) 
}):''}
    </div>
    <BottomNav />
  </>)
  }

  export default TokenProfile;