import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Group = ({ groupName, users }) => {
    console.log(users);
    return (
        <div className="col-4 col-sm-4">
            <div className="group">
                <div className="group-container">
                    <div className="row">
                        <div className="col-12 col-sm-12">
                            <div className="col-12">
                                <div className="group-title">
                                    {groupName}
                                </div>
                                
                                {users.map(user => (
                                    <div key={user.id} className="member">
                                        <img src={`data:image/jpeg;base64,${user.profilePicture.result.base64}`} alt={user.username} className="profile-picture" />
                                        <p>{user.username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Group.propTypes = {
    groupName: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            profilePicture: PropTypes.string.isRequired,
        })
    ).isRequired,
};


export default Group;