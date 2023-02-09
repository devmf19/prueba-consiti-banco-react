import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import NewAccount from "./newaccount.component";

class Profile extends Component {

  render() {

    const { customer: currentCustomer } = this.props;
    // console.log(currentCustomer);
    if (!currentCustomer) { return <Redirect to="/login" />; }

    return (
      <div>
        <section style={{ backgroundColor: "#eee" }} >

          <div className="container-lg py-2">
            <br/>

            <div className="row">
              <div className="col-lg-4">

                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                      className="rounded-circle img-fluid" style={{ width: "150px" }} />
                    <h5 className="my-3">{currentCustomer.name} {currentCustomer.lastname}</h5>
                  </div>
                </div>

              </div>

              <div className="col-lg-8">
                <div className="card mb-4">

                  <div className="card-header">
                    <h5 className="my-3"><strong>Información del cliente</strong></h5>
                  </div>

                  <div className="card-body">

                    <div className="row">
                      <div className="col-sm-4">
                        <p className="mb-0"><strong>Dui:</strong></p>
                      </div>
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">{currentCustomer.dui}</p>
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-sm-4">
                        <p className="mb-0"><strong>Nombre:</strong></p>
                      </div>
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">{currentCustomer.name} {currentCustomer.lastname}</p>
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-sm-4">
                        <p className="mb-0"><strong>Usuario:</strong></p>
                      </div>
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">{currentCustomer.username}</p>
                      </div>
                    </div>

                  </div>
                
                </div>
              </div>

            </div>

            {/* <div className="row"> */}
              <NewAccount />
            {/* </div> */}

          </div>



        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { customer } = state.auth;
  return {
    customer,
  };
}

export default connect(mapStateToProps)(Profile);