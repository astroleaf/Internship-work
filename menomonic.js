import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to recover wallet using mnemonic
async function recoverWallet(mnemonic) {
    try {
        const response = await walletModule.recoverWallet({ mnemonic });
        console.log("Wallet Recovery Successful:", response);
    } catch (error) {
        console.error("Wallet Recovery Error:", error);
    }
}

// Function to prompt user for mnemonic
function promptForMnemonic() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter your mnemonic phrase: ", async (mnemonic) => {
        await recoverWallet(mnemonic);
        rl.close();
    });
}

// Start the application
promptForMnemonic();