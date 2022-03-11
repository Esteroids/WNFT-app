import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function FetchContract(props) {

    let [searchParams, setSearchParams] = useSearchParams();
    const [contractAddress, setContractAddress] = useState(''); 
    const callFetchContract = () => {
        
        setSearchParams({'wnft-contract-address': contractAddress})
        props.fetchContract(contractAddress);
    }
    const ContractAddressChange = (e) => setContractAddress(e.target.value)

    


    return (
<div className="input-group mb-3">
    <label htmlFor="wnft-symbol">Contract address</label>
    <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="WNFT Contract Address" id="wnft-contract-address" onChange={ContractAddressChange} value={contractAddress} />
        <div className="input-group-append">
          <button className="btn btn-secondary" onClick={callFetchContract}>Fetch</button>
        </div>
    </div> 
</div>

    )
}

export default FetchContract;