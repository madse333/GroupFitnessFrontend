import { useState } from 'react';
import LoggedInNavBar from '../components/LoggedInNavigationBar';
import Modal from 'react-modal';
import GroupForm from '../components/modals/GroupForm';
import Group from '../components/Group';

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
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <h1>Assigned groups</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <button onClick={openModal}>Create Group</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <GroupForm
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onCreate={handleCreateGroup}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <Group />
                        <Group />
                        <Group />
                    </div>
                </div>
            </div>


        </>
    );
};

export default Groups;