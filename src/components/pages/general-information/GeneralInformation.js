import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ethers } from "ethers";
import ReactTooltip from 'react-tooltip';
import {setWnftOffchainMetadata} from "../../data/WnftContract"
import GenericFieldSet from '../../generics/GenericFieldSet';

const loading_gif = require('../../../images/Loading_Animation.gif');




function GeneralInformation(props){

  const [searchParams, setSearchParams] = useSearchParams();
  const [contractAddressValue, setContractAddressValue] = useState(props.contractAddress); 
 

  const callFetchContract = () => {
    if(ethers.utils.isAddress(contractAddressValue)){
      setSearchParams({ contract: contractAddressValue })
      props.setContractAddress(contractAddressValue);
    }else{
      console.log('invalid address', contractAddressValue)
    }

  }
  const ContractAddressChange = (e) => setContractAddressValue(e.target.value)

  const callSetWnftOffchainMetadata = (wnftOffchainMetadataValue) => {
    let promise = new Promise(function (resolve, reject) {
      setWnftOffchainMetadata(props?.contractDetails?.contractAddress, wnftOffchainMetadataValue)
      .then(() => {props.setContractDetails({...props.contractDetails, wnftOffchainMetadata: wnftOffchainMetadataValue});resolve(true);})
      .catch(() => reject('error'))
    });
    return promise;
  }

 


  const notOwner = (!props.contractDetails?.isWnftOwner);

  const notOwnerAndNotLogin = (notOwner && 'Only the owner may modify this data.') || ''

  return (
<>
<ReactTooltip />
  <h4 className="mb-3">General Information</h4>
  <div className='py-3'>
    <div className="col-12  my-3">
      <label htmlFor="contract-address" className="form-label">Contract Address</label>
      <div className="input-group">
        
        <input  type="text" className="form-control shadow-lg rounded" name="contract-address" id="contract-address" onChange={ContractAddressChange} value={contractAddressValue} />
        <button  type="submit" className="btn btn-blue"  onClick={callFetchContract}>FETCH</button>
      </div>
      { props.isContractLoading && (<img src={loading_gif} />)}
    </div>
    <div className="col-12 my-3">
      <label htmlFor="contract-name" className="form-label">Name</label>
      <div className="input-group">
        {props.contractDetails?.name||''}
      </div>
    </div>
    <div className="col-12  my-3">
      <label htmlFor="contract-symbol" className="form-label">Symbol</label>
      <div className="input-group">
        {props.contractDetails?.symbol||''} 
      </div>
    </div>
   
    <GenericFieldSet key="wnft-offchain-metadata-key" genericFieldLabel="WNFT offchain metadata" genericFieldID="wnft-offchain-metadata" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetWnftOffchainMetadata} initFieldValue={props.contractDetails?.wnftOffchainMetadata} />

  </div>
</>)
}

export default GeneralInformation;