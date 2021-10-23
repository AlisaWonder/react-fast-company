import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";

const EditForm = () => {
    const [data, setData] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const params = useParams();
    const history = useHistory();
    const { userId } = params;
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        api.users.getById(userId).then((response) => {
            setData(response);
            console.log(response);
        });
        api.professions.fetchAll().then((response) => setProfessions(response));
        api.qualities.fetchAll().then((response) => setQualities(response));
    }, []);

    const handleChange = (target) => {
        let userValue = target.value;
        if (target.name === "profession") {
            for (const key in professions) {
                if (professions[key]._id === target.value) {
                    userValue = professions[key];
                }
                // для корректного отображения profession
            }
        }
        // для корректного отображения качеств
        if (target.name === "qualities") {
            userValue = [];
            for (const key in qualities) {
                target.value.forEach((qual) => {
                    if (qual.value === qualities[key]._id) {
                        console.log(qualities[key], "qualities");
                        userValue.push(qualities[key]);
                    }
                });
            }
        }
        setData((prev) => ({ ...prev, [target.name]: userValue }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Обязательно для заполнения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users.update(userId, data);
        history.push(`/users/${userId}`);
    };

    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name:"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Email:"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <SelectField
                label="Выберите вашу профессию"
                defaultOption={data.profession.name}
                options={professions}
                onChange={handleChange}
                value={data.profession._id}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                onChange={handleChange}
                value={data.sex}
                name="sex"
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualities}
                defaultOption={data.qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Обновить
            </button>
        </form>
    );
};

export default EditForm;
