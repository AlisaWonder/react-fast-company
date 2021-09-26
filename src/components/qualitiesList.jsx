import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";

const QualitesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Qualities key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitesList;
