import React from "react";

const TextAreaField = () => {
    return (
        <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Сообщение
            </label>
            <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
            ></textarea>
        </div>
    );
};

export default TextAreaField;
