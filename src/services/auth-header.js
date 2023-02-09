export default function authHeader() {
    const customer = JSON.parse(localStorage.getItem("token"));

    if (customer) {
        return { Authorization: "Bearer " + customer.token };
    } else {
        return {};
    }
}
