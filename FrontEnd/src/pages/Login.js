import React from "react";
import '../css/login.css';
import Logo from '../resources/LogoLight.png'
import { Link } from "react-router-dom";

export const LoginPage = () => {
    return (
        <div className="loginContendHolder" >
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={Logo}
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form
                            action="/"
                            id="login">
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p>Inicio de sesión</p>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                            </div>
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Correo electrónico" />
                                <label className="form-label">Correo electrónico</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Contraseña" />
                                <label className="form-label">Contraseña</label>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg">Iniciar Sesión</button>
                                <p className="linkRegistro small fw-bold mt-2 pt-1 mb-0">¿No tienes cuenta? <Link to={'/registro'}>¡Registrate ya!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}