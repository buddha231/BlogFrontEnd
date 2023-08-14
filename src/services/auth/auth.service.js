import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (username, first_name, last_name, password) => {
    return axios.post(API_URL + "accounts/users/", {
        username,
        first_name,
        last_name,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "token/", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.access) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem("username", username);
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
