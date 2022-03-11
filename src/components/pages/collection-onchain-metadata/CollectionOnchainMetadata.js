import ReactTooltip from 'react-tooltip';
import CollectionMetaDataRow from './CollectionMetaDataRow';
import { useState } from "react";
import {setCollectionOnchainMetadata} from "../../data/WnftContract"
const loading_gif = require('../../../images/Loading_Animation.gif');




function CollectionOnchainMetadata(props){

  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); 



  const FieldNameChange = (e) => setFieldName(e.target.value);
  const FieldValueChange = (e) => setFieldValue(e.target.value);


  const updateCollectionOnchainMetadata = (fieldName, fieldValue) => {
    let appendCollectionOnchainMetadata = [];
    appendCollectionOnchainMetadata[0] = props.contractDetails.tokenMetadataField[0].slice()
    appendCollectionOnchainMetadata[1] = props.contractDetails.tokenMetadataField[1].slice()
    
    appendCollectionOnchainMetadata[0].push(fieldName)
    appendCollectionOnchainMetadata[1].push(fieldValue)
    props.setContractDetails({...props.contractDetails, collectionMetadataField: appendCollectionOnchainMetadata})
  }

  const callSetCollectionOnchainMetadata = () => {
    if (props?.contractDetails?.contractAddress){
      setIsLoading(true);
      setCollectionOnchainMetadata(props?.contractDetails?.contractAddress, fieldName, fieldValue)
      .then(() => {
        setFieldName('');
        setFieldValue('');
        setIsLoading(false);
        updateCollectionOnchainMetadata(fieldName, fieldValue);

      })
    }
  }


  const notOwner = (!props.contractDetails?.isWnftOwner);

  const notOwnerAndNotLogin = (notOwner && 'Only the owner may modify this data.') || ''

    return (
<>
  <ReactTooltip />
    <h4 className="mb-3">Collection Onchain Metadata</h4>
    <div className='py-3'>
      <div className="col-12  my-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {props.contractDetails?.collectionMetadataField?props.contractDetails?.collectionMetadataField[0].map((fieldName, i) => {     
  // Return the element. Also pass key     
  return (<CollectionMetaDataRow key={"collection_metadata_row_" + i.toString()} indexField={i} collectionMetadataField={props.contractDetails.collectionMetadataField} />) 
}):''}  
          </tbody>
        </table>
      </div>
      <h5 className="mt-5">Set collection onchain metadata</h5>
      <div className="col-12  my-3 ">
        <div className="col-12 d-flex">
          <div className="col-sm-5">
              <label htmlFor="field-name" className="form-label">Field name</label>
          </div>
          <div className="col-sm-5">
              <label htmlFor="field-value" className="form-label">Value</label>
          </div>
          <div className="col-sm-2">

          </div>
        </div>
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
        </div>
        { isLoading && (<div className="col-12 d-flex"><img src={loading_gif} /></div>)}

      </div>
    </div>
</>)
}

export default CollectionOnchainMetadata;