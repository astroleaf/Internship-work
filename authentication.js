import NeucronSDK from "neucron-sdk";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to create a new wallet
async function createWallet(walletName) {
    try {
        const response = await walletModule.createWallet({ walletName });
        console.log("Wallet Creation Successful:", response);
        return response.walletID; // Return wallet ID for further use
    } catch (error) {
        console.error("Wallet Creation Error:", error);
    }
}

// Function to create multiple wallets
async function createMultipleWallets(walletNames) {
    for (const name of walletNames) {
        const walletId = await createWallet(name);
        if (walletId) {
            console.log(`Wallet '${name}' created with ID: ${walletId}`);
        }
    }
}

// Example usage
(async () => {
    const walletNames = [
        "Personal Wallet",
        "Business Wallet",
        "Savings Wallet",
        "Travel Wallet",
        "Investment Wallet"
    ];

    await createMultipleWallets(walletNames);
})();