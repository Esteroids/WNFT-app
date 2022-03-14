const PagesInfo = {
    'general-information': {
        route: '/',
        next: 'collection-onchain-metadata',
        label: 'General Information'
    },
    'collection-onchain-metadata': {
        route: 'collection-onchain-metadata',
        next: 'token-onchain-metadata',
        prev: 'general-information',
        label: 'Collection Onchain Metadata'
    },
    'token-onchain-metadata': {
        route: 'token-onchain-metadata',
        next: 'ens-action',
        prev: 'collection-onchain-metadata',
        label: 'Token Onchain Metadata'
    },
    'ens-action': {
        route: 'ens-action',
        next: 'minting-mechanism',
        prev: 'token-onchain-metadata',
        label: 'ENS Action'
    },
    'minting-mechanism': {
        route: 'minting-mechanism',
        next: 'browse-tokens',
        prev: 'ens-action',
        label: 'Minting Mechanism '
    },
    'browse-tokens': {
        route: 'browse-tokens',
        next: 'mint-token',
        prev: 'ens-action',
        label: 'Browse Tokens'
    },
    'mint-token': {
        route: 'mint-token',
        prev: 'browse-tokens',
        label: 'Mint a Token'
    },
    'token-profile': {
        route: 'token-profile',
        prev: 'general-information',
        prev_label: 'Back to contract',
        label: 'Token Profile'
    },
}



export default PagesInfo;