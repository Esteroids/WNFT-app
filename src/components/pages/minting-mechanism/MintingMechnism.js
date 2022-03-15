import ReactTooltip from 'react-tooltip';
import GenericFieldSet from '../../generics/GenericFieldSet';
import {setMintingContractAddress, setMintPrice} from "../../data/WnftContract"
import {ethAddressValidate, numberValidate} from "../../../utils/validators"



function MintingMechanism(props){

    const notOwner = (!props.contractDetails?.isWnftOwner);
    const notOwnerAndNotLogin = (notOwner && 'Only the owner may modify this data.') || ''

 

    const callSetMintingContract = (mintingContractAddress) => {
        let promise = new Promise(function (resolve, reject) {
            setMintingContractAddress(props?.contractDetails?.contractAddress, mintingContractAddress)
            .then(() => {props.setContractDetails({...props.contractDetails, mintingContract: mintingContractAddress});resolve(true);})
            .catch((e) => reject(e))
        });
        return promise;
    }

    const callSetMintPrice = (mintPrice) => {
        let promise = new Promise(function (resolve, reject) {
        setMintPrice(props?.contractDetails?.contractAddress, mintPrice)
        .then(() => {props.setContractDetails({...props.contractDetails, mintPrice: mintPrice});resolve(true);})
        .catch((e) => reject(e))
    });
    return promise;
    }

    return (
<>
    <ReactTooltip />
    <h4 className="mb-3">Minting Mechanism</h4>
    <div className='py-3'>
        <GenericFieldSet key="minting-contract-key" genericFieldLabel="Minting contract" genericFieldID="minting-contract" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetMintingContract} initFieldValue={props.contractDetails?.mintingContract} validator={ethAddressValidate} />
        <GenericFieldSet key="mint-price-key" genericFieldLabel="Mint price ($)" genericFieldID="mint-price" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetMintPrice} initFieldValue={props.contractDetails?.mintPrice} validator={numberValidate} />
    </div>
</>)
}

export default MintingMechanism;