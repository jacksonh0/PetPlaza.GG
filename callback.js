// Initialize Auth0 client
const auth0 = await createAuth0Client({
    domain: 'dev-rowcgr5qgz11vcys.us.auth0.com',
    client_id: '1eptVb9nSOsdGcb1VB1YvrpyTBI0yxL4',
});

// Handle the redirect callback
const query = window.location.search;
const result = await auth0.handleRedirectCallback();

// After login, redirect to home page
window.location.href = '/home.html';
