import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
    // [1,2,3,...]
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    //  console.log({ currentPage });
    const pages = _.range(1, pageCount + 1);
    return (
        <nav>
            <ul className="pagination pagination-lg">
                {pages.map((page) => (
                    <li
                        className={
                            "page-item" +
                            (page === currentPage ? " active" : "")
                        }
                        key={page}
                    >
                        <span
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
};
export default Pagination;
