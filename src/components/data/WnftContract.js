import WNFTABI from '../../utils/contracts/WNFTABI'
import { getChainId, getRpcUrl, getWebSocketRpcUrl } from '../../utils/provider'
import { ethers } from "ethers";
import { refactorCollectionMetadata, refactorTokenMetadataDefenition } from "./WnftUtils"

// use the given Provider, e.g in Mist, or instantiate a new websocket provider


const CONTRACT_NETWORK = 'GOERLI'

const USE_WEBSOCKETS = true

// 0x6C4651767139FDd95829424045a6f89909974BF4
//

const FIELD_NAME_INDEX = 0;
const FIELD_SMART_CONTRACT_INDEX = 1;
const FIELD_INTERFACE_INDEX = 2;

const signatures = {'0x661f2816': 'str', '0x2421c19b': 'uint'}


export const transferToken = async (contractAddress, transferTo, tokenId) => {

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

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{

      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
      const setTokenTransferFromTx = await WNFT_contract.transferFrom(signer.getAddress(), transferTo, tokenId)
      setTokenTransferFromTx.wait()
      console.log('set done')

  
    }catch(e) {
      console.error('Error changing "transferToken" remote contract', e.name, ': ', e.message)

    }

  }
}

export const setWnftOffchainMetadata = async (contractAddress, wnftOffchainMetadataURI) => {
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

    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

        const setWnftUriTx = await WNFT_contract.setWnftUri(wnftOffchainMetadataURI)
        setWnftUriTx.wait()
        console.log('set done')
      }catch(e) {
        console.error('Error changing "wnftOffchainMetadataURI" remote contract' + e.name + ': ' + e.message)

      }

  }
}


export const setCollectionOnchainMetadata = async (contractAddress, fieldName, fieldValue) => {
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

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{

      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setCollectionOnchainMetadataTx = await WNFT_contract.setCollectionOnchainMetadata(fieldName, fieldValue)
      await setCollectionOnchainMetadataTx.wait()
      console.log('set done')


    }catch(e) {
      console.error('Error changing "wnftOffchainMetadataURI" remote contract' + e.name + ': ' + e.message)

    }

  }
}

export const setTokenOnchainMetadataField = async (contractAddress, fieldName, fieldSmartContractInterface, fieldSmartContractAddress) => {
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
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const addTokenOnchainMetadataFieldTx = await WNFT_contract.addTokenOnchainMetadataField(fieldSmartContractInterface, fieldSmartContractAddress, fieldName)
      await addTokenOnchainMetadataFieldTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsContenthash" remote contract' + e.name + ': ' + e.message)

    }

  }
}



export const setTokenOnchainMetadataString = async (contractAddress, tokenId, fieldName, fieldValue) => {
  //
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
  
    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
  
        const setTokenURITx = await WNFT_contract.setTokenOnchainMetadataString(tokenId, fieldName, fieldValue)
        await setTokenURITx.wait()
        console.log('set done')
  
      }catch(e) {
        console.error('Error changing "setTokenOnchainMetadataString" remote contract' + e.name + ': ' + e.message)
  
      }
  
    }
  }

export const setTokenOnchainMetadataUint = async (contractAddress, tokenId, fieldName, fieldValue) => {
  //
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
  
    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);
  
        const setTokenURITx = await WNFT_contract.setTokenOnchainMetadataUint(tokenId, fieldName, fieldValue)
        await setTokenURITx.wait()
        console.log('set done')
  
      }catch(e) {
        console.error('Error changing "setTokenOnchainMetadataUint" remote contract' + e.name + ': ' + e.message)
  
      }
  
    }
  }


export const setTokenURI = async (contractAddress, tokenId, tokenURI) => {
//
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

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setTokenURITx = await WNFT_contract.setTokenURI(tokenId, tokenURI)
      await setTokenURITx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setTokenURI" remote contract' + e.name + ': ' + e.message)

    }

  }
}


export const setMintingContractAddress = async (contractAddress, newMintingContractAddress) => {
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

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setMintingContractTx = await WNFT_contract.setMintingContract(newMintingContractAddress)
      await setMintingContractTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "wnftOffchainMetadataURI" remote contract' + e.name + ': ' + e.message)

    }

  }
}


export const setMintPrice = async (contractAddress, mintPrice) => {
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

  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setTokenPriceTx = await WNFT_contract.setTokenPrice(mintPrice)
      await setTokenPriceTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setMintPrice" remote contract' + e.name + ': ' + e.message)

    }

  }
}

export const mintToken = async (contractAddress, tokenIDToMint, initTokenCID, withCID, mintPrice) => {
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

    }

  }
}


  

export const setEnsResolver = async (contractAddress, ensResolver) => {
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
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSResolverTx = await WNFT_contract.setENSResolver(ensResolver)
      await setENSResolverTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "wnftOffchainMetadataURI" remote contract' + e.name + ': ' + e.message)

    }

  }
}


export const setEnsRegistar = async (contractAddress, ensRegistar) => {
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
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSRegistarTx = await WNFT_contract.setENSRegistar(ensRegistar)
      await setENSRegistarTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "wnftOffchainMetadataURI" remote contract' + e.name + ': ' + e.message)

    }

  }
}

export const setEnsNode = async (contractAddress, ensNode) => {
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
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSNodeIDTx = await WNFT_contract.setENSNodeID(ensNode)
      await setENSNodeIDTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsNode" remote contract' + e.name + ': ' + e.message)

    }

  }
}


export const setEnsContenthash = async (contractAddress, ensContenthash) => {
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
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const setENSContenthashTx = await WNFT_contract.setENSContenthash(ensContenthash)
      await setENSContenthashTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "setEnsContenthash" remote contract' + e.name + ': ' + e.message)

    }

  }
}

export const getTokenByTokenID = async (contractAddress, tokenId, withData, tokenMetadataFields) => {
    let tokenExistsData;
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
    //console.log('look for provider')
    if (provider===undefined){
      if (!USE_WEBSOCKETS){
        provider = new ethers.providers.JsonRpcProvider( getRpcUrl(CONTRACT_NETWORK) );
      }else{
        provider = new ethers.providers.WebSocketProvider( getWebSocketRpcUrl(CONTRACT_NETWORK) );
        
      }
    }

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
            for (let i = 0;i<tokenMetadataFields[0].length;i++){
              const fieldName = tokenMetadataFields[FIELD_NAME_INDEX][i];
              const fieldInterface = tokenMetadataFields[FIELD_INTERFACE_INDEX][i];
                if(signatures[fieldInterface]=='uint'){
                  addFetchPromise((res) => { if (res) tokenMetadataValues[fieldName] = res }, WNFT_contract.tokenOnchainMetadataUint(tokenId, fieldName));
                }else{
                  addFetchPromise((res) => { if (res) tokenMetadataValues[fieldName] = res }, WNFT_contract.tokenOnchainMetadataString(tokenId, fieldName));

                } 
              
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
  let provider;
  let isWallet = false;
  if (window.ethereum){
    provider = new ethers.providers.Web3Provider( window.ethereum )
    const { chainId } = await provider.getNetwork();
    if (chainId!==getChainId(CONTRACT_NETWORK)){
      provider = undefined;
    }
    
    
  }
  if (provider===undefined){
    if (!USE_WEBSOCKETS){
      provider = new ethers.providers.JsonRpcProvider( getRpcUrl(CONTRACT_NETWORK) );
    }else{
      provider = new ethers.providers.WebSocketProvider( getWebSocketRpcUrl(CONTRACT_NETWORK) );
      
    }
  }


  const signer = provider.getSigner(0);

  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, provider);
      //const tokenOwner = WNFT_contract.ownerOf(tokenId)
      //tokenExistsData = {'owner': tokenOwner, 'id': tokenId}
      //WNFT_contract.handleRevert = true;
      tokenExistsData = {}
      let tokenId;
      try{
        tokenId = await WNFT_contract.NthToken(nth_num);
        if(tokenId) tokenExistsData['tokenExists'] = true;
      }catch(e){
        if (e.message && e.message.indexOf("Token doesn't exist")!=-1) tokenExistsData['tokenExists'] = false;
      }
      
      if (tokenExistsData['tokenExists']){
        const tokenOwner = await WNFT_contract.ownerOf(tokenId)
        
        
        tokenExistsData = {...tokenExistsData, 'owner': tokenOwner, 'id': tokenId.toNumber( ) }
      }
     
      }catch(e) {
        console.error('Error reading remote contract' + e.name + ': ' + e.message)

      }
    // console.log('fetched contract', name, symbol);
    
  }
  console.log(tokenExistsData)
  return tokenExistsData

} 

export const transferWntOwnership = async (contractAddress, newOwner) => {
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
  const signer = provider.getSigner(0);
  if (signer !== null) {
    try{
      const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, signer);

      const transferOwnershipTx = await WNFT_contract.transferOwnership(newOwner)
      await transferOwnershipTx.wait()
      console.log('set done')

    }catch(e) {
      console.error('Error changing "transferWntOwnership" remote contract' + e.name + ': ' + e.message)

    }

  }
}


export const WnftContract = async (contractAddress) => {
  // const [contractDetails, setContractDetails] = useState({})
  // const [error, setError] = useState("")
  // const [isLoading, setIsLoading] = useState(false)
  // const [isLoaded, setIsLoaded] = useState(false)


  

  let contractDetails = {};


  let isWnftOwner = false;

  //const fetchContract = async (contractAddress) => {
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
    //console.log('look for provider')
    if (provider===undefined){
      if (!USE_WEBSOCKETS){
        provider = new ethers.providers.JsonRpcProvider( getRpcUrl(CONTRACT_NETWORK) );
      }else{
        provider = new ethers.providers.WebSocketProvider( getWebSocketRpcUrl(CONTRACT_NETWORK) );
        
      }
    }
  
  
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

