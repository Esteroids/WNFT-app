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
        next: 'browse-tokens',
        prev: 'token-onchain-metadata',
        label: 'ENS Action'
    },
    'browse-tokens': {
        route: 'browse-tokens',
        next: 'minting',
        prev: 'ens-action',
        label: 'Browse Tokens'
    },
    'minting': {
        route: 'minting',
        prev: 'browse-tokens',
        label: 'Minting mechanism & Mint a token'
    },
    'token-profile': {
        route: 'token-profile',
        prev: 'general-information',
        prev_label: 'Back to contract',
        label: 'Token Profile'
    },
}



export default PagesInfo;