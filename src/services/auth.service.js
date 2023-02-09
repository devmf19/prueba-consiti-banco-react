import axios from "axios";

const API_URL = "http://localhost:8080/auth";

class AuthService {

    login(username, password) {
        return axios
            .post(API_URL.concat("/login"), { username, password })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("customer", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("customer");
    }

    register(dui, name, lastname, username, password) {
        return axios.post(API_URL, {
            dui,
            name,
            lastname,
            username,
            password,
        });
    }
}

export default new AuthService();
