import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ users, searchStatusTyping }) => {
    return (
        <span
            className={
                "fs-2 badge bg-" + (users.length > 0 ? "primary" : "danger")
            }
        >
            {users.length > 0
                ? `${users.length} ${searchStatusTyping()}  с тобой сегодня`
                : "Никто с тобой не тусанет"}
        </span>
    );
};

SearchStatus.propTypes = {
    users: PropTypes.array.isRequired,
    searchStatusTyping: PropTypes.func.isRequired
};

export default SearchStatus;
