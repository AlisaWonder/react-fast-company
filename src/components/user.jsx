import Qualities from "./qualities";
import Bookmarks from "./bookmark";
import React from "react";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark
}) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>
                {qualities.map((qual) => (
                    <Qualities key={qual._id} {...qual} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td className="text-center">
                <Bookmarks
                    status={bookmark}
                    onClick={() => onToggleBookMark(_id)}
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
    qualities: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool,
    onToggleBookMark: PropTypes.func.isRequired
};
export default User;
