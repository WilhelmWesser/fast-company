import React from "react";
// import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import API from "../../../API";

const UserComments = ({ userComments, updateUserComments }) => {
    const handleDeletion = (commentId) => {
        API.comments.remove(commentId);
        updateUserComments((prevState) => {
            return prevState.filter((comment) => comment._id !== commentId);
        });
    };
    if (userComments) {
        return (
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {userComments.map((comment) => (
                    <Comment
                        key={`commentKey ${comment._id}`}
                        id={comment._id}
                        pageId={comment.pageId}
                        userId={comment.userId}
                        content={comment.content}
                        createdAt={String(comment.created_at)}
                        removeComment={() => handleDeletion(comment._id)}
                    />
                ))}
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};
UserComments.propTypes = {
    userComments: PropTypes.array,
    updateUserComments: PropTypes.func
};
export default UserComments;
