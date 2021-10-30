import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    placeholder,
    name,
    onChange,
    value,
    error
}) => {
    const getInputClasses = () => {
        return `form-control ${error ? "is-invalid" : ""}`;
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputClasses()}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    rows="3"
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.defaultProps = {
    placeholder: "Ваш комментарий"
};

TextAreaField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextAreaField;
