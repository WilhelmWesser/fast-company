import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../API";
const Comment = ({ id, pageId, userId, content, createdAt, removeComment }) => {
    const currentDate = Date.now();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((user) => {
            setUser(user);
        });
    }, []);
    const getComentPostTime = (ms) => {
        const timeDiffSeconds = Math.floor((currentDate - Number(ms)) / 1000);
        return `${
            Math.floor(timeDiffSeconds / 29030400) >= 1
                ? `${Math.floor(timeDiffSeconds / 29030400)} ${
                      Math.floor(timeDiffSeconds / 29030400) === 1
                          ? "год"
                          : "лет"
                  }`
                : " "
        }
        ${
            Math.floor(timeDiffSeconds / 2419200) >= 1 &&
            Math.floor(timeDiffSeconds / 2419200) < 12
                ? `${Math.floor(timeDiffSeconds / 2419200)} ${
                      Math.floor(timeDiffSeconds / 2419200) === 1
                          ? "месяц"
                          : "месяцев"
                  }`
                : " "
        }
        ${
            Math.floor(timeDiffSeconds / 86400) >= 1 &&
            Math.floor(timeDiffSeconds / 86400) < 28
                ? `${Math.floor(timeDiffSeconds / 86400)} ${
                      Math.floor(timeDiffSeconds / 86400) === 1
                          ? "день"
                          : "дней"
                  }`
                : " "
        }
        ${
            Math.floor(timeDiffSeconds / 3600) >= 1 &&
            Math.floor(timeDiffSeconds / 3600) < 24
                ? `${Math.floor(timeDiffSeconds / 3600)} ${
                      Math.floor(timeDiffSeconds / 3600) === 1 ? "час" : "часов"
                  }`
                : " "
        }
        ${
            Math.floor(timeDiffSeconds / 60) >= 1 &&
            Math.floor(timeDiffSeconds / 60) < 60
                ? `${Math.floor(timeDiffSeconds / 60)} ${
                      Math.floor(timeDiffSeconds / 60) === 1
                          ? "минута"
                          : "минут"
                  }`
                : " "
        }
        ${
            timeDiffSeconds >= 1 && timeDiffSeconds < 60
                ? `${timeDiffSeconds} ${
                      timeDiffSeconds === 1 ? "секунда" : "секунд"
                  }`
                : ""
        } назад`;
    };
    if (user) {
        return (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/qweqwdas.svg${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle"
                                width="65"
                                height="65"
                            />
                            <div
                                className="
            flex-grow-1 flex-shrink-1
        "
                            >
                                <div className="mb-4">
                                    <div
                                        className="
                    d-flex
                    justify-content-between
                    align-items-center
                "
                                    >
                                        <p className="mb-1">
                                            {user.name}
                                            <span className="small">
                                                {getComentPostTime(createdAt)}
                                            </span>
                                        </p>
                                        <button
                                            onClick={removeComment}
                                            className="
                        btn btn-sm
                        text-primary
                        d-flex
                        align-items-center
                    "
                                        >
                                            <i
                                                className="
                            bi bi-x-lg
                        "
                                            ></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};
Comment.propTypes = {
    id: PropTypes.string,
    pageId: PropTypes.string,
    userId: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    removeComment: PropTypes.func
};
export default Comment;
