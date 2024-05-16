export const getGroups = async () => {
    try {
        const response = await fetch('groupfitnessprod.azurewebsites.net/groups/getGroups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};