import React, { Component, createRef } from "react";
import '../css/login.css';
import { PopUpMessage } from "../utils/PopUp";
import Logo from '../resources/LogoLight.png'
import { Link } from "react-router-dom";
import axios from "axios"
import api from "../api.json"
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const url = api.link;

export class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Form: {
                institutional_email: "",
                password: ""
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
        await axios.post(url + 'users/login', this.state.Form).then(response => {
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
            <div className="loginContendHolder" >
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={Logo}
                                className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form
                                onSubmit={this.PreventSubmit}
                                id="login">
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p>Inicio de sesión</p>
                                </div>
                                <div className="divider d-flex align-items-center my-4">
                                </div>
                                <div className="form-outline mb-4">
                                    <input name="institutional_email" type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Correo electrónico" onChange={this.HandleChange} />
                                    <label className="form-label">Correo electrónico</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input name="password" type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Contraseña" onChange={this.HandleChange} />
                                    <label className="form-label">Contraseña</label>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button onClick={this.SendRequest} className="btn btn-primary btn-lg">Iniciar Sesión</button>
                                    <p className="linkRegistro small fw-bold mt-2 pt-1 mb-0">¿No tienes cuenta? <Link to={'/registro'}>¡Registrate ya!</Link></p>
                                </div>
                                <PopUpMessage Message={"Se ha iniciado sesión correctamente"} ref={this.childRef} />
                                {this.state.authorized ? <Navigate to={"/"} replace={true} /> : null}
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        )
    }

}