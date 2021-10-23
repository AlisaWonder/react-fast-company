import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comment from "./comment";
import api from "../../../api";
// import commentsApi from "../../../api/fake.api/comments.api";
// import SelectField from "../form/selectField";
import CommentsForm from "./commentsForm";

const CommentsListComponent = () => {
    const [, setUsers] = useState();
    const [comments, setComments] = useState([]);
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        api.commentsApi
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    //  const handleChange = (target) => {
    //      setUsers((prevState) => ({
    //          ...prevState,
    //          [target.name]: target.value
    //      }));
    //  };

    const handleDeleteComment = (commentId) => {
        api.commentsApi.remove(commentId);
        //   setRenderComment(!renderComment);
        console.log("удалено");
    };
    if (comments) {
        return (
            <>
                <div className="card mb-2">
                    {" "}
                    <div className="card-body ">
                        <div>
                            <h2>New comment</h2>
                            <CommentsForm />
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                commentId={comment._id}
                                userId={comment.userId}
                                content={comment.content}
                                handleDeleteComment={handleDeleteComment}
                                date={comment.created_at}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default CommentsListComponent;
