import UpperMenu from '../components/Menu';
import CarouselFade from '../components/Carousell';
import { Footer } from '../components/Footer';
import { LatestNews } from '../components/LatestNews';
import { UpcommingEvents } from '../components/UpcommingEvents';
import '../css/uanl.css'
import '../css/index.css'
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import api from "../api.json"
import { Navigate } from 'react-router-dom';

const FcfmPage = () => {

    const [validated, HasBeenValidated] = useState(false)
    const [auth, IsAuthorized] = useState(false)

    const url = api.link;

    const ValidateSession = useCallback(() => {
        HasBeenValidated(true)
    }, [])

    useEffect(() => {
        onLoad();
    }, [])

    useEffect(() => {
        getPost()
    }, [ValidateSession])

    async function onLoad() {

        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.get(url + 'users/' + cookies.get("userId"), config).then(response => {

            IsAuthorized(true)

        }).catch(error => {

        })

        ValidateSession()

    }

    async function getPost() {

        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.get(url + 'courses/', config).then(response => {

            console.log(response.data)

        }).catch(error => {
            console.log(error.response)
        })
    }

    if (!validated) {
        return null;
    }

    return (
        <div className='MainPage'>
            {auth ? <div>
                <UpperMenu />
                <div className="HeadCarousel">
                    <div className='CarouselMessage'>
                        <span>Alumnos desarrollan BISONET</span>
                    </div>
                    <CarouselFade />
                </div>
                <div className='BodyContent'>
                    <div className='BodyHeader'>
                        <span>Bienvenido a FCFM</span>
                    </div>
                    <LatestNews />
                    <UpcommingEvents />
                </div>
                <Footer />
            </div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}

export default FcfmPage;