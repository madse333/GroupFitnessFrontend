import { useState } from 'react';
import LoggedInNavBar from '../components/LoggedInNavigationBar';
import Modal from 'react-modal';
import GroupForm from '../components/modals/GroupForm';

const Groups = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateGroup = (newGroup) => {
        // Handle the creation of the new group, you can make API call here
        console.log('Creating group:', newGroup);
        // For demonstration, just log the new group data
    };

    return (
        <>
            <LoggedInNavBar />
            <div className="Home-container">
                <h1>Assigned groups</h1>


                {/* Button to open the modal */}
                <button onClick={openModal}>Create Group</button>

                {/* Modal for creating a new group */}
                <GroupForm
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onCreate={handleCreateGroup}
                />
            </div>
        </>
    );
};

export default Groups;