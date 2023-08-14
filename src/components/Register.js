
import { useNavigate, useLocation } from "react-router";
import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth/auth.service";

function Register() {

    const form = useRef();
    const checkBtn = useRef();

    const [first_name, setfirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    let navigate = useNavigate();


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, first_name, last_name, password).then(
                () => {
                    navigate("/Login");
                    window.location.reload();
                },
                (error) => {
                    console.log(error)
                    const resMessage =
                        (error.response &&
                            error.response.data.toString()) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <main>
            <div
                id="login-container"
                className="container my-5 text-muted p-3 px-md-5 py-md-5"
                style={{ minHeight: '50vh', background: 'rgba(255, 255, 255, 0.91)' }}
            >
                <div className="text-center">
                    <h1
                        className="reduce-on-phones-2"
                        style={{ fontSize: '48px', marginBottom: '24px' }}
                    >
                        Register
                    </h1>
                </div>
                {/* Add your CSRF token logic here */}
                <Form onSubmit={handleRegister} ref={form}>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                minLength="6"
                            />
                        </div>
                        <div className="text-muted mt-2 pb-4">
                            <input type="checkbox" onClick={toggleShowPassword} /> Show Password
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end px-3">
                        {/* Use a button instead of an input for better accessibility */}
                        <div className="row d-flex justify-content-end px-3">
                            {/* Use a button instead of an input for better accessibility */}
                            <button className="btn btn-success" disabled={loading} >
                                {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                                <span>Register</span>
                            </button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                <div className="modal-footer mt-4"></div>
                <div className="row">
                    <small className="text-muted">
                        Already have an account?
                        <Link to={"/login/"}>Login</Link>
                    </small>
                </div>
            </div>
            {/* Add your username_unavailable logic here
            {props.usernameUnavailable && (
                <script>{`window.alert("${props.usernameUnavailable}")`}</script>
            )} */}
        </main>
    );
}


export default Register;
