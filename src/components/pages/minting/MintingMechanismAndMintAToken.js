import MintingMechanism from "./MintingMechnism";
import MintAToken from "./MintAToken";

function MintingMechanismAndMintAToken(props){
    return (
<span>
    <MintingMechanism contractDetails={props.contractDetails} setContractDetails={props.setContractDetails} />
    <MintAToken contractDetails={props.contractDetails} isContractLoaded={props.isContractLoaded} />
</span>)
}

export default MintingMechanismAndMintAToken;