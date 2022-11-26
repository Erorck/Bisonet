import React, { useEffect } from "react";
import { ProfileInfo } from "../components/ProfileInfo";
import { ProfileEdit } from "../Tabs/ProfileEditing";
import UpperMenu from "../components/Menu";
import { useState } from "react";
import { FragmentContent } from "../components/FragmentContent";
import { Footer } from "../components/Footer";
import Cookies from "universal-cookie";
import axios from "axios";
import api from "../api.json"
import { Navigate } from "react-router-dom";

export const ProfilePage = () => {

    const [validated, HasBeenValidated] = useState(false)

    const [auth, IsAuthorized] = useState(false)

    const [ActiveTab, setActive] = useState('View')

    const [profileData, setData] = useState({})

    const url = api.link;

    useEffect(() => {
        onLoad();
    }, [])

    async function onLoad() {

        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.get(url + 'users/' + cookies.get("userId"), config).then(response => {
            setData(response.data.data)
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
            {auth ? <div>
                <UpperMenu />
                <div className="BodyContent">
                    <FragmentContent id={'View'} activeTab={ActiveTab}>
                        <ProfileInfo setActive={setActive} data={profileData} />
                    </FragmentContent>
                    <FragmentContent id={'Edit'} activeTab={ActiveTab}>
                        <ProfileEdit setActive={setActive} />
                    </FragmentContent>
                </div>
                <Footer />
            </div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}