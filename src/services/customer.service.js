import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/actuator/health";

class CustomerService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getGreetings() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  
}

export default new CustomerService();
