import NeucronSDK from "neucron-sdk";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to get the wallet transaction history
async function getWalletHistory(walletId) {
    try {
        const history = await walletModule.getWalletHistory({ walletId });
        console.log(`Transaction History for Wallet ID ${walletId}:`);
        console.table(history); // Display the history in a table format
    } catch (error) {
        console.error("Get Wallet History Error:", error);
    }
}

// Example usage
(async () => {
    const walletId = "YOUR_WALLET_ID"; // Replace with the actual wallet ID

    await getWalletHistory(walletId);
})();