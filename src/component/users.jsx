import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  let cell = []; //массив из строк таблицы
  const userNames = users.map((user) => user.name);
  const userId = users.map((user) => user._id);
  const userProfession = users.map((user) => user.profession.name);
  const userCompletedMeetings = users.map((user) => user.completedMeetings);
  const userRate = users.map((user) => user.rate);
  const userQualities = users.map((user) => user.qualities);

  const handleDelete = (userIds) => {
    for (let i = 0; i < userId.length; i++) {
      if (userId[i] === userIds) {
        users.splice(i, 1);
        const newUser = [...users];
        setUsers(newUser);
      }
    }
  };

  const renderPhase = (number) => {
    let classes = "badge bg-";
    classes += number === 0 ? "danger" : "primary";
    let spanText =
      number === 0
        ? "никто не тусанет с тобой сегодня"
        : `${number} человек тусанет с тобой сегодня`;

    return (
      <h2>
        <span className={classes}>{spanText}</span>
      </h2>
    );
  };

  const formUsers = (users) => {
    const formQuality = (i) => {
      let classes = "badge bg-";
      const newQuality = userQualities[i].map((quality) => quality.name);
      const qualityColor = userQualities[i].map((quality) => quality.color);
      const qualityId = userQualities[i].map((quality) => quality._id);
      const spanMassive = [];
      for (let j = 0; j < newQuality.length; j++) {
        spanMassive.push(
          <span key={qualityId[j]} className={classes + qualityColor[j]}>
            {newQuality[j]}
          </span>
        );
      }
      return spanMassive;
    };

    for (let i = 0; i < users.length; i++) {
      cell.push(
        <tr key={userId[i]}>
          <td>{userNames[i]}</td>
          <td>{formQuality(i)}</td>
          <td>{userProfession[i]}</td>
          <td>{userCompletedMeetings[i]}</td>
          <td>{userRate[i]} /5</td>
          <td>
            <button
              onClick={() => handleDelete(userId[i])}
              type="button"
              className="btn btn-danger"
            >
              Удалить
            </button>
          </td>
        </tr>
      );
    }

    return cell;
  };

  return (
    <>
      {renderPhase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{formUsers(users)}</tbody>
      </table>
    </>
  );
};

export default Users;
