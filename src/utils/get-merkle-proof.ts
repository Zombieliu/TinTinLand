import BalanceTree from './balance-tree';

interface WhiteListInputItem {
  address: string,
}

export default function getMerkleProof(whitelist: any[], index: number, address: string): string[] {
  console.log('whitelist', whitelist.length);

  const tree: BalanceTree = new BalanceTree(whitelist.map((item: WhiteListInputItem) => ({
    account: item.address,
  })));
  return tree.getProof(index, address);
}
