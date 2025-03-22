import NeucronSDK from "neucron-sdk";

const neucron = new NeucronSDK();
const authModule = neucron.authentication;

// Function to sign up a new user
async function signUp(email, password) {
    try {
        const response = await authModule.signUp({ email, password });
        console.log("Sign Up Successful:", response);
    } catch (error) {
        console.error("Sign Up Error:", error);
    }
}

// Function to log in a user
async function login(email, password) {
    try {
        const response = await authModule.login({ email, password });
        console.log("Login Successful:", response);
        return response; // Return response for further use
    } catch (error) {
        console.error("Login Error:", error);
    }
}

// Function to demonstrate user authentication
async function authenticateUser () {
    const email = "user@example.com"; // Replace with user input
    const password = "securepassword"; // Replace with user input

    // Sign up the user
    await signUp(email, password);

    // Log in the user
    const loginResponse = await login(email, password);
    
    if (loginResponse) {
        // You can store the token or user info for further use
        console.log("User  authenticated successfully. Token:", loginResponse.token);
    }
}

// Execute the authentication process
authenticateUser ();