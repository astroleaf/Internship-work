import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to create a multi-signature wallet
async function createMultiSigWallet(walletName, requiredSignatures, publicKeys) {
    try {
        const response = await walletModule.createMultiSigWallet({
            walletName,
            requiredSignatures,
            publicKeys
        });
        console.log("Multi-Signature Wallet Created:", response);
    } catch (error) {
        console.error("Multi-S Signature Wallet Creation Error:", error);
    }
}

// Function to prompt user for wallet details
function promptForMultiSigWalletDetails() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter the wallet name: ", (walletName) => {
        rl.question("Enter the number of required signatures: ", (requiredSignatures) => {
            rl.question("Enter public keys (comma-separated): ", async (publicKeysInput) => {
                const publicKeys = publicKeysInput.split(',').map(key => key.trim());
                await createMultiSigWallet(walletName, parseInt(requiredSignatures), publicKeys);
                rl.close();
            });
        });
    });
}

// Start the application
promptForMultiSigWalletDetails();