import BrowseByTokenID from './BrowseByTokenID'
import BrowseByNthToken from './BrowseByNthToken'

function BrowseTokens(props){
    return (
<>
  <h4 className="mb-1">Browse Tokens</h4>
  <div className='py-2 mb-4'>
    <BrowseByTokenID contractDetails={props.contractDetails} isContractLoaded={props.isContractLoaded}/>
  </div>
  <h4 className="mb-1">Get Nth Token</h4>
  <div className='py-2'>
    <BrowseByNthToken contractDetails={props.contractDetails} isContractLoaded={props.isContractLoaded}/>
  </div>
</>)
}

export default BrowseTokens;