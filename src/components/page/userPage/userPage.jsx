/* eslint-disable multiline-ternary */
import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../API";
import { Link } from "react-router-dom";
import Quality from "../../ui/qualities/quality";
import NewComment from "../../ui/comments/newComment";
import UserComments from "../../ui/comments/userComments";
const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const [usersToChoose, setUsersToChoose] = useState();
    const [newData, setNewData] = useState({});
    const [comments, setComments] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsersToChoose(data);
        });
        API.users.getById(id).then((user) => {
            setUser(user);
            API.comments.fetchCommentsForUser(user._id).then((comments) => {
                setComments(
                    comments.sort((a, b) => {
                        return b.created_at - a.created_at;
                    })
                );
            });
            setNewData({
                userToPostComment: undefined,
                content: undefined
            });
        });
    }, []);
    const handleCommenterSwitch = (target) => {
        setNewData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        // setComments((prevState) =>
        //     comments.filter((comment) => prevState.includes(comment))
        // );
    };
    if (user && usersToChoose && comments) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <Link to={`/users/${user._id}/edit`}>
                                        <button
                                            className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                        >
                                            <i className="bi bi-gear"></i>
                                        </button>
                                    </Link>
                                    <div
                                        className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                    >
                                        <img
                                            src={`https://avatars.dicebear.com/api/avataaars/qweqwdas.svg${(
                                                Math.random() + 1
                                            )
                                                .toString(36)
                                                .substring(7)}.svg`}
                                            className="rounded-circle"
                                            width="150"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">
                                                {user.profession.name}
                                            </p>
                                            <div className="text-muted">
                                                <i
                                                    className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">
                                                    {user.rate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div
                                    className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                                >
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        {user.qualities.map((quality) => (
                                            <Quality
                                                {...quality}
                                                key={quality._id}
                                            />
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card mb-3">
                                    <div
                                        className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                    >
                                        <h5 className="card-title">
                                            <span>Completed meetings</span>
                                        </h5>

                                        <h1 className="display-1">
                                            {user.completedMeetings}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card mb-2">
                                <div className="card-body">
                                    <NewComment
                                        updateComments={setComments}
                                        userName={user.name}
                                        data={newData}
                                        updateData={setNewData}
                                        usersToChoose={usersToChoose}
                                        onSwitch={handleCommenterSwitch}
                                    />
                                </div>
                            </div>

                            <div className="card mb-3">
                                <UserComments
                                    userComments={comments}
                                    updateUserComments={setComments}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
