import UpperMenu from '../components/Menu';
import CarouselFade from '../components/Carousell';
import { Footer } from '../components/Footer'
import { useEffect, useRef, useState } from 'react';
import { PopUpMessage } from '../utils/PopUp';
import axios from 'axios';
import api from '../api.json'
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

const MainPage = () => {

    const [validated, HasBeenValidated] = useState(false)
    const [auth, IsAuthorized] = useState(false)

    const url = api.link;
    const childRef = useRef()

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

        HasBeenValidated(true)

    }

    if (!validated) {
        return null;
    }

    return (
        <div className="MainPage">
            {auth ? <div><UpperMenu />
                <div className="MainCarousell">
                    <div className="WelcomeMessage">
                        <span>Bienvenido a BISONET</span>
                    </div>
                    <CarouselFade />
                </div>
                <Footer />
                <PopUpMessage ref={childRef} /></div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}

export default MainPage;