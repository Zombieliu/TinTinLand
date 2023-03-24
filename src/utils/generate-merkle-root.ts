// import { BigNumber } from 'ethers';
import BalanceTree from './balance-tree';

interface WhiteListInputItem {
  address: string,
}

export default function generateMerkleRoot(whitelist: any[]): string {
  console.log('whitelist', whitelist.length);

  const tree: BalanceTree = new BalanceTree(whitelist.map((item: WhiteListInputItem) => ({
    account: item.address,
  })));
  return tree.getHexRoot();
}

// try {
//   const proof1 = tree.getProof(2, '0x0e79c644ec160afe87ea8e87201c0fe35ba63e1f', BigNumber.from('1'))
//   console.log('proof1', proof1)
// } catch (error) {
//   console.log('error', error)
// }

// try {
//   const proof2 = tree.getProof(0, '0x0e79c644ec160afe87ea8e87201c0fe35ba63e1f', BigNumber.from('1'))
//   console.log('proof2', proof2)
// } catch (error) {
//   console.log('error', error)
// }

// try {
//   const proof3 = tree.getProof(2, '0x0e79c644ec160afe87ea8e87201c0fe35ba63e1f', BigNumber.from('0'))
//   console.log('proof2', proof3)
// } catch (error) {
//   console.log('error', error)
// }
