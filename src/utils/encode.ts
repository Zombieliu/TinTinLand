import { ethers } from 'ethers';

export function encodeParam(dataType: string, data: string): string {
  const abiCoder = ethers.utils.defaultAbiCoder;
  return abiCoder.encode([dataType], [data]);
}

export function encodeParams(dataTypes: string[], data: any[]): string {
  const abiCoder = ethers.utils.defaultAbiCoder;
  return abiCoder.encode(dataTypes, data);
}
