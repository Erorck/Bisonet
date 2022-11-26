import React, { useEffect, useState } from "react";
import CarouselFade from "../components/Carousell";
import UpperMenu from "../components/Menu";
import { Footer } from "../components/Footer";
import { ThreadsList } from "../Lists/Threads";
import Profile from '../resources/perfil1.jpg';
import '../css/materia.css';
import Cookies from "universal-cookie";
import api from "../api.json"
import axios from "axios";
import { Navigate } from "react-router-dom";

const ListOfThreads = (<ThreadsList Threads={[
    {
        Body: 'La entrega del proyecto es el día 20',
        Date: '26/10/2022',
        Owner: 'Profesor 1',
        Image: `${Profile}`
    },
    {
        Body: 'Buenos dias',
        Date: '26/10/2022',
        Owner: 'Profesor 1',
        Image: `${Profile}`
    }
]} />)

export const CoursePage = () => {

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
        <div className='MainPage'>
            {auth ? <div><UpperMenu />
                <div className="HeadCarousel">
                    <div className='CarouselMessage'>
                        <span>Materia</span>
                    </div>
                    <CarouselFade />
                </div>
                <div className='BodyContent'>
                    <div className='BodyHeader'>
                        <span>Materia</span>
                    </div>
                    <div className="ThreadsHolder">
                        {ListOfThreads}
                    </div>
                </div>
                <Footer /></div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}