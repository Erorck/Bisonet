import React from "react";
import '../css/editarPerfil.css'
import ProfilePic from '../resources/logo2.png'
import { MdAddPhotoAlternate } from 'react-icons/md'

export const ProfileEdit = ({ setActive, data }) => {

    const SaveInfo = () => {
        setActive('View')
    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-8 mb-4 mb-lg-0">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white">
                                    <img src={ProfilePic}
                                        alt="Avatar" className="img-fluid my-5" id="display_image" />
                                    <input type="file" id="image_input" accept="image/*" required />
                                    <label className="AddNewPhoto">
                                        <MdAddPhotoAlternate />
                                        Seleccionar foto
                                    </label>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h1>Editar contraseña</h1>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-8 mb-3">
                                                <h5>Contraseña</h5>
                                                <div className="col-sm-15">
                                                    <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-1">
                                            <div className="col-8 mb-3">
                                                <h5>Confirmar contraseña</h5>
                                                <div className="col-sm-15">
                                                    <input type="password" className="form-control" id="ConfirmPassword" placeholder="Confirmar contraseña" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ButtonsHolder">
                                            <button type="button" className="btn btn-outline-light">Cambiar contraseña</button>
                                            <button className="btn btn-outline-light" onClick={SaveInfo}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}