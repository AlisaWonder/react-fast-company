import React from "react";
import Comment from "./comment";

const CommentsListComponent = () => {
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <div>
                        <h2>New comment</h2>
                        <div className="mb-4">
                            <select
                                className="form-select"
                                name="userId"
                                value=""
                            >
                                <option disabled value="" selected>
                                    Выберите пользователя
                                </option>

                                <option>Доктор</option>
                                <option>Тусер</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >
                                Сообщение
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <Comment />
                </div>
            </div>
        </>
    );
};

export default CommentsListComponent;
