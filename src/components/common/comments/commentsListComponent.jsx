import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comment from "./comment";
import api from "../../../api";
import CommentsForm from "./commentsForm";

const CommentsListComponent = () => {
    const [users, setUsers] = useState();
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

    const handleSubmit = (data) => {
        api.commentsApi.add({
            pageId: userId,
            userId: data.name,
            content: data.content
        });
        api.commentsApi
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    const handleDeleteComment = (commentId) => {
        api.commentsApi.remove(commentId);
        api.commentsApi
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };
    if (comments) {
        return (
            <>
                <div className="card mb-2">
                    {" "}
                    <div className="card-body ">
                        <div>
                            <h2>New comment</h2>
                            <CommentsForm
                                users={users}
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {comments
                            .sort(
                                (a, b) =>
                                    Number(b.created_at) - Number(a.created_at)
                            )
                            .map((comment) => (
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
