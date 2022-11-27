import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import AdminMenu from "../components/AdminMenu";
import { Footer } from "../components/Footer";
import { AdCoursesList } from "../Lists/AdCourses";
import { CoursesPopUp } from "../PopUps/PopUpCourses";
import '../css/adminMateria.css'
import '../css/adminGrupos.css'
import '../css/adminPost.css'
import api from "../api.json"
import Cookies from "universal-cookie";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { PopUpMessage } from "../utils/PopUp";

const CenteredButton = styled.button`
position: absolute;
right: 50%;
transform: translateX(50%);
margin-top: 10px;
`

export const CoursesPage = () => {

    const [Active, activePopUp] = useState(false)
    const [validated, HasBeenValidated] = useState(false)
    const [auth, IsAuthorized] = useState(false)
    const [courses, setCourses] = useState({});

    const HandleActive = () => {
        activePopUp(true)
    }

    const HandleCourses = (courses) => {
        setCourses(courses)
    }

    const ValidateSession = useCallback(() => {
        HasBeenValidated(true)
    }, [])

    const url = api.link;

    useEffect(() => {
        onLoad();
    }, [])

    useEffect(() => {
        getCourses()
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

    async function getCourses() {

        const cookies = new Cookies();

        const config = {
            headers: { 'Authorization': `Bearer ${cookies.get("userToken")}` }
        }

        await axios.get(url + 'courses/', config).then(response => {

            var CourseFinal = [];
            for (let i = 0; i < response.data.data.length; i++) {
                if(response.data.data[i].isActive)
                {
                    CourseFinal.push(response.data.data[i]);
                }
            }

            HandleCourses(CourseFinal)

        }).catch(error => {
            console.log(error.response)
        })

    }

    if (!validated) {
        return null;
    }

    return (
        <div className="MainPage">
            {auth ? <div>
                <AdminMenu />
                <div className="BodyContent">
                    {Active ? <CoursesPopUp activePopUp={activePopUp} prevInfo={{ course_name: "", semester: "", career_especialty: "" }} id={""}></CoursesPopUp> : null}
                    <div className="BodyHeader">
                        <span>Materias</span>
                    </div>
                    <div className="materias">
                        {courses.length ? <AdCoursesList Courses={[courses]} /> : null}
                    </div>
                    <CenteredButton className="btn btn-outline-light" onClick={HandleActive}>Añadir materia</CenteredButton>
                </div>
                <Footer />

            </div> : <Navigate to={"/login"} replace={true} />}
        </div>
    )
}