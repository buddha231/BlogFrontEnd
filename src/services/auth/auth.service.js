import axiosInstance from "../axios";

// const  "http://localhost:8000/api/";

const register = (username, first_name, last_name, password) => {
    return axiosInstance.post("accounts/users/", {
        username,
        first_name,
        last_name,
        password,
    });
};

const login = (username, password) => {
    return axiosInstance
        .post("token/", {
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
    localStorage.removeItem("username");
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
