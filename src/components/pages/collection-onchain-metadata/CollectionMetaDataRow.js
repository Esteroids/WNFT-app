function CollectionMetaDataRow(props){

    const fieldName = props.item.fieldName;
    const fieldValue = props.item.fieldValue;
    return (<tr key={"collection-metadata-row-" + props.indexField}>      
      <td>{fieldName}</td>
      <td>{fieldValue}</td>
    </tr>)
  }

  export default CollectionMetaDataRow;