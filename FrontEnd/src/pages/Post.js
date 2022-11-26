import React, { useEffect } from "react";
import AdminMenu from "../components/AdminMenu";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { PostList } from "../Lists/PostList";
import { PostPopUp } from "../PopUps/PopUpPosts";
import { useState } from "react";
import Orchestra from "../resources/Orchestra.jpg"
import Studenst from "../resources/StudenstMainPhoto.jpg"
import '../css/adminPost.css'
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../api.json"
import { Navigate } from "react-router-dom";

const ListOfPost = (<PostList Posts={[
    {
        Date: '28/10/2022',
        Image: `${Orchestra}`,
        Title: 'Orquesta sinfónica',
        Description: 'La orquesta sinfónia de la UANL hará su presentación'
    },
    {
        Date: '28/10/2022',
        Image: `${Studenst}`,
        Title: 'Vuelta a clases',
        Description: 'Primer día de escuela después de pandemia'
    }
]} />)

const CenteredButton = styled.button`
position: absolute;
right: 50%;
transform: translateX(50%);
margin-top: 10px;
`

export const PostsPage = () => {

    const [auth, IsAuthorized] = useState(false)
    const [validated, HasBeenValidated] = useState(false)
    const [Active, activePopUp] = useState(false)

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

    const HandleActive = () => {
        activePopUp(true)
    }

    if (!validated) {
        return null;
    }

    return (
        <div className="MainPage">
            {auth ? <div>
                <AdminMenu />
                <div className="BodyContent">
                    {Active ? <PostPopUp activePopUp={activePopUp}></PostPopUp> : null}
                    <div className="BodyHeader">
                        <span>Publicaciones</span>
                    </div>
                    <div className="container">
                        <div className="postList col-md-12 col-lg-12">
                            {ListOfPost}
                        </div>
                        <CenteredButton className="btn btn-outline-light" onClick={HandleActive}>Crear publicación</CenteredButton>
                    </div>
                </div>
                <Footer />
            </div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}