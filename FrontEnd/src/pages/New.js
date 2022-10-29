import React from "react";
import { Footer } from "../components/Footer";
import UpperMenu from "../components/Menu";
import NewPhoto from '../resources/StudenstMainPhoto.jpg'

export const NewPage = () => {
    return (
        <div className="MainPage">
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
        </div>
    )
}