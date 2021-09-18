import React, { useState, useEffect } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
// import { noConflict } from "lodash";

const Users = ({ onDelete, onAddBookmark, users: allUsers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 2;
    useEffect(() => {
        //   console.log("send request");
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    //  useEffect(() => {
    //      setCurrentPage(1);
    //      console.log(professions);
    //  }, [professions]);

    const qualitiesBar = (classEnd) => {
        return `badge bg-${classEnd} mx-1 fs-6`;
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    //  console.log(professions);
    const handlePageChange = (pageIndex) => {
        //   console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;

    const count = filteredUsers.length;
    const users = paginate(filteredUsers, currentPage, pageSize);

    const searchStatusTyping = () => {
        const lastOne = Number(count.toString().slice(-1));
        if (count > 4 && count < 15) return "Человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "Человека тусанут";
        if (lastOne === 1) return "Человек тусанет";
        return "Человек тусанет";
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex justify-content-center">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        //   valueProperty="_id"
                        //   contentProperty="name"
                    />
                    <button
                        className="btn btn-secodary mt-2"
                        onClick={clearFilter}
                    >
                        {" "}
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus
                    searchStatusTyping={searchStatusTyping}
                    users={filteredUsers}
                />
                {count > 0 && (
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
                                        onQualitiesClass={qualitiesBar}
                                        statusBookmark={user.bookmark}
                                        onAddBookmark={onAddBookmark}
                                        {...user}
                                        key={user._id}
                                    ></User>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onAddBookmark: PropTypes.func.isRequired,
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default Users;
