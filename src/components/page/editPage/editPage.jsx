import { React, useState, useEffect } from "react";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import API from "../../../API";
import { useParams, useHistory } from "react-router";
import { validator } from "../../../utils/validator";
const EditPage = () => {
    const params = useParams();
    const { userId } = params;
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({});
    const [newData, setNewData] = useState({});
    const [professionsToChoose, setProfessionsToChoose] = useState();
    const [qualities, setQualities] = useState();
    const history = useHistory();
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessionsToChoose(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
        API.users.getById(userId).then((user) => {
            setUser(user);
            setNewData({
                name: user.name,
                email: user.email,
                profession: user.profession,
                sex: user.sex,
                qualities: user.qualities
            });
        });
    }, []);
    const getParamsToUpdate = (targetToIter, id) => {
        if (typeof targetToIter === "object") {
            return Object.values(targetToIter).find(
                (element) => element._id === id
            );
        }
    };
    const handleChange = (target) => {
        setNewData((prevState) => ({
            ...prevState,
            [target.name]:
                target.name === "profession"
                    ? getParamsToUpdate(professionsToChoose, target.value)
                    : target.name === "qualities"
                    ? target.value.map((quality) =>
                          Object.values(qualities).find(
                              (qual) => qual._id === quality.value
                          )
                      )
                    : target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: { message: "Email обязателен к заполнению" },
            isEmail: { message: "Неверный email" }
        }
    };
    useEffect(() => {
        validate();
    }, [newData]);
    const validate = (params) => {
        const errors = validator(newData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSave = (e) => {
        e.preventDefault();
        if (!validate()) return;
        API.users.update(userId, newData);
        history.replace(`users/${userId}`);
    };
    if (user && professionsToChoose && qualities) {
        return (
            <form onSubmit={handleSave}>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 .offset-md-3 shadow p-4">
                            <TextField
                                label="Имя"
                                type="text"
                                name="name"
                                value={newData.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                type="email"
                                name="email"
                                value={newData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                value={newData.profession.name}
                                options={professionsToChoose}
                                onChange={handleChange}
                                defaultOption={newData.profession.name}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "Other" }
                                ]}
                                value={newData.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultOptions={newData.qualities}
                            />
                            <button
                                className="btn btn-primary btn-lg btn-block"
                                type="submit"
                                disabled={!isValid}
                            >
                                Обновить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    } else {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 .offset-md-3 shadow p-4">
                        <h3>Loading...</h3>
                    </div>
                </div>
            </div>
        );
    }
};
export default EditPage;
