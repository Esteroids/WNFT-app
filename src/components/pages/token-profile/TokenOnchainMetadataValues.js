import GenericFieldSet from "../../generics/GenericFieldSet";
import { setTokenOnchainMetadataString, setTokenOnchainMetadataUint } from "../../data/WnftContract";
import { getTypeFromInterfactSignature } from "../../data/WnftUtils";


function TokenOnchainMetadataValues(props){
    const fieldName = props.item.fieldName
    const fieldInterface = props.item.smartContractInterface;

    const callSetTokenMetadataFieldValue = (tokenMetadataFieldValue) => {
        let promise = new Promise(function (resolve, reject) {
           // four functions to set token onchain metadata
           let setPromise
           if(getTypeFromInterfactSignature(fieldInterface) === 'uint') setPromise = setTokenOnchainMetadataUint(props?.contractDetails?.contractAddress, props.tokenId, fieldName, tokenMetadataFieldValue);
           else setPromise = setTokenOnchainMetadataString(props?.contractDetails?.contractAddress, props.tokenId, fieldName, tokenMetadataFieldValue)
           setPromise.then(() => {resolve(true);})
           .catch(() => reject('error'))
        });
        return promise;
    }

    const fieldID = 'token-onchain-metadata-values_' + props.indexField.toString()

    const initValue = props.tokenDetails?.tokenMetadataValues && props.tokenDetails?.tokenMetadataValues[fieldName]

    return  (<GenericFieldSet mainClass="col-7  my-3" key={fieldID + '_key'} genericFieldLabel={fieldName} genericFieldID={fieldID} notOwnerAndNotLogin="" notOwner={props.notTokenOwner}  callSet={callSetTokenMetadataFieldValue} initFieldValue={initValue} />)

}

export default TokenOnchainMetadataValues;