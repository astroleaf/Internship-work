import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to get the wallet transaction history
async function getWalletHistory(walletId) {
    try {
        const history = await walletModule.getWalletHistory({ walletId });
        console.log(`Transaction History for Wallet ID ${walletId}:`);
        
        if (history.length === 0) {
            console.log("No transactions found for this wallet.");
            return;
        }

        // Display the history in a table format
        console.table(history);
    } catch (error) {
        console.error("Get Wallet History Error:", error);
    }
}

// Function to prompt user for wallet ID
function promptForWalletId() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter your Wallet ID: ", async (walletId) => {
        await getWalletHistory(walletId);
        rl.close();
    });
}

// Start the application
promptForWalletId();