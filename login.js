// Initialize Auth0 client
const auth0 = await createAuth0Client({
    domain: 'dev-rowcgr5qgz11vcys.us.auth0.com',
    client_id: '1eptVb9nSOsdGcb1VB1YvrpyTBI0yxL4',
});

// Handle login
document.getElementById('loginButton').addEventListener('click', async () => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin + '/callback.html',
    });
});
