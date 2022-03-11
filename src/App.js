//import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from "ethers";
import { useState, useEffect } from "react";
//import ContractDetails from './components/ContractDetails';

import FetchContract from './components/FetchContract'
import Loading from "./components/Loading";

import { getChainId, getRpcUrl } from './utils/provider'
import WNFTABI from './utils/contracts/WNFTABI'
import { Route, Routes, useSearchParams, Outlet } from "react-router-dom";

import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import LeftNavMenu from './components/left-nav/LeftNavMenu'
import BottomNav from "./components/bottom-nav/BottomNav";
import GeneralInformation from './components/pages/general-information/GeneralInformation'
import CollectionOnchainMetadata from "./components/pages/collection-onchain-metadata/CollectionOnchainMetadata";
import TokenOnchainMetadata from "./components/pages/token-onchain-metadata/TokenOnchainMetadata";
import EnsAction from "./components/pages/ens-action/EnsAction";
import MintingMechanismAndMintAToken from "./components/pages/minting/MintingMechanismAndMintAToken";
import BrowseTokens from "./components/pages/browse-tokens/BrowseTokens";
import TokenProfile from "./components/pages/token-profile/TokenProfile";
import {WnftContract} from "./components/data/WnftContract";


/*
reusing "MockV3Aggregator" at 0xB3517658996C71D4d236df6B25aae439BAb7A9f8
----------------------------------------------------
Mocks Deployed!
----------------------------------------------------
----------------------------------------------------
reusing "Minting" at 0x7168D21B1311d5f0d835d5Be901a06614619d9Bc
Basic minting deployed
----------------------------------------------------
----------------------------------------------------
deploying "WNFT" (tx: 0xb61ee780ecf315fcf7e2ae6c525f9c9b1fd90a01a569ff205338adc20eb5450b)...: deployed at 0xD17D95B20ef169459f55C5102463BC052340C463 with 3896148 gas
Deployed WNFT
----------------------------------------------------
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Please run `npx hardhat console` to interact with the deployed smart contracts!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
----------------------------------------------------
deploying "onchainTokenDataSize" (tx: 0xca228d4c2740eae734d26bd7aaee884d2f217692785a8f88f8726994ce319c1f)...: deployed at 0x3c02f6c0FCB52E3b830094c864b8d2bF0df9169E with 336024 gas
deploying "onchainTokenDataString" (tx: 0xa2c2a5c10b3dd0484e1cdf6fabf0d13d832a43e0cb56d3a34a028bfd1a79a0c1)...: deployed at 0xB745B651294f3fA525d902DE24a68BA67a478d58 with 259931 gas
deploying "onchainTokenDataUint" (tx: 0xe60e9f2b1f5c1006b99d3571e62fdcc71420c0cd41d08c17e55f3f5c051b7a56)...: deployed at 0x1A320bF78bbeF9c7caDb50218224889a4fa4810c with 168364 ga
*/


function ContractPageLayout(){
  return (
<>
  <div className="col-md-5 col-lg-4">
      <LeftNavMenu />
  </div>
  <div className="col-md-7 col-lg-8 main-part">
    <Outlet />
    <BottomNav />
  </div>
</>)
  
}



function App(){

  const [searchParams, setSearchParams] = useSearchParams();
  const [userAddress, setUserAddress] = useState("");

  const contractURLAddress = searchParams.get('contract')

  const [contractAddress, setContractAddress] = useState(contractURLAddress)
  const [contractDetails, setContractDetails] = useState({})
  const [error, setError] = useState("")
  const [isContractLoading, setIsContractLoading] = useState(false)
  const [isContractLoaded, setIsContractLoaded] = useState(false)



  useEffect(() => {
    if(contractAddress){
      setIsContractLoading(true)
      WnftContract(contractAddress).then((resp)=>{
        setIsContractLoading(false);
        setIsContractLoaded(true);
        setContractDetails(resp.contractDetails)
      })
        .catch(error => {
          setError("Sorry, something went wrong")
          setIsContractLoading(false)
        })
      }
  }, [contractAddress, userAddress])
  return (
<main className="min-vh-100">
  <div className="container min-vh-100">
    <Header userAddress={userAddress} setUserAddress={setUserAddress} contractDetails={contractDetails} />
    <div className="row g-5  min-vh-75">
      <Routes>
        <Route path="/" element={<ContractPageLayout />}>
         
              <Route path="/" index  element={<GeneralInformation contractAddress={contractAddress} setContractAddress={setContractAddress} contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} isContractLoading={isContractLoading} />} />
              <Route path="/collection-onchain-metadata"  element={<CollectionOnchainMetadata contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded}  />} />
              <Route path="/token-onchain-metadata"  element={<TokenOnchainMetadata contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />} />
              <Route path="/ens-action"  element={<EnsAction contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />}  />
              <Route path="/browse-tokens"  element={<BrowseTokens contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />} />
              <Route path="/minting"  element={<MintingMechanismAndMintAToken contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />} />

        </Route>
        <Route path="/token-profile"  element={<TokenProfile contractDetails={contractDetails} isContractLoaded={isContractLoaded} />} />
      </Routes>
    </div>
    <Footer />
  </div>
</main>
)
}


// function App() {

//   const [showLoading, setShowLoading] = useState(false);
//   const [contractLoaded, setContractLoaded] = useState(false);
//   const [contractDetails, setContractDetails] = useState({});


//   let isWnftOwner = false;

//   const fetchContract = async (contractAddress) => {
//     setShowLoading(true);
//     let provider;
//     if (window.ethereum){
//       provider = new ethers.providers.Web3Provider( window.ethereum )
//       const { chainId } = await provider.getNetwork();
//       if (chainId!==getChainId(CONTRACT_NETWORK)){
//         provider = undefined;
//       }
      
//     }
//     if (provider===undefined){
//       provider = new ethers.providers.JsonRpcProvider( getRpcUrl(CONTRACT_NETWORK) );
//     }
  
  
//     const signer = provider.getSigner(0);
  
//     if (signer !== null) {
  
//       const WNFT_contract = new ethers.Contract(contractAddress, WNFTABI.abi, provider);
//       const wnftOwner = await WNFT_contract.owner();
//       const symbol = await WNFT_contract.symbol();
//       const name = await WNFT_contract.name();
//       const mintingContract = await WNFT_contract.mintingContract();
//       console.log(mintingContract)
//       const mintPrice = parseInt((await WNFT_contract._wnftPriceInUSDPOW8() / (10**8)));
//       console.log(mintPrice)
//       const wnftOffchainMetadata = await WNFT_contract.wnftUri();
//       console.log(wnftOffchainMetadata);
//       const ensNodeId = await WNFT_contract.ENSNode();
//       console.log(ensNodeId);
//       const ensResolver = await WNFT_contract.ENSResolver();
//       console.log(ensResolver);

//       isWnftOwner = signer===wnftOwner
//       console.log('contract owner ', isWnftOwner)

//       setContractDetails({...contractDetails, 
//         wnftOwner: wnftOwner, 
//         name: name, 
//         symbol: symbol, 
//         mintingContract: mintingContract, 
//         mintPrice: mintPrice, 
//         wnftOffchainMetadata: wnftOffchainMetadata,
//         ensNodeId: ensNodeId,
//         ensResolver: ensResolver
//         })
//       console.log('fetched contract', name, symbol);
//       setShowLoading(false);
//       setContractLoaded(true);
//     }
//   }
  


//   return (
//     <BrowserRouter>
//       <div className="container-contact100">
//         <div className="wrap-contact100">
//         <div className="container">
//       <div className="py-5 text-center">
//         <h2>WNFT Manager</h2>
//       </div>
//       <div className="row">
        
//         <div className="col-md-8 order-md-1">
          
//           <FetchContract fetchContract={fetchContract} />
//           {showLoading === true && <Loading />}
//           { contractLoaded && (<ContractDetails contractDetails={contractDetails} isWnftOwner={isWnftOwner} />) } 
    
//         </div>
//       </div>

//     </div>
//         </div>
//       </div>
//       <div id="dropDownSelect1"></div>
//     </BrowserRouter>
//   );
// }

export default App;
