import React from "react";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const CommentsForm = () => {
    return (
        <form className="d-flex flex-column">
            <SelectField
                label="Выберите ваше имя"
                defaultOption="Выберите пользователя"
                name="name"
            />
            <TextAreaField />
            <button className="btn btn-primary ms-auto" type="submit">
                Опубликовать
            </button>
        </form>
    );
};

export default CommentsForm;
