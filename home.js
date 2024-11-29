// Initialize Auth0 client
const auth0 = await createAuth0Client({
    domain: 'dev-rowcgr5qgz11vcys.us.auth0.com',
    client_id: '1eptVb9nSOsdGcb1VB1YvrpyTBI0yxL4',
});

// Fetch user info and display
async function displayUserInfo() {
    const user = await auth0.getUser();
    document.getElementById('userInfo').textContent = `Hello, ${user.name}`;
    document.getElementById('userBalance').textContent = '100'; // Dummy balance for now
}

// Handle logout
document.getElementById('logoutButton').addEventListener('click', async () => {
    await auth0.logout({
        returnTo: window.location.origin,
    });
});

// Initialize the page
displayUserInfo();
