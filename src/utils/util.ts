import { ethers } from 'ethers';

export const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

export const MINTER_ROLE = ethers.utils.id('MINTER_ROLE'); // equivalently to keccak256
export const PAUSER_ROLE = ethers.utils.id('PAUSER_ROLE');
