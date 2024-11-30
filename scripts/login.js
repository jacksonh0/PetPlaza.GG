// Handle Auth0 Login Callback
window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code')) {
        const code = urlParams.get('code');
        try {
            const response = await fetch('/auth/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token); // Store token
                window.location.href = '/home'; // Redirect to Home
            } else {
                console.error('Failed to log in.');
            }
        } catch (error) {
            console.error('Error during login callback:', error);
        }
    }
};
