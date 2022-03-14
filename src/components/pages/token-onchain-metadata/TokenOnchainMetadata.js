import ReactTooltip from 'react-tooltip';
import TokenOnchainMetadataRow from './TokenOnchainMetadataRow';
import {setTokenOnchainMetadataField} from "../../data/WnftContract"
import { useState } from "react";

const loading_gif = require('../../../images/Loading_Animation.gif');



function TokenOnchainMetadata(props){

  const [fieldName, setFieldName] = useState('');
  const [fieldSmartContractInterface, setFieldSmartContractInterface] = useState('');
  const [fieldSmartContractAddress, setFieldSmartContractAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false); 


  const fieldNameChange = (e) => setFieldName(e.target.value);
  const fieldSmartContractInterfaceChange = (e) => setFieldSmartContractInterface(e.target.value);
  const fieldSmartContractAddressChange = (e) => setFieldSmartContractAddress(e.target.value);

  const updateTokenOnchainMetadataField = (fieldName, fieldSmartContractInterface, fieldSmartContractAddress) => {
   
    let newTokenOnchainMetadataDefenitions = Object.assign({}, props.contractDetails.tokenOnchainMetadataDefenitions);
    newTokenOnchainMetadataDefenitions[fieldName] = {
      'fieldName': fieldName, 
      'smartContractAddress': fieldSmartContractAddress, 
      'smartContractInterface': fieldSmartContractInterface};
    props.setContractDetails({...props.contractDetails, tokenOnchainMetadataDefenitions: newTokenOnchainMetadataDefenitions})
  }

  const callSetTokenOnchainMetadataField = () => {
    if (props?.contractDetails?.contractAddress){
      setIsLoading(true);
      setTokenOnchainMetadataField(props.contractDetails.contractAddress, fieldName, fieldSmartContractInterface, fieldSmartContractAddress)
      .then(() => {
        setFieldName('');
        setFieldSmartContractInterface('');
        setFieldSmartContractAddress(''); 
        setIsLoading(false);
        updateTokenOnchainMetadataField(fieldName, fieldSmartContractInterface, fieldSmartContractAddress);
      })
    }
  }

  const notOwner = (!props.contractDetails?.isWnftOwner);

  const notOwnerAndNotLogin = (notOwner && 'Only the owner may modify this data.') || ''


  return (
<>
  <ReactTooltip />
    <h4 className="mb-3">Token Onchain Metadata</h4>
    <div className='py-3'>
      <div className="col-12  my-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Field Name</th>
              <th scope="col">Smart Contract</th>
              <th scope="col">Interface</th>
            </tr>
          </thead>
          <tbody>
          {props.contractDetails?.tokenOnchainMetadataDefenitions && Object.keys(props.contractDetails.tokenOnchainMetadataDefenitions).map((fieldName, i) => {     
  // Return the element. Also pass key     
  return (<TokenOnchainMetadataRow key={"token_fields_metadata_row_" + i.toString()} indexField={i} item={props.contractDetails.tokenOnchainMetadataDefenitions[fieldName]} />) 
})}  
          </tbody>
        </table>
      </div>
      <h5 className="mt-5">Add onchain metadata fields for tokens</h5>
      <div className="col-12  my-3 ">
        <div className="col-12 d-flex">
          <div className="col-sm-5 pr-3">
              <label htmlFor="field-name" className="form-label">Field name</label>
              <input type="text" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="form-control" id="field-name" name="field-name" onChange={fieldNameChange} value={fieldName} />

          </div>
          <div className="col-sm-5 pr-3">
              <label htmlFor="smart-contract-address" className="form-label">Smart contract address</label>
              <input type="text" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="form-control" id="smart-contract-address" name="smart-contract-address" onChange={fieldSmartContractAddressChange} value={fieldSmartContractAddress}  />

          </div>
        </div>
        <div className="col-12">

          <div className="col-12 d-flex">
            <div className="col-sm-5">
                <label htmlFor="smart-contract-signature" className="form-label">Smart contract signature</label>
            </div>
            <div className="col-sm-5">
            </div>
          </div>
          <div className="col-12 d-flex">
            <div className="col-sm-5 pr-3">
                <input type="text" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="form-control" id="smart-contract-signature" name="smart-contract-signature"  onChange={fieldSmartContractInterfaceChange} value={fieldSmartContractInterface} />
            </div>
            <div className="col-sm-5">
            </div>
            <div className="col-sm-1">
              <button  type="submit" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="btn btn-blue form-control" onClick={callSetTokenOnchainMetadataField} >SET</button>
            </div>
          </div>
          { isLoading && (<div className="col-12 d-flex"><img src={loading_gif} /></div>)}

        </div>
      
      </div>
    </div>
</>)
}

/*
  <div className="col-12 d-flex">
          <div className="col-sm-5 pr-3">
            <input type="text" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="form-control" id="field-name" name="field-name" onChange={FieldNameChange} value={fieldName} />
          </div>
          <div className="col-sm-5 pr-3">
          <input type="text" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="form-control" id="field-value" name="field-value" onChange={FieldValueChange} value={fieldValue} />
          </div>
          <div className="col-sm-1">
          <button  type="submit" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="btn btn-blue form-control" onClick={callSetCollectionOnchainMetadata} >SET</button>
          </div>
        </div>*/

export default TokenOnchainMetadata;