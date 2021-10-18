// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useParams } from "react-router";
// import API from "../../../api";
// import QualitesList from "./qualitiesList";

// const UserPage = () => {
//     const [userChoose, setUserChoose] = useState();
//     API.users.getById(useParams()._id).then((data) => {
//         setUserChoose(data);
//     });
//     const history = useHistory();

//     if (userChoose) {
//         return (
//             <>
//                 <h2>{userChoose.name}</h2>
//                 <h3>Профессия: {userChoose.profession.name}</h3>
//                 <QualitesList qualities={userChoose.qualities} />
//                 <p>Всего встреч: {userChoose.completedMeetings}</p>
//                 <p>Рейтинг: {userChoose.rate}</p>
//                 <button
//                     onClick={() => {
//                         history.push("/users");
//                     }}
//                 >
//                     Все пользователи
//                 </button>
//             </>
//         );
//     }
//     return <h1>Loading...</h1>;
// };

// User.propTypes = {
//     //  users: PropTypes.array,
//     //  id: PropTypes.string
// };

// export default UserPage;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });
    const handleClick = () => {
        history.push("/users");
    };
    console.log(user);
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}>Все Пользователи</button>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
