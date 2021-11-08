import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: { message: "Email is obligible to fill" },
            isEmail: { message: "Invalid email" }
        },
        password: {
            isRequired: { message: "Password is obligible to fill" },
            isCapitalSymbol: {
                message: "Password must include at least one capital letter"
            },
            isContainDigit: {
                message: "Password must include at least one digit"
            },
            min: {
                message: "Password must contain at least of 8 symbols",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = (params) => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log(data);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 .offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
