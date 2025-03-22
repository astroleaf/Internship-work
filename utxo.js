import NeucronSDK from "neucron-sdk";
import readline from "readline";

const neucron = new NeucronSDK();
const walletModule = neucron.wallet;

// Function to get all UTXOs by wallet ID
async function getAllUtxos(walletId) {
    try {
        const utxos = await walletModule.getAllUtxos({ walletId });
        return utxos;
    } catch (error) {
        console.error("Get UTXOs Error:", error);
        return [];
    }
}

// Function to display UTXOs
function displayUtxos(utxos) {
    if (utxos.length === 0) {
        console.log("No UTXOs found for this wallet.");
        return;
    }

    console.log("Unspent Transaction Outputs (UTXOs):");
    console.table(utxos.map(utxo => ({
        TXID: utxo.txid,
        Amount: utxo.amount,
        Vout: utxo.vout
    })));
}

// Function to prompt user for wallet ID
function promptForWalletId() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter your Wallet ID: ", async (walletId) => {
        const utxos = await getAllUtxos(walletId);
        displayUtxos(utxos);
        rl.close();
    });
}

// Start the application
promptForWalletId();