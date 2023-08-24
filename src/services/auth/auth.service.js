import axiosInstance from "../axios";

const register = async (username, first_name, last_name, password) => {
    try {
        const response = await axiosInstance.post("accounts/users/", {
            username,
            first_name,
            last_name,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const login = async (username, password) => {
    try {
        const response = await axiosInstance.post("token/", {
            username,
            password,
        });

        if (response.data.access) {
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("username", username);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
    try {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        console.log("userDeleted")
    } catch (error) {
        throw error;
    }
};

const getCurrentUser = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    } catch (error) {
        throw error;
    }
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
