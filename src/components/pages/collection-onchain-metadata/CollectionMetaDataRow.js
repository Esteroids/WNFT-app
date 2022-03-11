function CollectionMetaDataRow(props){

    const fieldName = props.collectionMetadataField[0][props.indexField];
    const fieldValue = props.collectionMetadataField[1][props.indexField];
    return (<tr key={"collection-metadata-row-" + props.indexField}>      
      <td>{fieldName}</td>
      <td>{fieldValue}</td>
    </tr>)
  }

  export default CollectionMetaDataRow;