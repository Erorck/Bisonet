import UpperMenu from '../components/Menu';
import CarouselFade from '../components/Carousell';
import { Footer } from '../components/Footer';
import { FragmentNav } from '../Tabs/FragmentNav';
import '../css/lmad.css';
import '../css/index.css';
import '../css/uanl.css';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import api from "../api.json"
import { Navigate } from 'react-router-dom';

const LmadPage = () => {

    const [validated, HasBeenValidated] = useState(false)
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

        HasBeenValidated(true)

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
                        <span>Bienvenido a LMAD</span>
                    </div>
                    <FragmentNav />
                </div>
                <Footer />
            </div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}

export default LmadPage;