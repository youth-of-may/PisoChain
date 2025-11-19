import { ethers } from 'ethers';

function generateWallet(walletCnt) {
    const wallets = []
    for (let i =0; i < walletCnt; i++) {
        const wallet = ethers.Wallet.createRandom();
        wallets.push({
            index: i,
            address: wallet.address,
            privateKey: wallet.privateKey
        });
        console.log(`Wallet ${i+1}:`);
        console.log(`Address ${wallet.address}`);
        console.log(`Private Key: ${wallet.privateKey}\n`);
    }
    return wallets;
}
const wallets = generateWallet(10)

wallets.forEach((w, i) => {
  console.log(`PRIVATE_KEY_${i + 1}=${w.privateKey.slice(2)}`); // Remove 0x prefix
});
