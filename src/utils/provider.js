const CHAIN_IDS = {
    mainnet: 1,
    ropsten: 3,
    rinkeby: 4,
    goerli: 5,
    kovan: 42,
    polygon: 137
}

function objectFlip(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => (acc[value] = key, acc), {})
}

const CHAINS_WITH_SPECIAL_RPC_URLS = {'polygon': 'https://rpc.ankr.com/polygon'}
const CHAIN_NAMES = objectFlip(CHAIN_IDS)

const INFURA_PROJECT_ID = '6158037dd7f84107aa16d631689c6674'

const getInfuraJsonRpcUrl = (net) => 'https://' + net.toLowerCase() + '.infura.io/v3/' + INFURA_PROJECT_ID

const getInfuraWebSocketRpcUrl = (net) => 'wss://' + net.toLowerCase() + '.infura.io/ws/v3/' + INFURA_PROJECT_ID


const getChainId = (net) => CHAIN_IDS[net.toLowerCase()]

const getRpcUrl = (net) => (CHAIN_IDS[net.toLowerCase()]!==undefined && CHAINS_WITH_SPECIAL_RPC_URLS[net.toLowerCase()]===undefined && getInfuraJsonRpcUrl(net)) || CHAINS_WITH_SPECIAL_RPC_URLS[net.toLowerCase()]

const getWebSocketRpcUrl = (net) => getInfuraWebSocketRpcUrl(net)


const capitalizeWords = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    return arr.join(" ");
}

const getChainIdToDisplay = (chainId) => { return (CHAIN_NAMES[chainId] && capitalizeWords( CHAIN_NAMES[chainId])) }

const getNetChainIdHex = (net) => CHAIN_IDS[net.toLowerCase()] !== undefined && ("0x" + (CHAIN_IDS[net.toLowerCase()].toString(16)))

const getSupportedChains = () => Object.keys(CHAIN_IDS).map(x => capitalizeWords(x));


export {getRpcUrl, getWebSocketRpcUrl, getChainId, getChainIdToDisplay, getNetChainIdHex, getSupportedChains};
