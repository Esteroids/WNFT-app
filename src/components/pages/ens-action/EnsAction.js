import ReactTooltip from 'react-tooltip';
import GenericFieldSet from '../../generics/GenericFieldSet';
import {setEnsRegistar, setEnsNode, setEnsResolver, setEnsCidUri} from "../../data/WnftContract"
import {ethAddressValidate, ensNodeValidate, contentUriValidate} from "../../../utils/validators"



function EnsAction(props){

  const notOwner = (!props.contractDetails?.isWnftOwner);

  const notOwnerAndNotLogin = (notOwner && 'Only the owner may modify this data.') || ''
 

  const callSetEnsNode = (ensNode) => {
    let promise = new Promise(function (resolve, reject) {
      setEnsNode(props?.contractDetails?.contractAddress, props?.contractDetails?.contractNetwork, ensNode)
      .then(() => {props.setContractDetails({...props.contractDetails, ensNodeId: ensNode});resolve(true);})
      .catch((e) => reject(e))
    });
  return promise;

  }

  const callSetEnsCid = (ensCid) => {
    let promise = new Promise(function (resolve, reject) {
      setEnsCidUri(props?.contractDetails?.contractAddress, props?.contractDetails?.contractNetwork, ensCid)
      .then(() => {props.setContractDetails({...props.contractDetails, ensCidUri: ensCid});resolve(true);})
      .catch((e) => reject(e))
    });
    return promise;
  }

  const callSetEnsResolver = (ensResolver) => {
    let promise = new Promise(function (resolve, reject) {

    setEnsResolver(props?.contractDetails?.contractAddress, props?.contractDetails?.contractNetwork, ensResolver)
    .then(() => {props.setContractDetails({...props.contractDetails, ensResolver: ensResolver});resolve(true);})
    .catch((e) => reject(e))
  });
  return promise;
  }

  const callSetEnsRegistar = (ensRegistar) => {
    let promise = new Promise(function (resolve, reject) {

      setEnsRegistar(props?.contractDetails?.contractAddress,  props?.contractDetails?.contractNetwork, ensRegistar)
      .then(() => {props.setContractDetails({...props.contractDetails, ensRegistar: ensRegistar});resolve(true);})
      .catch((e) => reject(e))
    });
    return promise;
  }
  

  return (
<>
  <ReactTooltip />
  <h4 className="mb-3">ENS Action</h4>
  <div className='py-3'>
    <GenericFieldSet key="ens-node-key" genericFieldLabel="ENS node" genericFieldID="ens-node" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsNode} initFieldValue={props.contractDetails?.ensNodeId} validator={ensNodeValidate} />
    <GenericFieldSet key="ens-cid-key" genericFieldLabel="IPFS/IPNS .eth content ID (CID)" genericFieldID="ens-cid" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsCid} initFieldValue={props.contractDetails?.ensCidUri} validator={contentUriValidate} />
    <GenericFieldSet key="ens-resolver-key" genericFieldLabel="ENS resolver" genericFieldID="ens-resolver" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsResolver} initFieldValue={props.contractDetails?.ensResolver} validator={ethAddressValidate} />
    <GenericFieldSet key="ens-registar-key" genericFieldLabel="ENS registar" genericFieldID="ens-registar" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsRegistar} initFieldValue={props.contractDetails?.ensRegistar} validator={ethAddressValidate} />
  </div>
</>)
}


export default EnsAction;