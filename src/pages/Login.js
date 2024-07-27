import {useDispatch} from "react-redux";
import {loginSuccess} from "../features/authSlice";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "../configs/axios";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";

//import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [btnDisable, setBtnDisable] = useState(false);

    const [errors, setErrors] = useState({})

    const onChangeHandler = e => {
        setErrors({});
        setForm({...form, [e.target.name]: e.target.value})
    }

    const validate = form => {
        if (form.email === "") {
            setErrors({...errors, field: "email", message: "fields can not be empty"})
            return false;
        }

        if (form.password === "") {
            setErrors({...errors, field: "password", message: "fields can not be empty"})
            return false;
        }

        return true;
    }

    const loginHandler = () => {

        if (!validate(form)) {
            return false;
        }

        setBtnDisable(true);

        axios.post("/auth/authenticate", form)
            .then(res => {

                const decodedToken = jwtDecode(res.data.token);

                console.log(decodedToken);

                dispatch(loginSuccess({
                    user: res.data.user,
                    token: res.data.token
                }));

                setBtnDisable(false);

                toast.success("Successfully logged in!")

                if (res.data.roles[0].role === 'USER') {
                    navigate("/");
                } else {
                    navigate("/admin/dashboard");
                }
            })
            .catch(err => {
                console.log(err);
                setBtnDisable(false);
                setErrors({...errors, message: err.response.data.error})
            })
    }

    return <div className="container-fluid">
        <div className="form-container">
            <div className="login-form box">
                <h5 className={`text-center py-3`} style={{color: 'green'}}>Welcome to Flight Booking System</h5>
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
                <div>
                    {errors?.message && <p className={`error_text`}>{errors.message}</p>}
                    <Link className={`forget_password`} to={`/register`}>Register</Link>
                    <button
                        disabled={btnDisable}
                        onClick={() => loginHandler()}
                        type="button"
                        className="btn btn-outline-primary mb-3 float-end"> {btnDisable && <FontAwesomeIcon spin={true} icon={faSpinner} />} Login
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;