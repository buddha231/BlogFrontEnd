import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import authHeaders from '../services/auth-header'
import AuthService from '../../services/auth/auth.service'


function NavBar() {
    let navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        // window.location.reload();
        navigate("/")
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/blogs/explore" className="navbar-brand d-flex justify-content-space-between" >blogapp</Link>
                <div>
                    {/* <a className="navbar-brand btn btn-danger" style={{ fontSize: '17px', color: '#fff' }} href="/account/login/">login</a>
                    <a id="nav-button" className="navbar-brand btn btn-outline-danger" style={{ fontSize: '17px' }} href="/account/register/">signup</a> */}
                    {AuthService.getCurrentUser() ? (
                        <a
                            id="nav-button"
                            className="navbar-brand btn btn-outline-danger"
                            style={{ fontSize: '17px' }}
                            onClick={handleLogout}
                        >
                            logout </a>) : (
                        <>
                            <Link to="/login/" className="navbar-brand btn btn-danger" style={{ fontSize: '17px', color: '#fff' }}>
                                Login
                            </Link>
                            <Link to="/register/" className="navbar-brand btn btn-outline-danger" style={{ fontSize: '17px' }}>
                                Signup
                            </Link>
                        </>
                    )
                    }
                </div>
            </div>
        </nav >
    )
}

export default NavBar;
