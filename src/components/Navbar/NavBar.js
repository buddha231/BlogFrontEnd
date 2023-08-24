import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import authHeaders from '../services/auth-header'
import AuthService from '../../services/auth/auth.service'


function NavBar() {
    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await AuthService.logout();
            console.log("logged out")
            navigate("/")
        }
        catch (error) {
            console.err(error)
        }

        // window.location.reload();
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/blogs/explore" className="navbar-brand d-flex justify-content-space-between" >blogapp</Link>
                <div>
                    {localStorage.getItem('user') ? (
                        <span
                            id="nav-button"
                            className="navbar-brand btn btn-outline-danger"
                            style={{ fontSize: '17px' }}
                            onClick={handleLogout}
                        >
                            logout </span>) : (
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
