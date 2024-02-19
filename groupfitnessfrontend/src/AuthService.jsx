export const login = async (username, password) => {
    try {
        const response = await fetch('https://groupfitnessprod.azurewebsites.net/auth/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const register = async (firstName, lastName, username, email, password) => {
    try {
        const response = await fetch('https://groupfitnessprod.azurewebsites.net/auth/register/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, username, email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

