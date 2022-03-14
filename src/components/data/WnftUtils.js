const collectionMetadataIndex = {fieldName: 0, fieldValue: 1};

const tokenMetadataDefenitionIndex = {fieldName: 0, smartContractAddress: 1, smartContractInterface: 2};



const arraysToObjects = (arrs, keyField, fieldIndexes) => {
    let objectsData = {}
    //let fieldIndexesArr = Object.keys(fieldIndexes)
    for (var i = 0;i<arrs[fieldIndexes[keyField]].length; i++){
        const objectKey = arrs[fieldIndexes[keyField]][i]
        let objectData = {}
        for (var fieldIndexKey in fieldIndexes){
            objectData[fieldIndexKey] = arrs[fieldIndexes[fieldIndexKey]][i]
        }
        objectsData[objectKey] = objectData
    }
    return objectsData;
}


export const refactorCollectionMetadata = (collectionMetadataFieldRaw) => {
    return arraysToObjects(collectionMetadataFieldRaw, 'fieldName', collectionMetadataIndex)
    // let collectionOnchainMetadata = {}
    // for(var i = 0;i<collectionMetadataFieldRaw[collectionMetadataIndex.fieldName].length; i++){
    //   const fieldName = collectionMetadataFieldRaw[collectionMetadataIndex.fieldName][i]
    //   const fieldValue = collectionMetadataFieldRaw[collectionMetadataIndex.fieldValue][i]
    //   collectionOnchainMetadata[fieldName] = fieldValue;
    // }

    // return collectionOnchainMetadata;
}




export const refactorTokenMetadataDefenition = (tokenMetadataFieldRaw) => {
    return arraysToObjects(tokenMetadataFieldRaw, 'fieldName', tokenMetadataDefenitionIndex)

}