
import { useState, useEffect } from "react";
import { Route, Routes, useSearchParams, Outlet } from "react-router-dom";

import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import LeftNavMenu from './components/left-nav/LeftNavMenu'
import BottomNav from "./components/bottom-nav/BottomNav";
import GeneralInformation from './components/pages/general-information/GeneralInformation'
import CollectionOnchainMetadata from "./components/pages/collection-onchain-metadata/CollectionOnchainMetadata";
import TokenOnchainMetadata from "./components/pages/token-onchain-metadata/TokenOnchainMetadata";
import EnsAction from "./components/pages/ens-action/EnsAction";
import MintingMechanism from "./components/pages/minting-mechanism/MintingMechnism"
//import MintingMechanismAndMintAToken from "./components/pages/minting/MintingMechanismAndMintAToken";

import BrowseTokens from "./components/pages/browse-tokens/BrowseTokens";
import MintAToken from "./components/pages/mint-token/MintAToken";
import TokenProfile from "./components/pages/token-profile/TokenProfile";
import {WnftContract} from "./components/data/WnftContract";


/*
Network goerli doesnt have ethUsdPriceFeed deploying mock
reusing "MockV3Aggregator" at 0xc9BBaB4B58f1160ADC353925404af5dc354B6d7E

Mocks Deployed!


reusing "Minting" at 0x6c936e4bE522f75911a69E2dA9c042099cbB7dfb
Basic minting deployed

deploying "WNFT" deployed at 0x82aE8A806b97c3d88561bB2468e76C9B82c18008 with 3895944 gas
Deployed WNFT

deploying "onchainTokenDataSize" deployed at 0xbCcB02287F3E69ac8Cc3254956F636ca45F53E31 with 336024 gas
deploying "onchainTokenDataString" deployed at 0xE33Ed1D861289f801b2d118B06eF1D9f8a3bfEc5 with 287171 gas
deploying "onchainTokenDataUint" deployed at 0xC6A3C3627B5A9E7F7910b3acb303FE1E40996d61 with 172912 gas
*/


function ContractPageLayout(){
  return (
<>
  <div className="col-md-4 col-lg-3">
      <LeftNavMenu />
  </div>
  <div className="col-md-8 col-lg-9 main-part">
    <Outlet />
    <BottomNav />
  </div>
</>)
  
}



function App(){

  const [searchParams, setSearchParams] = useSearchParams();
  const [userAddress, setUserAddress] = useState("");

  const contractURLAddress = searchParams.get('contract')
  const contractURLNetwork = searchParams.get('network')


  const [contractAddress, setContractAddress] = useState(contractURLAddress)
  const [contractNetwork, setContractNetwork] = useState(contractURLNetwork)
  const [contractDetails, setContractDetails] = useState({})
  const [error, setError] = useState("")
  const [isContractLoading, setIsContractLoading] = useState(false)
  const [isContractLoaded, setIsContractLoaded] = useState(false)



  useEffect(() => {
    if(contractAddress&&contractNetwork){
      
      setIsContractLoading(true)
      WnftContract(contractAddress, contractNetwork).then((resp)=>{
        setIsContractLoading(false);
        setIsContractLoaded(true);
        setContractDetails(resp.contractDetails)
      })
        .catch(error => {
          setError("Sorry, something went wrong")
          setIsContractLoading(false)
        })
      }
  }, [contractAddress, userAddress, contractNetwork])
  return (
<main className="min-vh-100">
  <div className="container min-vh-100">
    <Header userAddress={userAddress} setUserAddress={setUserAddress} contractDetails={contractDetails} />
    <div className="row g-5  min-vh-75">
      <Routes>
        <Route path="/" element={<ContractPageLayout />}>
         
              <Route path="/" index  element={<GeneralInformation contractAddress={contractAddress} setContractAddress={setContractAddress} contractNetwork={contractNetwork} setContractNetwork={setContractNetwork} contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} isContractLoading={isContractLoading} />} />
              <Route path="/collection-onchain-metadata"  element={<CollectionOnchainMetadata contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded}  />} />
              <Route path="/token-onchain-metadata"  element={<TokenOnchainMetadata contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />} />
              <Route path="/ens-action"  element={<EnsAction contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />}  />
              <Route path="/minting-mechanism"  element={<MintingMechanism contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />}  />
              <Route path="/browse-tokens"  element={<BrowseTokens contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />} />
              <Route path="/mint-token"  element={<MintAToken contractDetails={contractDetails} setContractDetails={setContractDetails} isContractLoaded={isContractLoaded} />} />


        </Route>
        <Route path="/token-profile"  element={<TokenProfile contractDetails={contractDetails} isContractLoaded={isContractLoaded} />} />
      </Routes>
    </div>
    <Footer />
  </div>
</main>
)
}

export default App;
