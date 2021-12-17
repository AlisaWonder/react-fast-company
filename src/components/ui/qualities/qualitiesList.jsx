import React from "react";
import PropTypes from "prop-types";
import Qualities from "./qualities";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const qualit = getQuality(id);

    if (!isLoading) {
        return (
            <>
                {qualit.map((qual) => (
                    <Qualities key={qual._id} {...qual} />
                ))}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    id: PropTypes.array
};

export default QualitiesList;
