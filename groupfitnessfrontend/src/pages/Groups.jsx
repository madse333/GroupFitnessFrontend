import { useEffect, useState } from 'react';
import LoggedInNavBar from '../components/LoggedInNavigationBar';
import GroupForm from '../components/modals/GroupForm';
import Group from '../components/Group';
import "../css/Group.scss";
import "../css/Spinner.scss";

const Groups = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [userGroupList, setUserGroupList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchGroups = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('No token found in sessionStorage');
                setIsLoading(false);
                return;
            }

            const response = await fetch('https://groupfitnessprod.azurewebsites.net/group/getgroups', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const groupList = await response.json();
            console.log('Fetched groups:', groupList);

            // Filter out null or undefined groups
            const validGroups = groupList.filter(group => group !== null && group !== undefined);

            const groupsWithUsers = await Promise.all(validGroups.map(async group => {
                const users = await fetchGroupUsers(group.groupName);
                console.log(`Fetched users for group ${group.groupName}:`, users);
                return { ...group, users: users || [] };
            }));

            console.log('Groups with users before setting state:', groupsWithUsers);
            setUserGroupList(groupsWithUsers);
            console.log('State update called with:', groupsWithUsers);

            setIsLoading(false);
        } catch (error) {
            console.error('Error in fetchGroups:', error);
            setError(error.message);
            setUserGroupList([]);
            setIsLoading(false);
        }
    };


    const fetchGroupUsers = async (groupName) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            const response = await fetch(`https://groupfitnessprod.azurewebsites.net/group/getGroupUsers?groupName=${groupName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching users for group: ${groupName}: ${response.statusText}`);
            }

            const users = await response.json();
            return users; 
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateGroup = async (newGroup) => {
        console.log('Creating group:', newGroup);
        try {
            const response = await fetch('https://groupfitnessprod.azurewebsites.net/group/creategroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newGroup),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Created group:', data);

            // Call fetchGroups to refresh the group list
            fetchGroups();
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }
    };

    useEffect(() => {
        console.log('Updated userGroupList:', userGroupList);
    }, [userGroupList]);

    if (error) {
        return (
            <>
                <LoggedInNavBar />
                <div className="Home-container">
                    <h1>Groups</h1>
                    <p>Error: {error}</p>
                </div>
            </>
        );
    }

    console.log('Rendering with userGroupList:', userGroupList); // Debugging

    return (
        <>
            <LoggedInNavBar />
            <div className="Home-container">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <h1>Assigned groups</h1>
                    </div>
                    <div className="col-12 col-sm-12">
                        <button className="create-btn" onClick={openModal}>Create Group</button>
                    </div>
                    <div className="col-12 col-sm-12">
                        <GroupForm
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onCreate={handleCreateGroup}
                        />
                    </div>
                    <div className="groups">
                        {isLoading && (
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <p>Loading...</p>
                            </div>
                        )}
                        {!isLoading && userGroupList.length > 0 ? (
                            userGroupList.map((group, index) => (
                                <Group
                                    key={index} // Using index as the key
                                    groupName={group.groupName}
                                    users={group.users || []}
                                />
                            ))
                        ) : !isLoading && (
                            <p>No groups found for this user.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Groups;
