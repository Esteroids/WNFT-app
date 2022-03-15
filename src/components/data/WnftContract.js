import WNFTABI from '../../utils/contracts/WNFTABI'
import { getChainId, getRpcUrl, getWebSocketRpcUrl } from '../../utils/provider'
import { ethers } from "ethers";
import { refactorCollectionMetadata, refactorTokenMetadataDefenition, getTokenMetadataFetchFunction, ensHashToCidUri, cidUriToEnsHash } from "./WnftUtils"

const CONTRACT_NETWORK = 'GOERLI'

const USE_WEBSOCKETS = true


const getProvider = async () => {
  let isWallet = false;
  let provider;
  if (window.ethereum){
    provider = new ethers.providers.Web3Provider( window.ethereum )
    const { chainId } = await provider.getNetwork();
    if (chainId!==getChainId(CONTRACT_NETWORK)){
      provider = undefined;
    }else{
      isWallet = true;
    }
    
  }
  if (provider===undefined){
    if (USE_WEBSOCKETS){
      provider = new ethers.providers.WebSocketProvider( getWebSocketRpcUrl(CONTRACT_NETWORK) );
    }else{
      provider = new ethers.providers.JsonRpcProvider( getRpcUrl(CONTRACT_NETWORK) );
    }
  }
  return {'provider': provider, 'isWallet': isWallet}
}

export const transferToken = async (contractAddress, transferTo, tokenId) => {

  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{

      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
      const setTokenTransferFromTx = await WNFT_contract.transferFrom(signer.getAddress(), transferTo, tokenId)
      await setTokenTransferFromTx.wait()
      console.log('set done')

  
    }catch(e) {
      console.error('Error changing "transferToken" remote contract', e.name, ': ', e.message)
      throw e.message;
    }

  }
}

export const setWnftOffchainMetadata = async (contractAddress, wnftOffchainMetadataURI) => {
  const {provider, isWallet} = await getProvider()

    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

        const setWnftUriTx = await WNFT_contract.setWnftUri(wnftOffchainMetadataURI)
        await setWnftUriTx.wait()
        console.log('set done')
      }catch(e) {
        console.error('Error changing "setWnftOffchainMetadata" remote contract' + e.name + ': ' + e.message)
        throw e.message;
      }

  }
}


export const setCollectionOnchainMetadata = async (contractAddress, fieldName, fieldValue) => {
  const {provider, isWallet} = await getProvider()


  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{

      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setCollectionOnchainMetadataTx = await WNFT_contract.setCollectionOnchainMetadata(fieldName, fieldValue)
      await setCollectionOnchainMetadataTx.wait()
      console.log('set done')


    }catch(e) {
      console.error('Error changing "setCollectionOnchainMetadata" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}

export const setTokenOnchainMetadataField = async (contractAddress, fieldName, fieldSmartContractInterface, fieldSmartContractAddress) => {
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const addTokenOnchainMetadataFieldTx = await WNFT_contract.addTokenOnchainMetadataField(fieldSmartContractInterface, fieldSmartContractAddress, fieldName)
      await addTokenOnchainMetadataFieldTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setTokenOnchainMetadataField" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}


export const setTokenOnchainMetadataString = async (contractAddress, tokenId, fieldName, fieldValue) => {
  const {provider, isWallet} = await getProvider()

  
    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
  
        const setTokenURITx = await WNFT_contract.setTokenOnchainMetadataString(tokenId, fieldName, fieldValue)
        await setTokenURITx.wait()
        console.log('set done')
  
      }catch(e) {
        console.error('Error changing "setTokenOnchainMetadataString" remote contract' + e.name + ': ' + e.message)
        throw e.message;
      }
  
    }
  }

export const setTokenOnchainMetadataUint = async (contractAddress, tokenId, fieldName, fieldValue) => {
  const {provider, isWallet} = await getProvider()

  
    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
  
        const setTokenURITx = await WNFT_contract.setTokenOnchainMetadataUint(tokenId, fieldName, fieldValue)
        await setTokenURITx.wait()
        console.log('set done')
  
      }catch(e) {
        console.error('Error changing "setTokenOnchainMetadataUint" remote contract' + e.name + ': ' + e.message)
        throw e.message;
      }
  
    }
  }


export const setTokenURI = async (contractAddress, tokenId, tokenURI) => {

  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setTokenURITx = await WNFT_contract.setTokenURI(tokenId, tokenURI)
      await setTokenURITx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setTokenURI" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}


export const setMintingContractAddress = async (contractAddress, newMintingContractAddress) => {
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setMintingContractTx = await WNFT_contract.setMintingContract(newMintingContractAddress)
      await setMintingContractTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setMintingContractAddress" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}


export const setMintPrice = async (contractAddress, mintPriceUSD) => {
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
      const mintPriceTenthOfCent = mintPriceUSD * (10**3)

      const setTokenPriceTx = await WNFT_contract.setTokenPrice(mintPriceTenthOfCent)
      await setTokenPriceTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setMintPrice" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}

export const mintToken = async (contractAddress, tokenIDToMint, initTokenCID, withCID, mintPrice) => {
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const price = ethers.BigNumber.from(140330173736)
      const priceInETH = (mintPrice * 10 ** 8) / price
      const priceInWie = ethers.BigNumber.from((Math.ceil(priceInETH * 10 ** 18)).toString())
      let overrides = {
        value: priceInWie
      };
      console.log(overrides)
      const mintTo = signer.getAddress()
      let setMintTx
      if (!withCID){
        setMintTx = await WNFT_contract.mint(mintTo, tokenIDToMint, overrides)
      }else{
        setMintTx = await WNFT_contract.mintWithTokenURI(mintTo, tokenIDToMint, initTokenCID, overrides)
      }
      await setMintTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "mintToken" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}


  

export const setEnsResolver = async (contractAddress, ensResolver) => {
  const {provider, isWallet} = await getProvider()
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSResolverTx = await WNFT_contract.setENSResolver(ensResolver)
      await setENSResolverTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsResolver" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}


export const setEnsRegistar = async (contractAddress, ensRegistar) => {
  const {provider, isWallet} = await getProvider()
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSRegistarTx = await WNFT_contract.setENSRegistar(ensRegistar)
      await setENSRegistarTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsRegistar" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}

export const setEnsNode = async (contractAddress, ensNode) => {
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSNodeIDTx = await WNFT_contract.setENSNodeID(ensNode)
      await setENSNodeIDTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsNode" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}


export const setEnsContenthash = async (contractAddress, ensContenthash) => {
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSContenthashTx = await WNFT_contract.setENSContenthash(ensContenthash)
      await setENSContenthashTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsContenthash" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}

export const setEnsCidUri = async (contractAddress, ensCidUri) => {
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
      console.log(ensCidUri)
      const ensContenthash = cidUriToEnsHash(ensCidUri)
      console.log('content hash', ensContenthash)
      const setENSContenthashTx = await WNFT_contract.setENSContenthash(ensContenthash)
      await setENSContenthashTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsContenthash" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}




export const getTokenByTokenID = async (contractAddress, tokenId, withData, tokenOnchainMetadataDefenitions) => {
    let tokenExistsData;
    const {provider, isWallet} = await getProvider()
    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, provider);
 
        tokenExistsData = {'id': tokenId}
        const tokenExists = await WNFT_contract.tokenExists(tokenId)
        tokenExistsData['tokenExists'] = tokenExists;
        if (tokenExists){
          

          let fetchedPromises = [];
          let fetchedOrder = [];
          let fetchedData = {};
  
          const addFetchPromise = (name, fetchPromise) => {
            fetchedPromises.push(fetchPromise);
            fetchedOrder.push(name);
          }
          
          addFetchPromise('owner', WNFT_contract.ownerOf(tokenId));
          addFetchPromise('tokenURI', WNFT_contract.tokenURI(tokenId));

          let tokenMetadataValues = {}
          if(withData){
            for (let fieldName in tokenOnchainMetadataDefenitions){
              const tokenOnchainMetadataDefenition = tokenOnchainMetadataDefenitions[fieldName]
              const tokenMetadataFetchFunction = getTokenMetadataFetchFunction(tokenOnchainMetadataDefenition);
              addFetchPromise((res) => { if (res) tokenMetadataValues[fieldName] = res }, WNFT_contract[tokenMetadataFetchFunction](tokenId, fieldName));
            }
            
          }
        
          const results = await Promise.all(fetchedPromises);
  
          for (var i in results){
            if (typeof fetchedOrder[i]  === 'string') fetchedData[fetchedOrder[i]] = results[i];
            else if (typeof fetchedOrder[i] === 'function') fetchedOrder[i](results[i]);
          }

          if (withData) fetchedData.tokenMetadataValues = tokenMetadataValues;

          fetchedData.isTokenOwner = false;
          if (isWallet && signer.getAddress){
            if (isWallet){
              try{
                const userAddress = await signer.getAddress();
                fetchedData.isTokenOwner = userAddress===fetchedData.owner;
              }catch{} 
            }
            
          }

          tokenExistsData = {...tokenExistsData, ...fetchedData}

        }
       
        }catch(e) {
          console.error('Error reading remote contract' + e.name + ': ' + e.message)

        }
      // console.log('fetched contract', name, symbol);
      
    }
    console.log(tokenExistsData)
    return tokenExistsData

} 



export const getTokenByNthNum = async (contractAddress, nth_num) => {
  let tokenExistsData;
  const {provider, isWallet} = await getProvider()

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, provider);

      tokenExistsData = {}
      let tokenId;
      try{
        tokenId = await WNFT_contract.NthToken(nth_num);
        if(tokenId) tokenExistsData['tokenExists'] = true;
      }catch(e){
        if (e.message && e.message.indexOf("Token doesn't exist")!==-1) tokenExistsData['tokenExists'] = false;
      }
      
      if (tokenExistsData['tokenExists']){
        const tokenOwner = await WNFT_contract.ownerOf(tokenId)
        
        
        tokenExistsData = {...tokenExistsData, 'owner': tokenOwner, 'id': tokenId.toNumber( ) }
      }
     
      }catch(e) {
        console.error('Error reading remote contract' + e.name + ': ' + e.message)

      }
    
  }
  console.log(tokenExistsData)
  return tokenExistsData

} 

export const transferWntOwnership = async (contractAddress, newOwner) => {
  const {provider} = await getProvider()
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const transferOwnershipTx = await WNFT_contract.transferOwnership(newOwner)
      await transferOwnershipTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "transferWntOwnership" remote contract' + e.name + ': ' + e.message)
      throw e.message;
    }

  }
}


export const WnftContract = async (contractAddress) => {

  let contractDetails = {};

  const {provider, isWallet} = await getProvider()

  
    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, provider);

        let fetchedPromises = [];
        let fetchedOrder = [];
        let fetchedData = {};

        const addFetchPromise = (name, fetchPromise) => {
          fetchedPromises.push(fetchPromise);
          fetchedOrder.push(name);
        }
        
        addFetchPromise('wnftOwner', WNFT_contract.owner());
        addFetchPromise('symbol', WNFT_contract.symbol());
        addFetchPromise('name', WNFT_contract.name());
        addFetchPromise('wnftOffchainMetadata', WNFT_contract.wnftUri());
        addFetchPromise('mintingContract', WNFT_contract.mintingContract());
        addFetchPromise('wnftPriceInUSDPOW8', WNFT_contract.wnftPriceInUSDPOW8());
        addFetchPromise('ensNodeId', WNFT_contract.ENSNodeID());
        addFetchPromise('ensResolver', WNFT_contract.ENSResolver());
        addFetchPromise('ensRegistar', WNFT_contract.ENSRegistar());
        addFetchPromise('collectionMetadataFieldRaw', WNFT_contract.getCollectionMetadataField());
        addFetchPromise('tokenMetadataField', WNFT_contract.getTokenMetadataField());
        addFetchPromise('ensContenthash', WNFT_contract.ensContenthash());
        
        
        const results = await Promise.all(fetchedPromises);

        for (var i in results){
          fetchedData[fetchedOrder[i]] = results[i];
        }


     
        let isWnftOwner = false;
        if (isWallet){
          try{
            const userAddress = await signer.getAddress();
            isWnftOwner = userAddress===fetchedData?.wnftOwner;
          }catch{} 
        }
        
        fetchedData.collectionOnchainMetadata = refactorCollectionMetadata(fetchedData.collectionMetadataFieldRaw)
        fetchedData.tokenOnchainMetadataDefenitions = refactorTokenMetadataDefenition(fetchedData.tokenMetadataField)

        fetchedData.ensCidUri = ensHashToCidUri(fetchedData.ensContenthash)
        
        fetchedData.isWnftOwner = isWnftOwner;
        fetchedData.mintPrice = parseFloat((fetchedData.wnftPriceInUSDPOW8 / (10**8)));
        fetchedData.contractAddress = contractAddress
        contractDetails = {...contractDetails, 
          ...fetchedData,
          }
        }catch(e) {
          console.error('Error reading remote contract' + e.name + ': ' + e.message)

        }
   
      
    }

    console.log(contractDetails)

  return { contractDetails }
}

