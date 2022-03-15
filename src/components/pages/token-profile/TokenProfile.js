import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getTokenByTokenID, setTokenURI, transferToken } from "../../data/WnftContract";
import BottomNav from "../../bottom-nav/BottomNav";
import GenericFieldSet from '../../generics/GenericFieldSet';
import TokenOnchainMetadataValues from "./TokenOnchainMetadataValues"
import {ethAddressValidate} from "../../../utils/validators"


function TokenProfile(props){

  const [searchParams, _] = useSearchParams();
  const [tokenDetails, setTokenDetails] = useState({});

  const tokenId = searchParams.get('token-id')

  useEffect(() => {
    if(tokenId && props.contractDetails?.contractAddress){
      const withData = true;
      getTokenByTokenID(props.contractDetails?.contractAddress, tokenId, withData, props.contractDetails.tokenOnchainMetadataDefenitions).then((resp)=>{
        setTokenDetails(resp)
      })
    }
  }, [tokenId, props.contractDetails])

  const notTokenOwner = !tokenDetails?.isTokenOwner;


  const callSetTokenURI = (tokenURIValue) => {
    let promise = new Promise(function (resolve, reject) {
      setTokenURI(props?.contractDetails?.contractAddress, tokenDetails.id, tokenURIValue)
      .then(() => {setTokenDetails({...tokenDetails, tokenURI: tokenURIValue});resolve(true);})
      .catch(() => reject('error'))
    });
    return promise;
  }

  const callTransferTokenTo = (transferTokenTo) => {
    let promise = new Promise(function (resolve, reject) {
      transferToken(props?.contractDetails?.contractAddress, transferTokenTo, tokenDetails.id)
      .then(() => {
        setTokenDetails({...tokenDetails, owner: transferTokenTo, isTokenOwner: false});
        resolve(true);
      })
      .catch(() => reject('error'))
    });
    return promise;
  }

  
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
            <GenericFieldSet mainClass="col-7  my-3" key="token-uri-key" genericFieldLabel="Offchain metadata" genericFieldID="token-uri" notOwnerAndNotLogin="" notOwner={notTokenOwner}  callSet={callSetTokenURI} initFieldValue={tokenDetails?.tokenURI} />

            <GenericFieldSet mainClass="col-7  my-5" key="transfer-to-key" buttonLabel="TRANSFER" genericFieldLabel="" emptyLabel={true} genericFieldID="transfer-to" notOwnerAndNotLogin="" notOwner={notTokenOwner}  callSet={callTransferTokenTo} initFieldValue="" validator={ethAddressValidate} />

           
        </div>
        <h4>Onchain metadata</h4>
        {props.contractDetails?.tokenOnchainMetadataDefenitions && Object.keys(props.contractDetails.tokenOnchainMetadataDefenitions).map((fieldName, i) => {       
  return (<TokenOnchainMetadataValues key={"token_onchain_values_" + i.toString()} indexField={i} item={props.contractDetails.tokenOnchainMetadataDefenitions[fieldName]} notTokenOwner={notTokenOwner} contractDetails={props.contractDetails} tokenId={tokenDetails?.id} tokenDetails={tokenDetails} />) 
})}
    </div>
    <BottomNav />
  </>)
  }

  export default TokenProfile;