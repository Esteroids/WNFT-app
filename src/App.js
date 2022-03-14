
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
reusing "MockV3Aggregator" at 0xB3517658996C71D4d236df6B25aae439BAb7A9f8
----------------------------------------------------
Mocks Deployed!
----------------------------------------------------
----------------------------------------------------
reusing "Minting" at 0x7168D21B1311d5f0d835d5Be901a06614619d9Bc
Basic minting deployed
----------------------------------------------------
----------------------------------------------------
reusing "WNFT" at 0xD17D95B20ef169459f55C5102463BC052340C463
Deployed WNFT
----------------------------------------------------
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Please run `npx hardhat console` to interact with the deployed smart contracts!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
----------------------------------------------------
reusing "onchainTokenDataSize" at 0x3c02f6c0FCB52E3b830094c864b8d2bF0df9169E
deploying "onchainTokenDataString" (tx: 0x27a3ee69e1d2fd8756c61d8b1d77005a5684f328c62793ac3e953253b49c8af1)...: deployed at 0xC166F8f7686D8B41f82B0a638d551A0932E4eab0 with 287171 gas
deploying "onchainTokenDataUint" (tx: 0x0dd2b5aff63d4303c9da3ba34b51aba3fc5295a2803f2cb28bce105c03586025)...: deployed at 0x6BCAe7da6d069546e19ef9a81b669f03c8d86994 with 172912 gas
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

  const [contractAddress, setContractAddress] = useState(contractURLAddress||"")
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
