import { useEffect, useState } from 'react';
import Navbar from '../components/NavigationBar';
import LoggedInNavBar from '../components/LoggedInNavigationBar';
import GroupForm from '../components/modals/GroupForm';
import Group from '../components/Group';
import { getGroups } from '../GroupService';
import "../css/Group.scss";

const Groups = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [userGroupList, setUserGroupList] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('https://groupfitnessprod.azurewebsites.net/group/getgroups', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const groupList = await response.json();

                if (Array.isArray(groupList)) {
                    setUserGroupList(groupList);
                    console.log(groupList);
                } else {
                    setUserGroupList([]);
                }

            } catch (error) {
                setError(error.message);
                setUserGroupList([]);
            }
        };

        fetchGroups();
    }, []);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    async () => {
        try {
            const token = await getGroups();

            console.log(token);
        } catch (error) {
            // Handle fetching error
        }
    }

    const handleCreateGroup = async (newGroup) => {
        // Handle the creation of the new group, you can make API call here
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
            setUserGroupList(prevUserGroupList => [...prevUserGroupList, data]);
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }

    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="Home-container">
                    <h1>Groups</h1>
                    <p>Error: {error}</p>
                </div>
            </>
        );
    }

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
                        {userGroupList.length > 0 ? (
                            userGroupList.map((group, index) => (
                                <Group
                                    key={index} // Using index as the key
                                    groupName={group.groupName}
                                />
                            ))
                        ) : (
                            <p>No groups found for this user.</p>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
};

export default Groups;