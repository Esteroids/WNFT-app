function TokenOnchainMetadataRow(props){

  
    return (
<tr>      
    <td>{props.item.fieldName}</td>
    <td>{props.item.smartContractAddress}</td>
    <td>{props.item.smartContractInterface}</td>
</tr>)
  }

  export default TokenOnchainMetadataRow;
  