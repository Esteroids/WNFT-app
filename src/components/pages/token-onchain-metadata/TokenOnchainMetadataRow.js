const FIELD_NAME_INDEX = 0;
const FIELD_SMART_CONTRACT_INDEX = 1;
const FIELD_INTERFACE_INDEX = 2;


function TokenOnchainMetadataRow(props){

    const fieldName = props.tokenMetadataField[FIELD_NAME_INDEX][props.indexField];
    const fieldSmartContract = props.tokenMetadataField[FIELD_SMART_CONTRACT_INDEX][props.indexField];
    const fieldInterface = props.tokenMetadataField[FIELD_INTERFACE_INDEX][props.indexField];
    return (
<tr>      
    <td>{fieldName}</td>
    <td>{fieldSmartContract}</td>
    <td>{fieldInterface}</td>
</tr>)
  }

  export default TokenOnchainMetadataRow;