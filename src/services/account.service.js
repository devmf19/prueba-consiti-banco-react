import axios from "axios";

const API_URL = "http://localhost:8080/accounts";
const customer = JSON.parse(localStorage.getItem('customer'));

class AccountService {

    register(number, name, openingAmount) {
        const customerDui = customer.dui;
        return axios.post(
            API_URL, 
            {number, name, openingAmount, customerDui},
            { headers: { Authorization: `Bearer ${customer.token}` } }
        );
    }

    transaction(name, value, transactionType){
        console.log(name + " " + value + " "+transactionType)
        console.log(API_URL.concat('/' + name + '/transaction'));
        axios.post(
            API_URL.concat('/' + name + '/transaction'),
            {value, transactionType },
            { headers: { Authorization: `Bearer ${customer.token}` } }
        )
    }

    list() {
        return axios.get(
            API_URL, 
            { headers: { Authorization: `Bearer ${customer.token}` } }
        )
    }
}

export default new AccountService();