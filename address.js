import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to get addresses by wallet ID
async function getAddresses(walletId) {
    try {
        const addresses = await walletModule.getAddressesByWalletId({ walletId });
        return addresses;
    } catch (error) {
        console.error("Get Addresses Error:", error);
        return [];
    }
}

// Function to display addresses
function displayAddresses(addresses) {
    if (addresses.length === 0) {
        console.log("No addresses found for this wallet.");
        return;
    }

    console.log("Addresses for Wallet:");
    console.table(addresses.map(addr => ({
        Address: addr.address,
        Label: addr.label || "N/A"
    })));
}

// Function to prompt user for wallet ID
function promptForWalletId() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter your Wallet ID: ", async (walletId) => {
        const addresses = await getAddresses(walletId);
        displayAddresses(addresses);
        rl.close();
    });
}

// Start the application
promptForWalletId();