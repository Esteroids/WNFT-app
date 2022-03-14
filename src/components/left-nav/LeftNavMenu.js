import LeftNavItem from './LeftNavItem'
import LeftNavSeperator from './LeftNavSeperator'
import PagesInfo from '../pages/PagesInfo'

function LeftNavMenu(){
    return (
<nav>
    <ul className="list-group mb-3 left-menu mr-3">    
        <LeftNavItem  item={PagesInfo['general-information']} />
        <LeftNavItem item={PagesInfo['collection-onchain-metadata']} />
        <LeftNavItem item={PagesInfo['token-onchain-metadata']} />
        <LeftNavItem item={PagesInfo['ens-action']} />
        <LeftNavItem item={PagesInfo['minting-mechanism']} />
        <LeftNavSeperator />
        <LeftNavItem item={PagesInfo['browse-tokens']} />
        <LeftNavItem item={PagesInfo['mint-token']} />            
    </ul>
</nav>)
}


export default LeftNavMenu;