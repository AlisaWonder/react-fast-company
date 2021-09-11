import User from "./user";
import SearchStatus from "./searchStatus";

const Users = ({ onDelete, onAddBookmark, users }) => {
  const qulitieClass = (classEnd) => {
    return `badge bg-${classEnd} mx-2 fs-6`;
  };

  const searchStatusTyping = () => {
    const lastOne = Number(users.length.toString().slice(-1));
    if (users.length > 4 && users.length < 15) return "Человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "Человека тусанут";
    if (lastOne === 1) return "Человек тусанет";
    return "Человек тусанет";
  };

  return (
    <>
      <SearchStatus
        searchStatusTyping={searchStatusTyping}
        users={users}
      ></SearchStatus>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <User
                  onDelete={onDelete}
                  onQualitiesClass={qulitieClass}
                  statusBookmark={user.bookmark}
                  onAddBookmark={onAddBookmark}
                  {...user}
                ></User>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
