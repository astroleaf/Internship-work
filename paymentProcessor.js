import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to get the wallet transaction history
async function getWalletHistory(walletId) {
    try {
        const history = await walletModule.getWalletHistory({ walletId });
        return history;
    } catch (error) {
        console.error("Get Wallet History Error:", error);
        return [];
    }
}

// Function to filter transactions by date
function filterTransactionsByDate(transactions, startDate, endDate) {
    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.timestamp);
        return transactionDate >= startDate && transactionDate <= endDate;
    });
}

// Function to display transaction history
function displayTransactionHistory(transactions) {
    if (transactions.length === 0) {
        console.log("No transactions found for this wallet.");
        return;
    }

    console.log("Transaction History:");
    console.table(transactions.map(tx => ({
        ID: tx.id,
        Amount: tx.amount,
        Timestamp: new Date(tx.timestamp).toLocaleString(),
        Type: tx.type,
        Note: tx.note || "N/A"
    })));
}

// Function to prompt user for date range and wallet ID
function promptForDetails() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter your Wallet ID: ", async (walletId) => {
        rl.question("Enter start date (YYYY-MM-DD): ", (startDateInput) => {
            rl.question("Enter end date (YYYY-MM-DD): ", async (endDateInput) => {
                const startDate = new Date(startDateInput);
                const endDate = new Date(endDateInput);
                endDate.setHours(23, 59, 59, 999); // Set end date to the end of the day

                const history = await getWalletHistory(walletId);
                const filteredHistory = filterTransactionsByDate(history, startDate, endDate);
                displayTransactionHistory(filteredHistory);

                rl.close();
            });
        });
    });
}

// Start the application
promptForDetails();