import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "../configs/axios";
import {showSuccess} from "../features/spinnerSlice";
import {toast} from "react-toastify";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [jwtResponse, setJwtResponse] = useState("");

    const [errors, setErrors] = useState({})

    const onChangeHandler = e => {
        setErrors({});
        setForm({...form, [e.target.name]: e.target.value})
    }

    const validate = form => {
        if (form.firstName === "") {
            setErrors({...errors, field: "firstName", message: "fields can not be empty"})
            return false;
        }

        if (form.lastName === "") {
            setErrors({...errors, field: "lastName", message: "fields can not be empty"})
            return false;
        }

        if (form.email === "") {
            setErrors({...errors, field: "email", message: "fields can not be empty"})
            return false;
        }

        if (form.password === "") {
            setErrors({...errors, field: "password", message: "fields can not be empty"})
            return false;
        }

        if (form.confirmPassword === "") {
            setErrors({...errors, field: "confirmPassword", message: "fields can not be empty"})
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setErrors({...errors, message: "Password didn't not match"})
            return false;
        }

        return true;
    }

    const registrationHandler = () => {

        if (!validate(form)) {
            return false;
        }

        const regData = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            role: 'USER'
        }

        axios.post("/auth/register", regData)
            .then(res => {
                console.log(res.data)
                navigate("/login");
                toast.success("Successfully registered, please login!");
            })
            .catch(err => {
                console.log(err);
                setErrors({...errors, message: err.response.data.error})
            })


    }

    return <div className="container-fluid">
        <div className="form-container">

            <div className="register-form box">
                <h5 className={`text-center py-3`} style={{color: 'green'}}>Passenger Registration</h5>
                <div className={`row`}>
                    <div className={`col-12`}>
                        <div className="mb-3">
                            <label htmlFor="user_first_name" className="form-label">First Name</label>
                            <input
                                onChange={onChangeHandler}
                                value={form.firstName}
                                type="text"
                                name={`firstName`}
                                className={`form-control ${errors?.field === "firstName" && " input_error"}`}
                                id="user_first_name"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="user_last_name" className="form-label">Last Name</label>
                            <input
                                onChange={onChangeHandler}
                                value={form.lastName}
                                type="text"
                                name={`lastName`}
                                className={`form-control ${errors?.field === "lastName" && " input_error"}`}
                                id="user_first_name"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="user_email" className="form-label">Email</label>
                            <input
                                onChange={onChangeHandler}
                                value={form.email}
                                type="email"
                                name={`email`}
                                className={`form-control ${errors?.field === "email" && " input_error"}`}
                                id="user_email"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="user_password" className={`form-label`}>Password</label>
                            <input
                                onChange={onChangeHandler}
                                value={form.password}
                                name={`password`}
                                type="password"
                                className={`form-control ${errors?.field === "password" && " input_error"}`}
                                id="user_password"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className={`form-label`}>Confirm Password</label>
                            <input
                                onChange={onChangeHandler}
                                value={form.confirmPassword}
                                name={`confirmPassword`}
                                type="password"
                                className={`form-control ${errors?.field === "confirm_password" && " input_error"}`}
                                id="confirmPassword"/>
                        </div>
                    </div>
                </div>
                <div>
                    {errors?.message && <p className={`error_text`}>{errors.message}</p>}
                    <button
                        onClick={() => registrationHandler()}
                        type="button"
                        className="btn btn-outline-primary w-100 mb-3">Create Account
                    </button>
                    <p className={`text-center have_account`}>Already have account? <Link
                        className={`forget_password`}
                        to={`/login`}>Login</Link></p>
                </div>

            </div>
        </div>
    </div>
}

export default Register;