import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import API from "../api";
import QualitesList from "./qualitiesList";

const User = () => {
    const [userChoose, setUserChoose] = useState();
    API.users.getById(useParams()._id).then((data) => {
        setUserChoose(data);
    });
    const history = useHistory();

    if (userChoose) {
        return (
            <>
                <h2>{userChoose.name}</h2>
                <h3>Профессия: {userChoose.profession.name}</h3>
                <QualitesList qualities={userChoose.qualities} />
                <p>Всего встреч: {userChoose.completedMeetings}</p>
                <p>Рейтинг: {userChoose.rate}</p>
                <button
                    onClick={() => {
                        history.push("/users");
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return <h1>Loading...</h1>;
};

User.propTypes = {
    //  users: PropTypes.array,
    //  id: PropTypes.string
};

export default User;
