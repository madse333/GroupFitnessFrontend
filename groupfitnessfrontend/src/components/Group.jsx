

// eslint-disable-next-line react/prop-types
const Group = ({ groupName}) => {
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
                                <div className="members">
                                    {/* Member circles */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Group;