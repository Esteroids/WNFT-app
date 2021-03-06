import contentHash from '@ensdomains/content-hash';


const collectionMetadataIndex = {fieldName: 0, fieldValue: 1};

const tokenMetadataDefenitionIndex = {fieldName: 0, smartContractAddress: 1, smartContractInterface: 2};

const signatures = {'0x661f2816': 'str', '0x2421c19b': 'uint'}

const wnftFunctionTypeTokenOnchainMetadata = {'str': 'tokenOnchainMetadataString', 'uint': 'tokenOnchainMetadataUint'}


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
}


export const refactorTokenMetadataDefenition = (tokenMetadataFieldRaw) => {
    return arraysToObjects(tokenMetadataFieldRaw, 'fieldName', tokenMetadataDefenitionIndex)
}

export const getTypeFromInterfactSignature = (interfaceSignature) => signatures[interfaceSignature]

export const getTokenMetadataFetchFunction = (tokenOnchainMetadataDefenition) => {
    const signatureType = getTypeFromInterfactSignature(tokenOnchainMetadataDefenition.smartContractInterface);
    return wnftFunctionTypeTokenOnchainMetadata[signatureType];
    
}

export const ensHashToCidUri = (ens_hash) => {
    if (ens_hash.startsWith('0x')){
        ens_hash = ens_hash.substring('0x'.length)
    }
    if (ens_hash){
        try{
            let content = contentHash.decode(ens_hash)
            const codec = contentHash.getCodec(ens_hash).replace('-ns','')
            if (codec === 'ipfs' && content.startsWith('Q')){
                content = contentHash.helpers.cidV0ToV1Base32(content)
            }
            return codec + '://' + content
        }catch{
            return ''
        }
    }else{
        return ''
    }

}

export const cidUriToEnsHash = (cidUri) => {
    const [codecUri, cid] = cidUri.split('://')
    return '0x' + contentHash.encode(codecUri + '-ns', cid);

}
