
const CHAIN_IDS = {
    mainnet: 1,
    ropsten: 3,
    rinkeby: 4,
    goerli: 5,
    kovan: 42
}

const INFURA_PROJECT_ID = '6158037dd7f84107aa16d631689c6674'

const getInfuraJsonRpcUrl = (net) => 'https://' + net.toLowerCase() + '.infura.io/v3/' + INFURA_PROJECT_ID

const getInfuraWebSocketRpcUrl = (net) => 'wss://' + net.toLowerCase() + '.infura.io/ws/v3/' + INFURA_PROJECT_ID


const getChainId = (net) => CHAIN_IDS[net.toLowerCase()]

const getRpcUrl = (net) => getInfuraJsonRpcUrl(net)

const getWebSocketRpcUrl = (net) => getInfuraWebSocketRpcUrl(net)


export {getRpcUrl, getWebSocketRpcUrl, getChainId};