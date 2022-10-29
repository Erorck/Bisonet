import React from "react";
import { Link } from "react-router-dom";
import Logo from '../resources/LogoLight.png'

export const RegisterPage = () => {
    return (
        <div className="RegisterContentHolder">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={Logo}
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form
                            action="/"
                            id="registro">

                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p>Registro de usuario</p>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <input type="text" id="form3Example1" className="form-control" placeholder="Nombres(s)" />
                                        <label>Nombres</label>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <input type="text" id="form3Example2" className="form-control" placeholder="Apellidos" />
                                        <label>Apellidos</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control" placeholder="Correo electrónico" />
                                <label className="form-label">Email address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="form3Example4" className="form-control" placeholder="Contraseña" />
                                <label className="form-label">Contraseña</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="form3Example4" className="form-control" placeholder="Confirmar contraseña" />
                                <label className="form-label">Confirmar contraseña</label>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg">Registrar</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">¿Ya tienes cuenta? <Link to={'/login'}>Inicia sesión</Link></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}