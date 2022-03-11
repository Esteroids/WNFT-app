import GenericFieldSet from "../../generics/GenericFieldSet";
import { setTokenOnchainMetadataString, setTokenOnchainMetadataUint } from "../../data/WnftContract";

const FIELD_NAME_INDEX = 0;
const FIELD_SMART_CONTRACT_INDEX = 1;
const FIELD_INTERFACE_INDEX = 2;

const signatures = {'0x661f2816': 'str', '0x2421c19b': 'uint'}

function TokenOnchainMetadataValues(props){
    const fieldName = props.tokenMetadataField[FIELD_NAME_INDEX][props.indexField];
    const fieldInterface = props.tokenMetadataField[FIELD_INTERFACE_INDEX][props.indexField];

    const callSetTokenMetadataFieldValue = (tokenMetadataFieldValue) => {
        let promise = new Promise(function (resolve, reject) {
           // four functions to set token onchain metadata
           let setPromise
           if(signatures[fieldInterface]=='uint') setPromise = setTokenOnchainMetadataUint(props?.contractDetails?.contractAddress, props.tokenId, fieldName, tokenMetadataFieldValue);
           else setPromise = setTokenOnchainMetadataString(props?.contractDetails?.contractAddress, props.tokenId, fieldName, tokenMetadataFieldValue)
           setPromise.then(() => {resolve(true);})
           .catch(() => reject('error'))
        });
        return promise;
    }

    const fieldID = 'token-onchain-metadata-values_' + props.indexField.toString()

  


    return  (<GenericFieldSet mainClass="col-7  my-3" key={fieldID + '_key'} genericFieldLabel={fieldName} genericFieldID={fieldID} notOwnerAndNotLogin="" notOwner={props.notTokenOwner}  callSet={callSetTokenMetadataFieldValue} initFieldValue="" />)

}

export default TokenOnchainMetadataValues;