import React, { useState } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ onDelete, onAddBookmark, users: allUsers }) => {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const qualitiesBar = (classEnd) => {
        return `badge bg-${classEnd} mx-1 fs-6`;
    };

    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const users = paginate(allUsers, currentPage, pageSize);

    const searchStatusTyping = () => {
        const lastOne = Number(count.toString().slice(-1));
        if (count > 4 && count < 15) return "Человек тусанет";
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onAddBookmark: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};
export default Users;
