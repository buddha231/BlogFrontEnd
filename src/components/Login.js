import { useNavigate, useLocation } from "react-router";
import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth/auth.service";


function required(value) {
    if (!value) {
        return (
            < div className="alert alert-danger" role="alert" >
                This field is required!
            </div >
        );
    }
};

function Login(props) {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            try {
                await AuthService.login(username, password);
                navigate("/Blogs/Explore/");
                // window.location.reload();
            } catch (error) {
                console.log(error);
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.detail) ||
                    error.message ||
                    error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        } else {
            setLoading(false);
        }
    };


    return (
        <main>
            <div id="login-container" className="container my-5 text-muted p-3 px-md-5 py-md-5" style={{ minHeight: '50vh', background: 'rgba(255, 255, 255, 0.91)' }}>
                <div className="text-center">
                    <h1 className="reduce-on-phones-2" style={{ fontSize: '48px', marginBottom: '24px' }}>
                        Log In
                    </h1>
                </div>
                {/* Add your CSRF token logic here */}
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="Username">Username</label>
                            <input className="form-control" name="username" type="text" value={username} validations={[required]} onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="Password">Password</label>
                            <input className="form-control" name="password" type="password" value={password} validations={[required]} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-end px-3">
                        {/* Use a button instead of an input for better accessibility */}
                        <button className="btn btn-success" disabled={loading} >
                            {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <div className="modal-footer mt-4"></div>
                    {/* Add your error handling logic here
                    {props.wrongPassword && (
                        <script>{`window.alert("${props.wrongPassword}")`}</script>
                    )} */}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>

                <div className="row">
                    <small className="text-muted">
                        Don't have an account?
                        <Link to="/register/">Register Now</Link>
                    </small>
                </div>
            </div>
        </main>
    );
}

export default Login;

