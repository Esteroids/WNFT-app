import LeftNavItem from './LeftNavItem'
import LeftNavSeperator from './LeftNavSeperator'
import PagesInfo from '../pages/PagesInfo'

function LeftNavMenu(){
    return (
<nav>
    <ul className="list-group mb-3 left-menu mr-3">    
        <LeftNavItem itemLabel="General Information" itemLink={PagesInfo['general-information'].route} />
        <LeftNavItem itemLabel="Collection Onchain Metadata" itemLink={PagesInfo['collection-onchain-metadata'].route} />
        <LeftNavItem itemLabel="Token Onchain Metadata" itemLink={PagesInfo['token-onchain-metadata'].route} />
        <LeftNavItem itemLabel="ENS Action" itemLink={PagesInfo['ens-action'].route} />
        <LeftNavSeperator />
        <LeftNavItem itemLabel="Browse Tokens" itemLink={PagesInfo['browse-tokens'].route} />
        <LeftNavItem itemLabel="Minting mechanism & Mint a token" itemLink={PagesInfo['minting'].route} />            
    </ul>
</nav>)
}


export default LeftNavMenu;