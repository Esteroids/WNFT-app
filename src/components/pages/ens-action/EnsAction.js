import ReactTooltip from 'react-tooltip';
import GenericFieldSet from '../../generics/GenericFieldSet';
import {setEnsRegistar, setEnsNode, setEnsResolver, setEnsContenthash} from "../../data/WnftContract"
import {ethAddressValidate, ensNodeValidate} from "../../../utils/validators"



function EnsAction(props){

  const notOwner = (!props.contractDetails?.isWnftOwner);

  const notOwnerAndNotLogin = (notOwner && 'Only the owner may modify this data.') || ''
 

  const callSetEnsNode = (ensNode) => {
    let promise = new Promise(function (resolve, reject) {

    setEnsNode(props?.contractDetails?.contractAddress, ensNode)
    .then(() => {props.setContractDetails({...props.contractDetails, ensNodeId: ensNode});resolve(true);})
    .catch(() => reject('error'))
  });
  return promise;

  }

  const callSetEnsContenthash = (ensContenthash) => {
    let promise = new Promise(function (resolve, reject) {

    setEnsContenthash(props?.contractDetails?.contractAddress, ensContenthash)
    .then(() => {props.setContractDetails({...props.contractDetails, ensContenthash: ensContenthash});resolve(true);})
    .catch(() => reject('error'))
  });
  return promise;
  }

  const callSetEnsResolver = (ensResolver) => {
    let promise = new Promise(function (resolve, reject) {

    setEnsResolver(props?.contractDetails?.contractAddress, ensResolver)
    .then(() => {props.setContractDetails({...props.contractDetails, ensResolver: ensResolver});resolve(true);})
    .catch(() => reject('error'))
  });
  return promise;
  }

  const callSetEnsRegistar = (ensRegistar) => {
    let promise = new Promise(function (resolve, reject) {

      setEnsRegistar(props?.contractDetails?.contractAddress, ensRegistar)
      .then(() => {props.setContractDetails({...props.contractDetails, ensRegistar: ensRegistar});resolve(true);})
      .catch(() => reject('error'))
    });
    return promise;
  }
  

  return (
<>
  <ReactTooltip />
  <h4 className="mb-3">ENS Action</h4>
  <div className='py-3'>
    <GenericFieldSet key="ens-node-key" genericFieldLabel="ENS node" genericFieldID="ens-node" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsNode} initFieldValue={props.contractDetails?.ensNodeId} validator={ensNodeValidate} />
    <GenericFieldSet key="ens-contenthash-key" genericFieldLabel="CID for .eth website" genericFieldID="ens-contenthash" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsContenthash} initFieldValue={props.contractDetails?.ensContenthash} />
    <GenericFieldSet key="ens-resolver-key" genericFieldLabel="ENS resolver" genericFieldID="ens-resolver" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsResolver} initFieldValue={props.contractDetails?.ensResolver} validator={ethAddressValidate} />
    <GenericFieldSet key="ens-registar-key" genericFieldLabel="ENS registar" genericFieldID="ens-registar" notOwnerAndNotLogin={notOwnerAndNotLogin} notOwner={notOwner}  callSet={callSetEnsRegistar} initFieldValue={props.contractDetails?.ensRegistar} validator={ethAddressValidate} />
  </div>
</>)
}

/*    <div className="col-12  my-3">
      <label htmlFor="ens-registar" className="form-label">ENS registar</label>
      <div className="input-group">
        <input type="text" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="form-control shadow-lg rounded" name="ens-registar" id="ens-registar" value={props.contractDetails?.ensRegistar||''} />
        <button type="submit" data-tip={notOwnerAndNotLogin} disabled={notOwner ? 'disabled' : null} className="btn btn-secondary ">SET</button>
      </div>
      
    </div>
    */

export default EnsAction;