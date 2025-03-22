import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;
const payModule = neucron.pay;

// Function to validate the amount
function validateAmount(amount) {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) && parsedAmount > 0;
}

// Function to send payment
async function sendPayment(walletId, address, amount, note) {
    const options = {
        outputs: [
            {
                address,
                note,
                amount: parseFloat(amount)
            }
        ]
    };

    try {
        const response = await payModule.txSpend(options);
        console.log("Payment Successful:", response);
    } catch (error) {
        console.error("Payment Error:", error);
    }
}

// Function to prompt user for payment details
function promptForPaymentDetails(walletId) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter the recipient's address: ", (address) => {
        rl.question("Please enter the amount to send: ", (amount) => {
            if (!validateAmount(amount)) {
                console.log("Invalid amount. Please enter a positive number.");
                rl.close();
                return;
            }

            rl.question("Please enter a note for the transaction (optional): ", async (note) => {
                console.log(`You are about to send ${amount} BTC to ${address}.`);
                rl.question("Do you want to proceed? (yes/no): ", async (confirmation) => {
                    if (confirmation.toLowerCase() === 'yes') {
                        await sendPayment(walletId, address, amount, note);
                    } else {
                        console.log("Transaction cancelled.");
                    }
                    rl.close();
                });
            });
        });
    });
}

// Example usage
(async () => {
    const walletId = "YOUR_WALLET_ID"; // Replace with the actual wallet ID
    promptForPaymentDetails(walletId);
})();