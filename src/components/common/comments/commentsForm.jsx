import { validator } from "../../../utils/validator";
import React, { useEffect, useState } from "react";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";

const CommentsForm = ({ users, onSubmit }) => {
    const [data, setData] = useState({ name: "", content: "" });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({ name: "", content: "" });
    };

    const validateConfig = {
        name: {
            isRequired: { message: "Выберите пользователя" }
        },
        content: {
            isRequired: { message: "Введите свой комментарий" }
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <SelectField
                label="Выберите ваше имя"
                defaultOption="Выберите пользователя"
                name="name"
                options={users}
                value={data.name}
                error={errors.name}
                onChange={handleChange}
            />
            <TextAreaField
                label="Сообщение"
                name="content"
                onChange={handleChange}
                value={data.content}
                error={errors.content}
            />
            <button
                className="btn btn-primary ms-auto"
                type="submit"
                disabled={!isValid}
            >
                Опубликовать
            </button>
        </form>
    );
};

CommentsForm.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSubmit: PropTypes.func
};

export default CommentsForm;
