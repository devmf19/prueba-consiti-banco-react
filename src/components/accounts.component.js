import React, { Component } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import { connect } from "react-redux";
import Swal from "sweetalert2";
import AccountService from "../services/account.service"


class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            columns: [],
        };

        this.defaultMaterialTheme = createTheme();

        AccountService.list().then((response) => {
            this.setState({
                accounts: response.data,
                columns: [
                    {
                        title: "Id",
                        field: "accountId"
                    },
                    {
                        title: "Número",
                        field: "number"
                    },
                    {
                        title: "Nombre",
                        field: "name"
                    },
                    {
                        title: "Saldo",
                        field: "balance"
                    }
                ]
            })
        });
    }

    transaction = (name) => {
        Swal.fire({
            title: 'Nueva transacción',
            html: `<input type="number" id="value" class="swal2-input" value="0" placeholder="Valor de la transacción">
            <br/>
            <select id="transactionType">
                <option value="1" selected>DEPOSITO</option>
                <option value="2">RETIRO</option>
            </select>`,
            confirmButtonText: 'Realizar transacción',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            preConfirm: () => {
                const value = Swal.getPopup().querySelector('#value').value
                const transactionType = Swal.getPopup().querySelector('#transactionType').value
                if (!value || !transactionType) {
                    Swal.showValidationMessage(`Ingrese un valor en cada campo`)
                } else {
                    AccountService.transaction(name, value, transactionType);
                    window.location.reload();
                }
            }
        });
    }

    render() {

        return (
            <div>
                {console.log(this.state.accounts)}
                <ThemeProvider theme={this.defaultMaterialTheme}>
                    <MaterialTable
                        title="Cuentas"
                        columns={this.state.columns}
                        data={this.state.accounts}

                        actions={[
                            {
                                icon: 'paid',
                                tooltip: 'Realizar transacción',
                                onClick: (event, rowData) => this.transaction(rowData.name)
                            }
                        ]}

                        options={{
                            actionsColumnIndex: -1,
                            headerStyle: {
                                backgroundColor: '#EEE',
                                fontWeight: "bold"
                            }
                        }}

                        localization={{
                            header: {
                                actions: 'Opciones'
                            },
                            pagination: {
                                labelDisplayedRows: '{from}-{to} de {count}',
                                labelRowsSelect: 'filas',
                                labelRowsPerPage: 'Ver',
                                firstAriaLabel: 'Primera página',
                                firstTooltip: 'Primera página',
                                previousAriaLabel: 'Anterior',
                                previousTooltip: 'Anterior',
                                nextAriaLabel: 'Siguiente',
                                nextTooltip: 'Siguiente',
                                lastAriaLabel: 'Última página',
                                lastTooltip: 'Última página'
                            },
                            toolbar: {
                                searchTooltip: 'Buscar',
                                searchPlaceholder: 'Buscar'
                            }
                        }}
                    />
                </ThemeProvider>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return { message, };
}

export default connect(mapStateToProps)(Accounts);