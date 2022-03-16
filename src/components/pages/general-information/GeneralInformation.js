import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import {setWnftOffchainMetadata, transferWntOwnership} from "../../data/WnftContract"
import GenericFieldSet from '../../generics/GenericFieldSet';
import { ethAddressValidate, contentUriValidate } from "../../../utils/validators";
import GenericFieldSetError from "../../generics/GenericFieldSetError";


const loading_gif = require('../../../images/Loading_Animation.gif');




function GeneralInformation(props){

  const [searchParams, setSearchParams] = useSearchParams();
  const [contractAddressValue, setContractAddressValue] = useState(props.contractAddress); 
  const [isError, setIsError] = useState(''); 


  const notOwner = (!props.contractDetails?.isWnftOwner);

  const notOwnerAndNotLogin = (notOwner && 'Only the owner may modify this data.') || ''
 

  const callFetchContract = () => {
    setIsError('')
    const validator = ethAddressValidate(contractAddressValue)
    if(validator.valid){
      setSearchParams({ contract: contractAddressValue })
      props.setContractAddress(contractAddressValue);
    }else{
      setIsError(validator.msg)
    }

  }
  const ContractAddressChange = (e) => setContractAddressValue(e.target.value)
  const fetchContractKeyDown  = (e) => { e.key === 'Enter' && callFetchContract();}

  const callSetWnftOffchainMetadata = (wnftOffchainMetadataValue) => {
    let promise = new Promise(function (resolve, reject) {
      setWnftOffchainMetadata(props?.contractDetails?.contractAddress, wnftOffchainMetadataValue)
      .then(() => {props.setContractDetails({...props.contractDetails, wnftOffchainMetadata: wnftOffchainMetadataValue});resolve(true);})
      .catch((e) => reject(e))
    });
    return promise;
  }
  
  const callTransferWnft = (transferTo) => {
    let promise = new Promise(function (resolve, reject) {
      transferWntOwnership(props?.contractDetails?.contractAddress, transferTo)
      .then(() => {
        props.setContractDetails({...props.contractDetails, wnftOwner: transferTo, isWnftOwner: false});
        resolve(true);
      })
      .catch((e) => reject(e))
    });
    return promise;
  }

 

  return (
<>
<ReactTooltip />
  <h4 className="mb-3">General Information</h4>
  <div className='py-3'>
    <div className="col-12  my-3">
      <label htmlFor="contract-address" className="form-label">Contract Address</label>
      <div className="input-group">
        
        <input  type="text" className="form-control shadow-lg rounded" name="contract-address" id="contract-address" onChange={ContractAddressChange} onKeyDown={fetchContractKeyDown} value={contractAddressValue} placeholder="Example: 0xD17D95B20ef169459f55C5102463BC052340C463" />
        <button  type="submit" className="btn btn-blue"  onClick={callFetchContract}>FETCH</button>
      </div>
      { props.isContractLoading && (<img src={loading_gif} />)}
      {isError &&  ((<GenericFieldSetError key="contract-address_error" errorMsg={isError} />)) }

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

    <div className="col-12  my-3">
      <label htmlFor="contract-symbol" className="form-label">Owner</label>
      <div className="input-group">
        {props.contractDetails?.wnftOwner||''} 
      </div>
    </div>
   
    <GenericFieldSet key="wnft-offchain-metadata-key" genericFieldLabel="Offchain metadata" genericFieldID="wnft-offchain-metadata" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetWnftOffchainMetadata} initFieldValue={props.contractDetails?.wnftOffchainMetadata} validator={contentUriValidate} placeholder="Example: ipns://k51qzi5uqu5djwbl0zcd4g9onue26a8nq97c0m9wp6kir1gibuyjxpkqpoxwag" />

    <GenericFieldSet key="wnft-transfer-key" genericFieldLabel="Transfer" buttonLabel="TRANSFER" genericFieldID="wnft-transfer" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callTransferWnft} initFieldValue="" validator={ethAddressValidate} />

  </div>
</>)
}

export default GeneralInformation;