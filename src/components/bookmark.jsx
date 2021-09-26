import React from "react";
import PropTypes from "prop-types";

const BookMarks = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};
BookMarks.propTypes = {
    status: PropTypes.bool
};

export default BookMarks;
