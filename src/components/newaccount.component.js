import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import {register} from "../actions/account";
import Accounts from "./accounts.component";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡Este campo es requerido!
            </div>
        );
    }
};

const validateNumber = (value) => {
    if (value.length < 3 || value.length > 50) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡El nombre debe contener entre 3 y 50 caracteres!
            </div>
        );
    }
};

const validateName = (value) => {
    if (value.length < 3 || value.length > 50) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡El nombre debe contener entre 3 y 50 caracteres!
            </div>
        );
    }
};

const validateOpAmount = (value) => {
    if (value < 0) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡El monto de apertura no puede ser inferior a $0!
            </div>
        );
    }
};

class NewAccount extends Component {
    constructor(props) {
        super(props);
        this.handleAccounts = this.handleAccounts.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeOpAmount = this.onChangeOpAmount.bind(this);

        this.state = {
            number: "",
            name: "",
            openingAmount: "",
            successful: false,
        };
    }

    onChangeNumber(e) {
        this.setState({ number: e.target.value, });
    }

    onChangeName(e) {
        this.setState({ name: e.target.value, });
    }

    onChangeOpAmount(e) {
        this.setState({ openingAmount: e.target.value, });
    }

    handleAccounts(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    register(this.state.number, this.state.name, this.state.openingAmount),
                    window.location.reload()
                )
                .then(() => {
                    this.setState({
                        successful: true,
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                    });
                });
        }
    }

    render() {
        const { message } = this.props;
        return (

            <div className="row">

                <div className="col-md-5">
                    <div className="card bg-light text-dark">
                        <h1><center>Nueva cuenta</center></h1>
                        <Form onSubmit={this.handleAccounts} ref={(c) => { this.form = c; }} >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="number">Número:</label>
                                        <Input type="number" className="form-control" name="number" value={this.state.number}
                                            onChange={this.onChangeNumber} validations={[required, validateNumber]} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre:</label>
                                        <Input type="text" className="form-control" name="name" value={this.state.name}
                                            onChange={this.onChangeName} validations={[required, validateName]} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="openingAmount">Monto de apertura:</label>
                                        <Input type="number" className="form-control" name="openingAmount" value={this.state.email}
                                            onChange={this.onChangeOpAmount} validations={[required, validateOpAmount]} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-dark btn-block">Registrar cuenta</button>
                                    </div>
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={(c) => { this.checkBtn = c; }} />
                        </Form>
                    </div>
                </div>

                <div className="col-md-7">
                    <br />
                    <br />
                    <Accounts />

                </div>


            </div>
        );
    }

}

function mapStateToProps(state) {
    const { message } = state.message;
    return { message, };
}

export default connect(mapStateToProps)(NewAccount);