import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import UpperMenu from "../components/Menu";
import NewPhoto from '../resources/StudenstMainPhoto.jpg'
import api from "../api.json"
import Cookies from "universal-cookie";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const NewPage = () => {

    const [auth, IsAuthorized] = useState(false)

    const url = api.link;

    useEffect(() => {
        onLoad();
    })

    async function onLoad() {

        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.get(url + 'users/' + cookies.get("userId"), config).then(response => {

            IsAuthorized(true)

        }).catch(error => {

        })

    }

    return (
        <div className="MainPage">
            {auth ? <div>
                <UpperMenu />
                <div className="BodyContent">
                    <div class="BodyHeader">
                        <span>Alumnos desarrollan bisonet</span>
                    </div>
                    <div class="container pb50">
                        <div class="row">
                            <div class="col-md-14 mb40">
                                <article>
                                    <img src={NewPhoto} alt="" class="img-fluid mb30" />
                                    <div class="post-content">
                                        <ul class="post-meta list-inline" style={{ color: '#999' }}>
                                            <li class="list-inline-item">
                                                <span>John Doe</span>
                                            </li>
                                            <li class="list-inline-item">
                                                <span>29 June 2017</span>
                                            </li>
                                            <li class="list-inline-item">
                                                <span>UANL</span>
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, </p>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}