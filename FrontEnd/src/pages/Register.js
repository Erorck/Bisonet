import React, { Component, createRef } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PopUpMessage } from "../utils/PopUp";
import Cookies from "universal-cookie";
import Logo from '../resources/LogoLight.png'
import api from '../api.json'
import axios from "axios"
import { TextInput } from "../utils/InputTypes";

const url = api.link;

export class RegisterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Form: {
                institutional_email: "",
                password: "",
                first_name: "",
                first_last_name: "",
                second_last_name: "",
                userId: "",
                user_type: ['Alumno']
            },
            authorized: false
        }

        this.childRef = createRef()
    }

    HandleChange = async e => {
        e.persist()

        await this.setState({
            Form: {
                ...this.state.Form,
                [e.target.name]: e.target.value
            }
        })

    }

    SendRequest = async () => {
        var exitResponse = false;
        await axios.post(url + 'users/register', this.state.Form).then(response => {
            const cookies = new Cookies();

            cookies.set("userToken", response.data.token, { path: '/' })
            cookies.set("userId", response.data.data._id, { path: '/' })

            this.childRef.current.activeAnimation("green", response.data.message)

            exitResponse = true;

        }).catch(error => {
            this.childRef.current.activeAnimation("red", error.response.data.message)
        })

        this.setState({
            authorized: exitResponse
        })

    }

    PreventSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="RegisterContentHolder">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={Logo}
                                className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form
                                onSubmit={this.PreventSubmit}
                                id="registro">

                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p>Registro de usuario</p>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <TextInput headName={"Nombre(s)"} placeholder={"Nombre(s)"} name={"first_name"} Handler={this.HandleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <TextInput headName={"Apellido paterno"} placeholder={"Apellido paterno"} name={"first_last_name"} Handler={this.HandleChange} />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <TextInput headName={"Apellido materno"} placeholder={"Apellido materno"} name={"second_last_name"} Handler={this.HandleChange} />
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <TextInput headName={"Correo"} placeholder={"Correo"} name={"institutional_email"} Handler={this.HandleChange} /><br />
                                    <TextInput headName={"Matrícula"} placeholder={"Matrícula"} name={"userId"} Handler={this.HandleChange} />
                                </div>

                                <div className="form-outline mb-4">
                                    <TextInput type={"password"} headName={"Contraseña"} placeholder={"Contraseña"} name={"password"} Handler={this.HandleChange} />
                                </div>

                                <div className="form-outline mb-4">
                                    <TextInput type={"password"} headName={"Confirmar contraseña"} placeholder={"Contraseña"} />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button onClick={this.SendRequest} type="submit" className="btn btn-primary btn-lg">Registrar</button>
                                    <PopUpMessage ref={this.childRef} />
                                    {this.state.authorized ? <Navigate to={"/"} replace={true} /> : null}
                                    <p className="small fw-bold mt-2 pt-1 mb-0">¿Ya tienes cuenta? <Link to={'/login'}>Inicia sesión</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}