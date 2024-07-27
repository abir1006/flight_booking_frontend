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

        if (form.phone === "") {
            setErrors({...errors, field: "phone", message: "fields can not be empty"})
            return false;
        }

        if (form.street === "") {
            setErrors({...errors, field: "street", message: "fields can not be empty"})
            return false;
        }

        if (form.city === "") {
            setErrors({...errors, field: "city", message: "fields can not be empty"})
            return false;
        }

        if (form.state === "") {
            setErrors({...errors, field: "state", message: "fields can not be empty"})
            return false;
        }

        if (form.postalCode === "") {
            setErrors({...errors, field: "postalCode", message: "fields can not be empty"})
            return false;
        }

        if (form.country === "") {
            setErrors({...errors, field: "country", message: "fields can not be empty"})
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

        if (form.role === "") {
            setErrors({...errors, field: "role", message: "Select a user role"})
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
            username: form.email,
            phone: form.phone,
            password: form.password,
            address: {
                street: form.street,
                city: form.city,
                state: form.state,
                postalCode: form.postalCode,
                county: form.country
            },
            roles: [{
                role: form.role
            }]
        }

        axios.post("/users", regData)
            .then(res => {
                console.log(res.data)
                navigate("/login");
                toast.success("Successfully registered, please login!");
            })
            .catch(err => {
                console.log(err);
                setErrors({...errors, message: "Password must be at least 8 characters long"})
            })


    }

    return <div className="container-fluid">
        <div className="form-container">

            <div className="register-form box">
                <p className={`text-center p-4`}>User Registration</p>
                <div className={`row`}>
                    <div className={`col-6`}>
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

                    <div className={`col-6`}>

                        <div className="mb-2">
                            <label htmlFor="user_phone" className="form-label">Phone</label>
                            <input
                                onChange={onChangeHandler}
                                value={form.phone}
                                type="text"
                                name={`phone`}
                                className={`form-control ${errors?.field === "phone" && " input_error"}`}
                                id="user_phone"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                onChange={onChangeHandler}
                                value={form.street}
                                type="text"
                                placeholder={`Street`}
                                name={`street`}
                                className={`form-control ${errors?.field === "street" && " input_error"}`}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                onChange={onChangeHandler}
                                value={form.city}
                                placeholder={`City`}
                                type="text"
                                name={`city`}
                                className={`form-control ${errors?.field === "city" && " input_error"}`}
                                id="user_phone"/>
                        </div>
                        <div className="mb-3">
                            <input
                                onChange={onChangeHandler}
                                value={form.state}
                                placeholder={`State`}
                                type="text"
                                name={`state`}
                                className={`form-control ${errors?.field === "state" && " input_error"}`}/>
                        </div>
                        <div className="mb-3">
                            <input
                                onChange={onChangeHandler}
                                value={form.postalCode}
                                placeholder={`Postal code`}
                                type="text"
                                name={`postalCode`}
                                className={`form-control ${errors?.field === "postalCode" && " input_error"}`}/>
                        </div>

                        <div className="mb-3">
                            <input
                                onChange={onChangeHandler}
                                value={form.country}
                                placeholder={`Country`}
                                type="text"
                                name={`country`}
                                className={`form-control ${errors?.field === "country" && " input_error"}`}/>
                        </div>

                        <div className="mb-3">
                            <select
                                onChange={onChangeHandler}
                                name={`role`} className={`form-select ${errors?.field === "role" && " input_error"}`}>
                                <option value={``}>Select Type</option>
                                <option value={`BUYER`}>Buyer</option>
                                <option value={`SELLER`}>Seller</option>
                            </select>
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