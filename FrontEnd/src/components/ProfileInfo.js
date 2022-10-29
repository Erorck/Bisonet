import React from "react";
import ProfilePic from '../resources/perfil1.jpg';
import '../css/perfil.css'
import { FaRegEdit } from 'react-icons/fa';

export const ProfileInfo = ({ setActive }) => {

    const EditProfile = () => {
        setActive('Edit')
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
                                        alt="Avatar" className="img-fluid my-5 ProfilePhoto" />
                                    <h5 className="ProfileHeader">John Doe</h5>
                                    <p className="ProfileParagraph">Estudiante</p>
                                    <button className='EditProfileBtn' onClick={EditProfile} ><FaRegEdit /></button>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h1>Información</h1>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h5 className="ProfileHeader">Correo</h5>
                                                <p className="ProfileParagraph">info@example.com</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h5 className="ProfileHeader">Carrera</h5>
                                                <p className="ProfileParagraph">LMAD</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}