document.getElementById('place-order').addEventListener('click', function() {
    // Generate a unique order ID (simple random ID for demonstration)
    const orderId = Math.floor(Math.random() * 1000000);  // Generates a random ID
    const username = document.getElementById('username').value;

    // Check if the username is entered
    if (username) {
        // Create the special URL with the order ID
        const orderUrl = `https://mm2ez.com/claim=${orderId}.html`;
        
        // Display a success message
        alert(`Order placed successfully! \nClaim your order here: ${orderUrl}`);
        
        // Optionally, redirect the user to the claim page immediately
        window.location.href = orderUrl;  // Redirecting to the generated URL
    } else {
        // If username is not entered, prompt the user
        alert('Please enter your Roblox username');
    }
});
