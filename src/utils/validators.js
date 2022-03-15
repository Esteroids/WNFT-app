import { ethers } from "ethers";


// const getPrecision = (a) => {
//     if (!isFinite(a)) return 0;
//     var e = 1, p = 0;
//     while (Math.round(a * e) / e !== a) { e *= 10; p++; }
//     console.log(p)
//     return p;
//   }

//   const getPrecision = (a) => {
//     var e = 1;
//     while (Math.round(a * e) / e !== a) e *= 10;
//     return Math.log(e) / Math.LN10;
//   }

const responseStruct = (valid, msg) => {
    return {'valid': valid, 'msg': (!valid && msg) || undefined}
}

export const ethAddressValidate = (val) => responseStruct(ethers.utils.isAddress(val), 'Input must be a valid ETH address, "' + val + '" is invalid')

export const ensNodeValidate = (val) => responseStruct(val.startsWith('0x') && (val.length === 66 || val.length === 2), 'Input must be a valid Ens Node hash, "' + val + '" is invalid')

export const numberValidate = (val) => responseStruct(!isNaN(val), 'Input must be a number, "' + val.toString() + '" is invalid')

export const intValidate = (val) => {
    var n = Math.floor(Number(val));
    return responseStruct(n !== Infinity && String(n) === val && n >= 0, 'Input must be an integer, "' + val.toString() + '" is invalid')
}

//const maxMintPriceDecimalPoints = 3
//export const mintPriceValidate = (val) => ((isNaN(val) && numberValidate(val)) || (responseStruct(getPrecision(val) <= maxMintPriceDecimalPoints, 'Input most not have decimal points less then tenth of a cent $0.001, "' + val.toString() + '" is invalid')))