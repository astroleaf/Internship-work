import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const transactionModule = neucron.transaction;

// Function to estimate transaction fee
async function estimateTransactionFee(amount, recipientAddress) {
    try {
        const feeEstimate = await transactionModule.estimateFee({ amount, recipientAddress });
        console.log(`Estimated Transaction Fee: ${feeEstimate} BTC`);
    } catch (error) {
        console.error("Transaction Fee Estimation Error:", error);
    }
}

// Function to prompt user for transaction details
function promptForTransactionDetails() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter the amount to send (in BTC): ", (amount) => {
        rl.question("Please enter the recipient address: ", async (recipientAddress) => {
            await estimateTransactionFee(parseFloat(amount), recipientAddress);
            rl.close();
        });
    });
}

// Start the application
promptForTransactionDetails();