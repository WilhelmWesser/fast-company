import { React, useState } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import API from "../../../API";
const NewComment = ({
    updateComments,
    userName,
    data,
    updateData,
    usersToChoose,
    onSwitch
}) => {
    const [errors, setErrors] = useState();
    const addComment = (dataToCheck) => {
        if (validate(dataToCheck)) {
            const pageId = usersToChoose.find(
                (user) => user.name === userName
            )._id;
            const userId = usersToChoose.find(
                (user) => user.name === dataToCheck.userToPostComment
            )._id;
            const content = dataToCheck.content;
            const dataToPush = {
                pageId,
                userId,
                content
            };
            updateData({
                userToPostComment: "Выберите пользователя",
                content: ""
            });
            API.comments.add(dataToPush).then((newComment) => {
                console.log(newComment);
                API.comments
                    .fetchCommentsForUser(dataToPush.pageId)
                    .then((comms) => {
                        updateComments(comms);
                    });
            });
        }
    };
    const validate = (dataToCheck) => {
        console.log(dataToCheck);
        setErrors("");
        if (!dataToCheck.userToPostComment) {
            setErrors((prevState) => `${prevState}Пользователь не выбран `);
            return;
        }
        if (!dataToCheck.content) {
            setErrors((prevState) => `${prevState}Пустой комментарий `);
            return;
        }
        return true;
    };
    const handleCommentTyping = ({ target }) => {
        updateData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <div>
            <h2>New comment</h2>
            <div className="mb-4">
                <span color="red">{errors}</span>
                <SelectField
                    label=""
                    name="userToPostComment"
                    value={data.userToPostComment}
                    options={usersToChoose}
                    onChange={onSwitch}
                    defaultOption="Выберите пользователя"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                >
                    Сообщение
                </label>
                <textarea
                    value={data.content}
                    name="content"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={handleCommentTyping}
                ></textarea>
            </div>
            <button
                onClick={() => addComment(data)}
                className="btn btn-primary"
            >
                Опубликовать
            </button>
        </div>
    );
};
NewComment.propTypes = {
    updateComments: PropTypes.func,
    userName: PropTypes.string,
    data: PropTypes.object,
    updateData: PropTypes.func,
    usersToChoose: PropTypes.array,
    onSwitch: PropTypes.func
};
export default NewComment;
