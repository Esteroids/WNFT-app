import { ethers } from "ethers";

export const ethAddressValidate = (val) => ethers.utils.isAddress(val);

export const ensNodeValidate = (val) => val.startsWith('0x') && (val.length == 66 || val.length == 2);

export const numberValidate = (val) => !isNaN(val);

export const intValidate = (val) => {
    var n = Math.floor(Number(val));
    return n !== Infinity && String(n) === val && n >= 0;
}