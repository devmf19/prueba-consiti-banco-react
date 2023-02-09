import React, { Component } from "react";
import CustomerService from "../services/customer.service";
import EventBus from "../common/EventBus";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {  content: "" };
  }

  componentDidMount() {
    CustomerService.getGreetings().then(
      response => {
        this.setState({ content: response.data.message });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        });

        if (error.response && error.response.status === 401) { EventBus.dispatch("logout"); }
      }
    );
  }

  render() {
    return (
      <div class="card bg-light text-dark">
        <h3>{this.state.content}</h3>
        <a href={() => false}><i class="fa fa-dribbble"></i></a>
        <a href={() => false}><i class="fa fa-twitter"></i></a>
        <a href={() => false}><i class="fa fa-linkedin"></i></a>
        <a href={() => false}><i class="fa fa-facebook"></i></a>
      </div>
    );
  }
}