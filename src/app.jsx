import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    return setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    return setUsers(
      users.map((user) => {
        if (user._id === id) {
          user.bookmark ? (user.bookmark = false) : (user.bookmark = true);
        }
        return user;
      })
    );
  };

  return (
    <div>
      <Users
        onDelete={handleDelete}
        onAddBookmark={handleToggleBookmark}
        users={users}
      />
    </div>
  );
}

export default App;
