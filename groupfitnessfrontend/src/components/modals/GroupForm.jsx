import { useState } from 'react';
import Modal from 'react-modal';

const GroupForm = ({ isOpen, onClose, onCreate }) => {
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = () => {
        // Perform validation if needed
        if (!groupName.trim()) {
            alert('Please enter group name and description.');
            return;
        }

        // Call the onCreate function with the new group data
        onCreate({
            groupName: groupName,
        });

        // Close the modal and reset form fields
        onClose();
        setGroupName('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Create Group"
        >
            <h2>Create Group</h2>
            <div>
                <label>Group Name:</label>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleCreateGroup}>Create Group</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default GroupForm;
