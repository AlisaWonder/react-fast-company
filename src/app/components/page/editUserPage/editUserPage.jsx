import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { currentUser, updateUser } = useAuth();
    const [user, setUser] = useState(currentUser);
    const { userId } = useParams();
    const history = useHistory();
    const { professions, getProfession } = useProfessions();
    const { qualities, getQuality } = useQualities();
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => validate(), [user]);

    useEffect(() => {
        if (userId !== currentUser._id) {
            history.push(`/users/${currentUser._id}/edit`);
        }
    }, []);

    const handleChange = (target) => {
        let userData = target.value;
        console.log(target);
        if (target.name === "qualities") {
            // userData = target.value.map((v) => getQuality(v.value));
            userData = target.value.map((v) => v.value);
            console.log(userData);
        }
        setUser((prev) => ({ ...prev, [target.name]: userData }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(user);
        history.push(`/users/${userId}`);
    };

    const goBack = () => {
        history.push(`/user/${userId}`);
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
                message: "Введите ваше имя"
            }
        }
    };

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const professionList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    //  const qualitiesList = qualities.map((q) => ({
    //      label: q.name,
    //      value: q._id
    //  }));

    if (!user || qualities.length === 0 || professionList.length === 0) {
        return "Loading...";
    }

    // console.log(user.qualities.map((q) => getQuality(q).name));

    return (
        <div className="container mt-5">
            <BackHistoryButton onclick={goBack} />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={user.email || " "}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption={getProfession(user.profession).name}
                            name="profession"
                            options={professionList}
                            onChange={handleChange}
                            value={user.profession}
                            error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={user.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            defaultValue={user.qualities.map((q) =>
                                getQuality(q)
                            )}
                            options={qualities}
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
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
