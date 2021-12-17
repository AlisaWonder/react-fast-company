import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";

const QualitiesContext = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
};
export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    const getQuality = (id) => {
        const qualArray = [];
        qualities.forEach((q) => {
            if (id.includes(q._id)) {
                qualArray.push(q);
            }
        });
        return qualArray;
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    return (
        <QualitiesContext.Provider
            value={{
                getQuality,
                isLoading
            }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
