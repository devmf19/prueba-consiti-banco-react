import React, { Component } from "react";
import { history } from '../helpers/history';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerify extends Component {
  constructor(props) {
    super(props);

    history.listen(() => {
      const customer = JSON.parse(localStorage.getItem("customer"));

      if (customer) {
        const decodedJwt = parseJwt(customer.accessToken);

        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

export default AuthVerify;
