import Qualities from "./qualities";
import Bookmarks from "./bookmark";
import React from "react";
import PropTypes from "prop-types";

const User = ({
    onQualitiesClass,
    qualities,
    name,
    profession,
    completedMeetings,
    rate,
    onDelete,
    _id,
    statusBookmark,
    onAddBookmark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <Qualities
                onClass={onQualitiesClass}
                qualities={qualities}
            ></Qualities>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td className="text-center">
                <Bookmarks
                    onAddBookmarks={onAddBookmark}
                    statusBookmark={statusBookmark}
                    user_id={_id}
                ></Bookmarks>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={onDelete.bind(this, _id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    onQualitiesClass: PropTypes.func.isRequired,
    qualities: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    statusBookmark: PropTypes.bool,
    onAddBookmark: PropTypes.func.isRequired
};
export default User;
